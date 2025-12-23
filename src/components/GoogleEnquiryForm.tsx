"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FiSend, FiCheck } from "react-icons/fi";
import TiptapEditor from "./editor/TiptapEditor";

const FORM_ID = "1FAIpQLSfpLGcdv-l_zhRkgZUf5Ye9ghl_dzVtQjGAG4sPOFRIreqqNA";
const GOOGLE_FORM_URL = `https://docs.google.com/forms/d/e/${FORM_ID}/formResponse`;

// Exact entry IDs (including your new honeypot)
const ENTRY_NAME     = "entry.637622503";    // Full Name
const ENTRY_EMAIL    = "entry.754221519";    // Email Address
const ENTRY_PHONE    = "entry.129574009";    // Phone Number
const ENTRY_SUBJECT  = "entry.1469936530";   // Subject
const ENTRY_PROJECT  = "entry.41709357";     // Project Type
const ENTRY_DETAILS  = "entry.805790689";    // Project Details
const ENTRY_HONEYPOT = "entry.884448233";    // Honeypot (always empty!)

interface FormData {
  fullname: string;
  email: string;
  phone: string;
  subject: string;
  projectType: string;
}

export default function GoogleEnquiryForm({
  onSuccess,
}: {
  onSuccess?: () => void;
}) {
  const searchParams = useSearchParams();

  const [formData, setFormData] = useState<FormData>({
    fullname: "",
    email: "",
    phone: "",
    subject: "",
    projectType: "",
  });

  const [details, setDetails] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<{ details?: string }>({});

  // Auto-prefill subject from URL ?type=...
  useEffect(() => {
    const type = searchParams.get("type");

    const map: Record<string, string> = {
      start_project: "New Project Enquiry",
      web_app: "Web App Development",
      website: "Website Development",
      automation: "Automation / Internal Tool",
    };

    if (type && map[type]) {
      setFormData((prev) => ({
        ...prev,
        subject: map[type],
      }));
    }
  }, [searchParams]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (!details.trim()) {
      setErrors({ details: "Project details are required" });
      return;
    }

    if (
      !formData.fullname.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.subject.trim() ||
      !formData.projectType.trim()
    ) {
      return;
    }

    setIsSubmitting(true);

    // Native hidden form submission – reliable forever
    const hiddenForm = document.createElement("form");
    hiddenForm.method = "POST";
    hiddenForm.action = GOOGLE_FORM_URL;
    hiddenForm.style.display = "none";
    hiddenForm.target = "google_form_iframe";

    const addHiddenInput = (name: string, value: string) => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = name;
      input.value = value.trim();
      hiddenForm.appendChild(input);
    };

    addHiddenInput(ENTRY_NAME, formData.fullname);
    addHiddenInput(ENTRY_EMAIL, formData.email);
    addHiddenInput(ENTRY_PHONE, formData.phone);
    addHiddenInput(ENTRY_SUBJECT, formData.subject);
    addHiddenInput(ENTRY_PROJECT, formData.projectType);
    addHiddenInput(ENTRY_DETAILS, details);
    addHiddenInput(ENTRY_HONEYPOT, ""); // ← Honeypot: always empty!

    document.body.appendChild(hiddenForm);
    hiddenForm.submit();
    document.body.removeChild(hiddenForm);

    // Success UI
    setIsSuccess(true);
    setFormData({
      fullname: "",
      email: "",
      phone: "",
      subject: formData.subject,
      projectType: "",
    });
    setDetails("");

    setTimeout(() => {
      setIsSuccess(false);
      onSuccess?.();
    }, 4000);

    setIsSubmitting(false);
  };

  const inputClasses =
    "w-full px-4 py-3 bg-gray-900 border border-gray-700 text-gray-100 placeholder-gray-400 rounded-xl focus:outline-none focus:border-purple-100 transition";

  const labelClasses =
    "block text-sm font-medium text-purple-100 mb-2 uppercase";

  return (
    <div className="w-full max-w-2xl mx-auto">
      <iframe
        name="google_form_iframe"
        style={{ display: "none" }}
        title="Google Form Submission"
      />

      <h3 className="text-2xl md:text-3xl font-bold text-purple-100 mb-8 text-center">
        Email Enquiry Form
      </h3>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Full Name */}
        <div>
          <label className={labelClasses}>Full Name *</label>
          <motion.input
            whileFocus={{ scale: 1.01 }}
            name="fullname"
            required
            type="text"
            value={formData.fullname}
            onChange={handleChange}
            placeholder="John Doe"
            className={inputClasses}
          />
        </div>

        {/* Email */}
        <div>
          <label className={labelClasses}>Email *</label>
          <motion.input
            whileFocus={{ scale: 1.01 }}
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className={inputClasses}
          />
        </div>

        {/* Phone */}
        <div>
          <label className={labelClasses}>Phone *</label>
          <motion.input
            whileFocus={{ scale: 1.01 }}
            type="tel"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            placeholder="09012345678"
            className={inputClasses}
          />
        </div>

        {/* Subject */}
        <div>
          <label className={labelClasses}>Subject *</label>
          <motion.input
            whileFocus={{ scale: 1.01 }}
            name="subject"
            required
            type="text"
            value={formData.subject}
            onChange={handleChange}
            placeholder="e.g. Web App Development"
            className={inputClasses}
          />
        </div>

        {/* Project Type */}
        <div>
          <label className={labelClasses}>Project Type *</label>
          <motion.select
            whileFocus={{ scale: 1.01 }}
            name="projectType"
            required
            value={formData.projectType}
            onChange={handleChange}
            className={inputClasses}
          >
            <option value="">Select project type</option>
            <option value="Custom Website">Custom Website</option>
            <option value="Web Application">Web Application</option>
            <option value="E-commerce Platform">E-commerce Platform</option>
            <option value="AI Automation / Integration">AI Automation / Integration</option>
            <option value="Not sure yet">Not sure yet</option>
          </motion.select>
        </div>

        {/* Project Details */}
        <div>
          <label className={labelClasses}>Project Details *</label>
          <TiptapEditor
            content={details}
            onChange={setDetails}
            placeholder="Describe your project..."
          />
          {errors.details && (
            <p className="text-sm text-red-500 mt-1">{errors.details}</p>
          )}
        </div>

        <AnimatePresence mode="wait">
          {isSuccess ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-4 py-8"
            >
              <FiCheck className="w-16 h-16 text-green-400" />
              <p className="text-2xl font-bold text-purple-100">
                Enquiry Sent Successfully!
              </p>
              <p className="text-sm text-gray-400 text-center">
                Thank you – check your Google responses, it's there!
              </p>
            </motion.div>
          ) : (
            <motion.button
              key="submit"
              type="submit"
              disabled={isSubmitting}
              className="
                w-full sm:w-auto px-8 py-4
                border-t-2 border-b-2 border-purple-100
                text-purple-100 font-medium text-lg rounded-xl
                hover:bg-purple-100 hover:text-black
                transition-all duration-300 flex items-center justify-center gap-3
              "
            >
              {isSubmitting ? (
                <>
                  <motion.div
                    className="w-6 h-6 border-4 border-t-transparent border-purple-100 rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  Sending...
                </>
              ) : (
                <>
                  <FiSend className="w-6 h-6" />
                  Send Message
                </>
              )}
            </motion.button>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
}