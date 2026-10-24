
import {
  Send,
  CheckCircle,
  AlertCircle,
  Mail,
  Phone,
  MapPin,
  Copy,
  Check,
} from "lucide-react";
import { Button } from "@/components/Button";
import { useState } from "react";
import emailjs from "@emailjs/browser";
import { useLanguage } from "@/context/useLanguage";
import { BookingWidget } from "@/components/BookingWidget";
import { Reveal } from "@/components/Reveal";

export const Contact = () => {
  const { t } = useLanguage();
  const { contact } = t;
  const contactIcons = [Mail, Phone, MapPin];

  const [copiedLabel, setCopiedLabel] = useState(null);

  const handleCopy = (e, text, label) => {
    e.preventDefault();
    e.stopPropagation();

    if (navigator?.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedLabel(label);
      setTimeout(() => setCopiedLabel(null), 2000);
    }
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    company: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const [submitStatus, setSubmitStatus] = useState({
    type: null,
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.company) {
      setSubmitStatus({
        type: "success",
        message: contact.form.success,
      });

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        company: "",
      });

      return;
    }

    setIsLoading(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        throw new Error(
          "EmailJS configuration is missing. Please check your environment variables.",
        );
      }

      await emailjs.send(
        serviceId,
        templateId,
        {
          form_name: formData.name,
          "input-email": formData.email,
          "input-subject": formData.subject,
          "input-text": formData.message,
        },
        publicKey,
      );

      setSubmitStatus({
        type: "success",
        message: contact.form.success,
      });

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        company: "",
      });
    } catch (err) {
      console.error("EmailJS error:", err);

      setSubmitStatus({
        type: "error",
        message: err.text || contact.form.error,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative w-full max-w-full overflow-hidden py-16 sm:py-20 lg:py-28"
    >
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-highlight/5 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto w-full max-w-full min-w-0 px-4 sm:px-6">

        {/* Header */}
        <Reveal>
          <div className="mx-auto mb-10 sm:mb-16 w-full min-w-0 max-w-3xl text-center">
            <span className="text-secondary-foreground text-sm font-medium tracking-wider uppercase">
              {contact.eyebrow}
            </span>

            <h2 className="mt-4 mb-6 text-3xl sm:text-4xl md:text-5xl font-bold text-secondary-foreground wrap-break-word">
              {contact.titleLine}{" "}
              <span className="font-serif italic font-normal text-foreground">
                {contact.titleHighlight}
              </span>
            </h2>

            <p className="text-muted-foreground wrap-break-word">
              {contact.description}
            </p>
          </div>
        </Reveal>

        {/* Main Grid */}
        <div className="mx-auto grid w-full min-w-0 max-w-5xl grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-12">

          {/* Contact Form */}
          <Reveal
            delay={100}
            className="order-1 w-full min-w-0 lg:order-0 lg:col-start-1 lg:row-start-1 lg:row-span-2"
          >
            <div className="glass h-full w-full min-w-0 rounded-3xl border border-primary/30 p-4 sm:p-8">
              <form
                className="w-full min-w-0 space-y-6"
                onSubmit={handleSubmit}
              >
                {/* Honeypot */}
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      company: e.target.value,
                    })
                  }
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    left: "-9999px",
                    width: "1px",
                    height: "1px",
                    opacity: 0,
                  }}
                />

                {/* Name */}
                <div className="w-full min-w-0">
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium"
                  >
                    {contact.form.name}
                  </label>

                  <input
                    id="name"
                    type="text"
                    required
                    placeholder={contact.form.namePlaceholder}
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        name: e.target.value,
                      })
                    }
                    className="block box-border w-full min-w-0 max-w-full rounded-xl border border-border bg-surface px-4 py-3 outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>

                {/* Email */}
                <div className="w-full min-w-0">
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium"
                  >
                    {contact.form.email}
                  </label>

                  <input
                    id="email"
                    type="email"
                    required
                    placeholder={contact.form.emailPlaceholder}
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        email: e.target.value,
                      })
                    }
                    className="block box-border w-full min-w-0 max-w-full rounded-xl border border-border bg-surface px-4 py-3 outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>

                {/* Subject */}
                <div className="w-full min-w-0">
                  <label
                    htmlFor="subject"
                    className="mb-2 block text-sm font-medium"
                  >
                    {contact.form.subject}
                  </label>

                  <input
                    id="subject"
                    type="text"
                    required
                    placeholder={contact.form.subjectPlaceholder}
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        subject: e.target.value,
                      })
                    }
                    className="block box-border w-full min-w-0 max-w-full rounded-xl border border-border bg-surface px-4 py-3 outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>

                {/* Message */}
                <div className="w-full min-w-0">
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-medium"
                  >
                    {contact.form.message}
                  </label>

                  <textarea
                    id="message"
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        message: e.target.value,
                      })
                    }
                    placeholder={contact.form.messagePlaceholder}
                    className="block box-border w-full min-w-0 max-w-full resize-none rounded-xl border border-border bg-surface px-4 py-3 outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>

                {/* Submit Button */}
                <Button
                  className="w-full max-w-full"
                  type="submit"
                  size="lg"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>{contact.form.sending}</>
                  ) : (
                    <>
                      {contact.form.send}
                      <Send className="h-5 w-5 shrink-0" />
                    </>
                  )}
                </Button>

                {/* Submit Status */}
                {submitStatus.type && (
                  <div
                    className={`flex w-full min-w-0 items-center gap-3 rounded-xl p-4 ${
                      submitStatus.type === "success"
                        ? "border border-green-500/20 bg-green-500/10 text-green-400"
                        : "border border-red-500/20 bg-red-500/10 text-red-400"
                    }`}
                  >
                    {submitStatus.type === "success" ? (
                      <CheckCircle className="h-5 w-5 shrink-0" />
                    ) : (
                      <AlertCircle className="h-5 w-5 shrink-0" />
                    )}

                    <p className="min-w-0 wrap-break-word text-sm">
                      {submitStatus.message}
                    </p>
                  </div>
                )}
              </form>
            </div>
          </Reveal>

          {/* Contact Information */}
          <Reveal
            delay={200}
            className="order-3 w-full min-w-0 lg:order-0 lg:col-start-2 lg:row-start-1"
          >
            <div className="glass h-full w-full min-w-0 rounded-3xl border border-border/40 p-4 transition-colors hover:border-primary/40 sm:p-8">
              <h3 className="mb-6 text-xl font-semibold wrap-break-word">
                {contact.infoTitle}
              </h3>

              <div className="w-full min-w-0 space-y-4">
                {contact.info.map((item, i) => {
                  const Icon = contactIcons[i] ?? Mail;

                  const isCopyable =
                    item.href.startsWith("mailto:") ||
                    item.href.startsWith("tel:");

                  const isCopied = copiedLabel === item.label;

                  return (
                    <div
                      key={i}
                      className="group flex w-full min-w-0 items-center justify-between gap-2 rounded-xl p-2 transition-colors hover:bg-surface sm:p-4"
                    >
                      <a
                        href={item.href}
                        className="flex min-w-0 flex-1 items-center gap-2 sm:gap-4"
                      >
                        {/* Icon */}
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20 sm:h-12 sm:w-12">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>

                        {/* Contact Text */}
                        <div className="min-w-0 flex-1">
                          <div className="text-sm text-muted-foreground wrap-break-word">
                            {item.label}
                          </div>

                          <div
                            className="truncate font-medium"
                            title={item.value}
                          >
                            {item.value}
                          </div>
                        </div>
                      </a>

                      {/* Copy Button */}
                      {isCopyable && (
                        <button
                          type="button"
                          onClick={(e) =>
                            handleCopy(
                              e,
                              item.value,
                              item.label,
                            )
                          }
                          className={`ml-1 flex shrink-0 cursor-pointer items-center gap-1.5 rounded-lg border px-2 py-1.5 text-xs font-medium transition-all sm:ml-2 sm:px-3 ${
                            isCopied
                              ? "border-green-500/30 bg-green-500/15 text-green-400"
                              : "border-border/40 bg-surface text-muted-foreground hover:bg-primary/10 hover:text-primary"
                          }`}
                          title={
                            contact.copyTooltip ||
                            "Másolás vágólapra"
                          }
                          aria-label={`${item.label} másolása`}
                        >
                          {isCopied ? (
                            <>
                              <Check className="h-3.5 w-3.5 shrink-0 text-green-400" />
                              <span>
                                {contact.copied || "Másolva!"}
                              </span>
                            </>
                          ) : (
                            <>
                              <Copy className="h-3.5 w-3.5 shrink-0" />
                              <span className="hidden sm:inline">
                                {contact.copyBtn || "Másolás"}
                              </span>
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </Reveal>

          {/* Availability */}
          <Reveal
            delay={250}
            className="order-4 w-full min-w-0 lg:order-0 lg:col-start-2 lg:row-start-2"
          >
            <div className="glass h-full w-full min-w-0 rounded-3xl border border-primary/30 p-4 sm:p-8">
              <div className="mb-4 flex min-w-0 items-center gap-3">
                <span className="h-3 w-3 shrink-0 rounded-full bg-green-500 animate-pulse" />

                <span className="min-w-0 wrap-break-word font-medium">
                  {contact.availableTitle}
                </span>
              </div>

              <p className="wrap-break-word text-sm text-muted-foreground">
                {contact.availableText}
              </p>
            </div>
          </Reveal>

          {/* Booking Widget */}
          <Reveal
            delay={300}
            className="order-2 w-full min-w-0 lg:order-0 lg:col-start-1 lg:col-span-2 lg:row-start-3"
          >
            <div className="glass w-full min-w-0 max-w-full rounded-3xl border border-primary/30 p-4 sm:p-8">
              <h3 className="mb-2 text-xl font-semibold wrap-break-word">
                {contact.bookingTitle}
              </h3>

              <p className="mb-6 wrap-break-word text-sm text-muted-foreground">
                {contact.bookingText}
              </p>

              <div className="w-full min-w-0 max-w-full">
                <BookingWidget />
              </div>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
};
