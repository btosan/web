"use client";

import { useEffect, useRef, useState } from "react";
import TiptapEditor from "@/components/editorOld/TiptapEditor";

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/* ================= GOOGLE FORM CONFIG ================= */

const FORM_ID = "1FAIpQLSfpLGcdv-l_zhRkgZUf5Ye9ghl_dzVtQjGAG4sPOFRIreqqNA";
const GOOGLE_FORM_URL = `https://docs.google.com/forms/d/e/${FORM_ID}/formResponse`;

// ENTRY IDs (must match Google Form exactly)
const ENTRY_NAME = "entry.637622503";
const ENTRY_EMAIL = "entry.754221519";
const ENTRY_PHONE = "entry.129574009";
const ENTRY_SUBJECT = "entry.1469936530";
const ENTRY_PROJECT = "entry.41709357";
const ENTRY_DETAILS = "entry.805790689";
const ENTRY_HONEYPOT = "entry.884448233"; // honeypot field (hidden in form)

/* ===================================================== */

interface FormData {
  fullname: string;
  email: string;
  phone: string;
  subject: string;
  projectType: string;
}

export default function LeadModal({ isOpen, onClose }: LeadModalProps) {
  const [formData, setFormData] = useState<FormData>({
    fullname: "",
    email: "",
    phone: "",
    subject: "New Project Enquiry",
    projectType: "",
  });

  const [details, setDetails] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ details?: string }>({});
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKey);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current) onClose();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      fullname: "",
      email: "",
      phone: "",
      subject: "New Project Enquiry",
      projectType: "",
    });
    setDetails("");
    setErrors({});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (!details.trim()) {
      setErrors({ details: "Project details are required" });
      return;
    }

    setLoading(true);

    const payload = new URLSearchParams();
    payload.append(ENTRY_NAME, formData.fullname.trim());
    payload.append(ENTRY_EMAIL, formData.email.trim());
    payload.append(ENTRY_PHONE, formData.phone.trim());
    payload.append(ENTRY_SUBJECT, formData.subject.trim());
    payload.append(ENTRY_PROJECT, formData.projectType.trim());
    payload.append(ENTRY_DETAILS, details.trim());
    payload.append(ENTRY_HONEYPOT, ""); // MUST be empty

    try {
      await fetch(GOOGLE_FORM_URL, {
        method: "POST",
        mode: "no-cors",
        body: payload,
      });

      setSubmitted(true);
      resetForm();

      setTimeout(() => {
        setSubmitted(false);
        onClose();
      }, 2000);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-[999] overflow-y-auto bg-[#0d0d0d]/70 backdrop-blur-sm p-4"
      style={{ animation: "fadeUp 0.3s ease both" }}
    >
      <div className="min-h-full flex items-center justify-center py-6">
        <div className="bg-[#f7f4ef] rounded-3xl p-6 sm:p-10 max-w-md w-full relative shadow-2xl max-h-[90vh] overflow-y-auto">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#ede9e0] text-[#6b6560] flex items-center justify-center hover:bg-[#e0dbd1] transition-colors text-sm"
            aria-label="Close modal"
            type="button"
          >
            ✕
          </button>

          <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight my-2">
            Let&apos;s Build Something
          </h2>

          <p className="text-[#6b6560] text-sm font-light mb-7 pr-8">
            Fill in the form and we will get back to you within 24 hours to
            schedule a discovery call.
          </p>

          {submitted ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-3">✅</div>
              <p className="font-display font-bold text-lg">Message Sent!</p>
              <p className="text-sm text-[#6b6560] mt-1">
                We&apos;ll be in touch within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="hidden"
                name="subject"
                value={formData.subject}
                readOnly
              />

              <div>
                <label
                  htmlFor="fullname"
                  className="block text-xs font-semibold mb-1.5"
                >
                  Your Name
                </label>
                <input
                  id="fullname"
                  name="fullname"
                  type="text"
                  required
                  value={formData.fullname}
                  onChange={handleChange}
                  placeholder="e.g. Adaeze Okonkwo"
                  className="w-full px-4 py-3 rounded-xl border border-[#0d0d0d]/10 bg-white text-sm focus:outline-none focus:border-[#9333ea] transition-colors"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-semibold mb-1.5"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="email@company.com"
                  className="w-full px-4 py-3 rounded-xl border border-[#0d0d0d]/10 bg-white text-sm focus:outline-none focus:border-[#9333ea] transition-colors"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-xs font-semibold mb-1.5"
                >
                  WhatsApp / Phone
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="08XXXXXXXXX"
                  className="w-full px-4 py-3 rounded-xl border border-[#0d0d0d]/10 bg-white text-sm focus:outline-none focus:border-[#9333ea] transition-colors"
                />
              </div>

              <div>
                <label
                  htmlFor="projectType"
                  className="block text-xs font-semibold mb-1.5"
                >
                  What are you building?
                </label>
                <select
                  id="projectType"
                  name="projectType"
                  required
                  value={formData.projectType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-[#0d0d0d]/10 bg-white text-sm focus:outline-none focus:border-[#9333ea] transition-colors"
                >
                  <option value="">Select project type</option>
                  <option value="Custom Website">Custom Website</option>
                  <option value="Web Application">Web Application</option>
                  <option value="E-commerce Platform">E-commerce Platform</option>
                  <option value="AI Automation / Integration">
                    AI Automation / Integration
                  </option>
                  <option value="Not sure yet">Not sure yet</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1.5">
                  Brief description{" "}
                  <span className="text-[#6b6560] font-normal">(required)</span>
                </label>

                <div className="rounded-xl border border-[#0d0d0d]/10 bg-white overflow-hidden">
                  <TiptapEditor
                    content={details}
                    onChange={(value) => {
                      setDetails(value);
                      if (value.trim()) setErrors({});
                    }}
                    placeholder="Tell us about your project in a few words..."
                  />
                </div>

                {errors.details && (
                  <p className="text-sm text-red-500 mt-1">{errors.details}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-[#9333ea] text-white rounded-full font-semibold text-sm hover:bg-[#a855f7] transition-all hover:-translate-y-0.5 mt-1 shadow-lg shadow-[#9333ea]/30 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              >
                {loading ? "Sending..." : "Send Message →"}
              </button>

              <p className="text-center text-xs text-[#6b6560]">
                🔒 No spam. We&apos;ll only contact you about your project.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}