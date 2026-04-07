'use client'

import { useEffect, useMemo, useRef } from 'react'
import Prism from 'prismjs'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-java'
import 'prismjs/components/prism-go'
import 'prismjs/components/prism-rust'
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-yaml'
import 'prismjs/components/prism-markdown'
import './prism-theme.css'
import './editor-content.css'
import DOMPurify from 'isomorphic-dompurify'

interface RichTextDisplayProps {
  content: string
}

function removeColorStylesFromHtml(raw: string) {
  if (!raw) return ''

  if (typeof window === 'undefined' || typeof window.DOMParser === 'undefined') {
    return raw
  }

  const doc = new window.DOMParser().parseFromString(raw, 'text/html')

  doc.querySelectorAll('*').forEach((el) => {
    const style = el.getAttribute('style')
    if (!style) return

    const filtered = style
      .split(';')
      .map((rule) => rule.trim())
      .filter(Boolean)
      .filter((rule) => {
        const key = rule.split(':')[0]?.trim().toLowerCase()
        return !['color', 'background', 'background-color'].includes(key)
      })

    if (filtered.length > 0) {
      el.setAttribute('style', filtered.join('; '))
    } else {
      el.removeAttribute('style')
    }
  })

  return doc.body.innerHTML
}

export default function RichTextDisplay({ content }: RichTextDisplayProps) {
  const contentRef = useRef<HTMLDivElement>(null)

  const sanitizedContent = useMemo(() => {
    const raw = content || ''
    const cleanedHtml = removeColorStylesFromHtml(raw)

    return DOMPurify.sanitize(cleanedHtml, {
      ADD_TAGS: [
        'iframe',
        'pre',
        'code',
        'img',
        'p',
        'span',
        'div',
        'table',
        'thead',
        'tbody',
        'tr',
        'th',
        'td',
        'colgroup',
        'col',
      ],
      ADD_ATTR: [
        'class',
        'data-language',
        'spellcheck',
        'src',
        'alt',
        'title',
        'width',
        'height',
        'style',
        'href',
        'target',
        'rel',
        'colspan',
        'rowspan',
      ],
    })
  }, [content])

  useEffect(() => {
    const root = contentRef.current
    if (!root) return

    const timer = window.setTimeout(() => {
      const preElements = root.querySelectorAll('pre')
      preElements.forEach((pre) => {
        if (!pre.parentElement?.classList.contains('code-block-wrapper')) {
          const wrapper = document.createElement('div')
          wrapper.className = 'code-block-wrapper'
          pre.parentNode?.insertBefore(wrapper, pre)
          wrapper.appendChild(pre)

          const button = document.createElement('button')
          button.className = 'copy-code-button'
          button.type = 'button'
          button.textContent = 'Copy'
          wrapper.appendChild(button)
        }
      })

      const images = root.querySelectorAll('img')
      images.forEach((img) => {
        if (!img.parentElement?.classList.contains('image-wrapper')) {
          const wrapper = document.createElement('div')
          wrapper.className = 'image-wrapper'
          img.parentNode?.insertBefore(wrapper, img)
          wrapper.appendChild(img)
        }

        img.setAttribute('loading', 'lazy')
        img.classList.add('responsive-image')
        img.style.cursor = 'pointer'
      })

      Prism.highlightAllUnder(root)
    }, 0)

    const handleClick = async (event: MouseEvent) => {
      const target = event.target as HTMLElement | null
      if (!target || !root.contains(target)) return

      if (target.classList.contains('copy-code-button')) {
        const wrapper = target.closest('.code-block-wrapper')
        const code = wrapper?.querySelector('code')

        if (!code) return

        try {
          await navigator.clipboard.writeText(code.textContent || '')
          target.textContent = 'Copied!'
          target.classList.add('copied')

          window.setTimeout(() => {
            target.textContent = 'Copy'
            target.classList.remove('copied')
          }, 2000)
        } catch (err) {
          console.error('Failed to copy:', err)
          target.textContent = 'Error!'
        }
      }

      if (target.tagName === 'IMG') {
        const img = target as HTMLImageElement
        window.open(img.src, '_blank', 'noopener,noreferrer')
      }
    }

    const handleImageError = (event: Event) => {
      const target = event.target as HTMLImageElement | null
      if (!target || target.tagName !== 'IMG') return

      console.error('Image failed to load:', target.src)
      target.style.display = 'none'
    }

    root.addEventListener('click', handleClick)
    root.addEventListener('error', handleImageError, true)

    return () => {
      window.clearTimeout(timer)
      root.removeEventListener('click', handleClick)
      root.removeEventListener('error', handleImageError, true)
    }
  }, [sanitizedContent])

  return (
    <div
      className="
        rich-text-content
        text-primary2 dark:text-secondary
        [&_.editor-paragraph]:mb-5
        [&_.editor-paragraph]:leading-7
        [&_p]:mb-5
        [&_p]:leading-7
        [&_h1]:mb-4 [&_h1]:mt-6
        [&_h2]:mb-4 [&_h2]:mt-6
        [&_h3]:mb-3 [&_h3]:mt-5
        [&_ul]:mb-5 [&_ul]:pl-6
        [&_ol]:mb-5 [&_ol]:pl-6
        [&_li]:mb-2
        [&_blockquote]:my-5 [&_blockquote]:pl-4
        [&_img]:my-6
        [&_pre]:my-5
        [&_table]:my-6
      "
      ref={contentRef}
    >
      <div
        dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        suppressHydrationWarning
      />
    </div>
  )
}