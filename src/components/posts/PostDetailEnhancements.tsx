"use client";

import { useEffect, useState } from "react";
import {
  ArrowUpIcon,
  Check,
  Copy,
  Linkedin,
  Share2,
  Twitter,
  XIcon,
} from "lucide-react";

type PostDetailEnhancementsProps = {
  title: string;
  urlPath: string;
  tableOfContents: string;
};

export default function PostDetailEnhancements({
  title,
  urlPath,
  tableOfContents,
}: PostDetailEnhancementsProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [copied, setCopied] = useState(false);
  const [fullUrl, setFullUrl] = useState(urlPath);

  useEffect(() => {
    setFullUrl(`${window.location.origin}${urlPath}`);
  }, [urlPath]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const documentHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress =
        documentHeight > 0
          ? Math.min((scrollTop / documentHeight) * 100, 100)
          : 0;

      setScrollProgress(progress);
      setShowBackToTop(scrollTop > 500);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch {
      setCopied(false);
    }
  };

  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    title
  )}&url=${encodeURIComponent(fullUrl)}`;

  const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    fullUrl
  )}`;

  const tocItems = tableOfContents
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);

  return (
    <>
      <div className="fixed left-0 top-0 z-50 h-1 w-full bg-transparent">
        <div
          className="h-full bg-purple-500 transition-[width] duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* DESKTOP: LEFT FLOATING PANEL */}
      <div className="pointer-events-none fixed left-6 bottom-16 z-40 hidden xl:flex xl:flex-col xl:gap-3">
        <div className="pointer-events-auto w-56 rounded-2xl border border-gray-800 bg-gray-950/60 p-3 shadow-2xl backdrop-blur">
          <div className="mb-2 text-xs font-medium text-gray-300">Share</div>

          <div className="flex flex-col gap-2">
            <button
              type="button"
              onClick={handleCopyLink}
              className="rounded-lg border border-gray-800 bg-gray-900 px-3 py-2 text-left text-sm text-gray-200 transition hover:border-purple-500 hover:text-white"
            >
              {copied ? "Link copied" : "Copy link"}
            </button>

            <a
              href={twitterShareUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border border-gray-800 bg-gray-900 px-3 py-2 text-sm text-gray-200 transition hover:border-purple-500 hover:text-white"
            >
              Share on X
            </a>

            <a
              href={linkedinShareUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border border-gray-800 bg-gray-900 px-3 py-2 text-sm text-gray-200 transition hover:border-purple-500 hover:text-white"
            >
              Share on LinkedIn
            </a>
          </div>
        </div>

        {tocItems.length > 0 && (
          <div className="pointer-events-auto w-56 rounded-2xl border border-gray-800 bg-gray-950/95 p-4 shadow-2xl backdrop-blur">
            <div className="mb-3 text-sm font-semibold text-purple-100">
              On this page
            </div>

            <div className="space-y-2">
              {tocItems.map((item, index) => (
                <div
                  key={`${item}-${index}`}
                  className="text-xs leading-6 text-gray-400"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        )}

        {showBackToTop && (
          <button
            type="button"
            onClick={handleBackToTop}
            className="flex items-center justify-center gap-2 hover:cursor-pointer pointer-events-auto rounded-full border border-purple-300 bg-gray-950/80 px-4 py-3 text-sm text-gray-200 shadow-2xl backdrop-blur transition hover:border-purple-500 hover:text-white"
          >
            <span>Back to top</span>
            <ArrowUpIcon className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* MOBILE/TABLET: SHARE + BACK TO TOP */}
      <div className="pointer-events-none fixed bottom-24 left-0 right-0 z-40 flex justify-center px-4 xl:hidden">
        <div className="pointer-events-auto flex items-center gap-1 rounded-full border border-purple-400/70 bg-gray-950/50 px-3 py-1.5 shadow-2xl backdrop-blur">
          <span
            className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-800 bg-gray-900 text-gray-400"
            aria-hidden="true"
            title="Share"
          >
            <Share2 className="h-4 w-4" />
          </span>

          <button
            type="button"
            onClick={handleCopyLink}
            aria-label={copied ? "Link copied" : "Copy link"}
            title={copied ? "Link copied" : "Copy link"}
            className={`flex h-8 items-center gap-2 rounded-full border px-2 text-xs font-medium transition ${
              copied
                ? "border-purple-500 bg-purple-950/40 text-purple-100"
                : "border-gray-800 bg-gray-900 text-gray-200 hover:border-purple-500 hover:text-white"
            }`}
          >
            {copied ? (
              <Check className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
            <span>{copied ? "Copied" : "Copy"}</span>
          </button>

          <a
            href={twitterShareUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="Share on X"
            title="Share on X"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-800 bg-gray-900 text-gray-200 transition hover:border-purple-500 hover:text-white"
          >
            <XIcon className="h-4 w-4 font-bold" />
          </a>

          <a
            href={linkedinShareUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="Share on LinkedIn"
            title="Share on LinkedIn"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-800 bg-gray-900 text-gray-200 transition hover:border-purple-500 hover:text-white"
          >
            <Linkedin className="h-4 w-4" />
          </a>

          {showBackToTop && (
            <button
              type="button"
              onClick={handleBackToTop}
              aria-label="Back to top"
              title="Back to top"
              className="flex h-9 items-center gap-1 rounded-full border border-gray-800 bg-gray-900 px-3 text-xs font-medium text-gray-200 transition hover:border-purple-500 hover:text-white"
            >
              <ArrowUpIcon className="h-4 w-4" />
              <span>Top</span>
            </button>
          )}
        </div>
      </div>
    </>
  );
}