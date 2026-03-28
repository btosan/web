"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import EnquiryForm from "@/components/Enquiry";
import GoogleEnquiryForm from "@/components/GoogleEnquiryForm";

export default function EnquirySection() {
  const [open, setOpen] = useState(false);
  const [method, setMethod] = useState<"whatsapp" | "email" | null>(null);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (method && formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [method]);

  const handleClose = () => {
    setOpen(false);
    setMethod(null);
  };

  return (
    <section
      id="enquiry"
      className="relative bg-black text-gray-100 pt-8 pb-24 md:py-20 lg:py-24 px-6 md:px-16 lg:px-24 border-t border-gray-700/20 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center">
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-sm md:text-base uppercase tracking-[0.25em] text-gray-500 mb-4"
          >
            Project Enquiry
          </motion.p>

          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-2xl md:text-4xl lg:text-5xl font-semibold mb-6 text-purple-200/70 leading-tight"
          >
            Ready to Launch Your Custom App?
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, scaleX: 0.9 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="w-16 h-px bg-gray-700 mx-auto mb-6"
          />

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
            className="text-gray-400 text-base md:text-lg leading-relaxed max-w-3xl mx-auto mb-10"
          >
            Tell us a bit about your business and the package you want. We’ll
            respond with the next steps, estimated timelines, and a clear
            breakdown of what your project will require.
          </motion.p>

          {!method && (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <button
                onClick={() => setOpen(true)}
                className="inline-flex items-center justify-center bg-linear-to-bl hover:from-purple-50 hover:via-purple-100 hover:to-indigo-100 hover:text-black text-base md:text-lg lg:text-xl font-semibold uppercase rounded-md px-10 py-4 from-indigo-900/5 via-indigo-700/5 to-purple-600/5 text-purple-300 transition-all duration-300 hover:cursor-pointer shadow-xl"
              >
                Start Your Project
              </button>
            </motion.div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
            onClick={handleClose}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-3xl bg-gray-900 border border-gray-700 rounded-3xl p-6 md:p-8 lg:p-10 max-h-[90vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={handleClose}
                className="absolute top-5 right-5 text-gray-400 hover:text-white transition text-lg"
                aria-label="Close modal"
              >
                ✕
              </button>

              {!method && (
                <div className="pr-6 md:pr-8">
                  <p className="text-sm uppercase tracking-[0.2em] text-gray-500 mb-3">
                    Choose a Contact Method
                  </p>

                  <h3 className="text-2xl md:text-3xl font-semibold text-purple-100 mb-4">
                    How would you like to continue?
                  </h3>

                  <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-8 max-w-2xl">
                    Select the option that works best for you. You can either
                    continue directly on WhatsApp for a faster conversation or
                    use the email form for a more structured project brief.
                  </p>

                  <div className="grid gap-4">
                    <button
                      onClick={() => setMethod("whatsapp")}
                      className="w-full text-left bg-green-500 hover:bg-green-400 text-black font-semibold py-5 px-6 rounded-2xl transition-all"
                    >
                      <span className="block text-lg">Continue on WhatsApp</span>
                      <span className="block text-sm opacity-80 mt-1">
                        Best for quick discussions and rapid follow-up.
                      </span>
                    </button>

                    <button
                      onClick={() => setMethod("email")}
                      className="w-full text-left border border-purple-100 text-purple-100 hover:bg-purple-100 hover:text-black font-semibold py-5 px-6 rounded-2xl transition-all"
                    >
                      <span className="block text-lg">Use Email Form</span>
                      <span className="block text-sm opacity-80 mt-1">
                        Best for detailed project submissions and requirements.
                      </span>
                    </button>

                    <button
                      onClick={handleClose}
                      className="text-gray-400 text-sm mt-2 hover:text-gray-200 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {method === "whatsapp" && (
                <div className="mt-2" ref={formRef}>
                  <button
                    onClick={() => setMethod(null)}
                    className="mb-5 text-gray-400 text-sm hover:text-gray-200 transition"
                  >
                    ← Go back
                  </button>

                  <div className="mb-6">
                    <p className="text-sm uppercase tracking-[0.2em] text-gray-500 mb-2">
                      WhatsApp Enquiry
                    </p>
                    <h3 className="text-2xl md:text-3xl font-semibold text-purple-100 mb-3">
                      Share Your Project Details
                    </h3>
                    <p className="text-gray-400 text-base leading-relaxed">
                      Fill in the form below and continue the conversation on
                      WhatsApp with your project details already prepared.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-gray-800 bg-black/20 p-2 md:p-4">
                    <EnquiryForm />
                  </div>
                </div>
              )}

              {method === "email" && (
                <div className="mt-2" ref={formRef}>
                  <button
                    onClick={() => setMethod(null)}
                    className="mb-5 text-gray-400 text-sm hover:text-gray-200 transition"
                  >
                    ← Go back
                  </button>

                  <div className="mb-6">
                    <p className="text-sm uppercase tracking-[0.2em] text-gray-500 mb-2">
                      Email Enquiry
                    </p>
                    <h3 className="text-2xl md:text-3xl font-semibold text-purple-100 mb-3">
                      Submit a Detailed Brief
                    </h3>
                    <p className="text-gray-400 text-base leading-relaxed">
                      Use the form below to send a more structured enquiry with
                      the key information needed to review your project properly.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-gray-800 bg-black/20 p-2 md:p-4">
                    <GoogleEnquiryForm />
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}