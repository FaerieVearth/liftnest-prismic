"use client";
import { useState, FormEvent, useRef } from "react";
import Bounded from "./Bounded";
import emailjs from "@emailjs/browser";

interface ContactFormProps {
  title: string;
  body: string;
  facebook?: string;
  instagram?: string;
  gdprText: string;
  sendButtonText?: string;
  recipientEmail: string;
}

const ContactForm = ({
  title,
  body,
  facebook,
  instagram,
  gdprText,
  sendButtonText = "Send Message"
}: ContactFormProps): JSX.Element => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    gdpr: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<string | null>(null);

  const serviceID = process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID || "";
  const templateID = process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_ID || "";
  const userID = process.env.NEXT_PUBLIC_EMAIL_USER_ID || "";

  const sendEmail = async (event: FormEvent) => {
    event.preventDefault();
    

    try {
      const emailParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message
      };

      console.log(emailParams);

      const res = await emailjs.send(serviceID, templateID, emailParams, userID);

      if (res.status === 200) {
        setSubmitStatus("Message sent successfully!");
        setFormData({
          name: "",
          email: "",
          message: "",
          gdpr: false
        });
      }
    } catch (error) {
      setSubmitStatus("Failed to send message. Please try again later.");
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.gdpr) {
      setSubmitStatus("Please accept the GDPR consent");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          formData
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus("Message sent successfully!");
        setFormData({ name: "", email: "", message: "", gdpr: false });
      } else {
        setSubmitStatus(
          data.error || "Failed to send message. Please try again.",
        );
      }
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitStatus("An error occurred. Please try again.");
    }
    setIsSubmitting(false);
  };

  return (
    <Bounded className="relative bg-[#383D2A] p-6 text-white lg:py-12">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Left side - Info */}
        <div className="my-auto flex flex-col gap-4 space-y-6">
          <h2 className="text-3xl font-bold">{title}</h2>
          <div className="prose prose-invert">{body}</div>
          <div className="flex gap-4">
            {facebook && (
              <a
                href={facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-75"
                aria-label="Facebook"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
              </a>
            )}
            {instagram && (
              <a
                href={instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-75"
                aria-label="Instagram"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            )}
          </div>
        </div>

        {/* Right side - Form */}
        <form
          onSubmit={sendEmail}
          className="space-y-4 rounded-xl bg-[#FBF8EF] p-8 text-black lg:min-w-[300px]"
        >
          <div>
            <label htmlFor="name" className="mb-1 block text-sm font-medium">
              Name
            </label>
            <input
              type="text"
              id="name"
              required
              className="w-full rounded-md border px-4 py-2 text-black"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          </div>
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              required
              className="w-full rounded-md border px-4 py-2 text-black"
              value={formData.email}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, email: e.target.value }))
              }
            />
          </div>
          <div>
            <label htmlFor="message" className="mb-1 block text-sm font-medium">
              Message
            </label>
            <textarea
              id="message"
              required
              rows={4}
              className="w-full rounded-md border px-4 py-2 text-black"
              value={formData.message}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, message: e.target.value }))
              }
            />
          </div>
          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              id="gdpr"
              required
              checked={formData.gdpr}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, gdpr: e.target.checked }))
              }
              className="mt-1"
            />
            <label htmlFor="gdpr" className="text-sm">
              {gdprText}
            </label>
          </div>
          {submitStatus && (
            <p
              className={`text-sm ${submitStatus.includes("success") ? "text-green-600" : "text-red-600"}`}
            >
              {submitStatus}
            </p>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-xl bg-[#383D2A] px-4 py-2 text-white hover:bg-[#484D3A] disabled:opacity-50"
          >
            {isSubmitting ? "Sending..." : sendButtonText}
          </button>
        </form>
      </div>
    </Bounded>
  );
};

export default ContactForm;
