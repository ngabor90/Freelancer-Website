import {
  Send,
  CheckCircle,
  AlertCircle,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/Button";
import { useState } from "react";
import emailjs from "@emailjs/browser";
import { useLanguage } from "@/context/useLanguage";
import { BookingWidget } from "@/components/BookingWidget";

export const Contact = () => {
  const { t } = useLanguage();
  const { contact } = t;
  const contactIcons = [Mail, Phone, MapPin];

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
      setSubmitStatus({ type: "success", message: contact.form.success });
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
    <section id="contact" className="py-28 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-highlight/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-secondary-foreground text-sm font-medium tracking-wider uppercase animate-fade-in">
            {contact.eyebrow}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 animate-fade-in animation-delay-100 text-secondary-foreground">
            {contact.titleLine}{" "}
            <span className="font-serif italic font-normal text-foreground">
              {contact.titleHighlight}
            </span>
          </h2>
          <p className="text-muted-foreground animate-fade-in animation-delay-200">
            {contact.description}
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 max-w-5xl mx-auto">
          {/* Form */}
          <div className="glass p-8 rounded-3xl border border-primary/30 animate-fade-in animation-delay-300 order-1 lg:order-none lg:col-start-1 lg:row-start-1 lg:row-span-2">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={(e) =>
                  setFormData({ ...formData, company: e.target.value })
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

              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2"
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
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-surface rounded-xl border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2"
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
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-surface rounded-xl border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium mb-2"
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
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-surface rounded-xl border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2"
                >
                  {contact.form.message}
                </label>
                <textarea
                  id="message"
                  rows={5}
                  required
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder={contact.form.messagePlaceholder}
                  className="w-full px-4 py-3 bg-surface rounded-xl border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none"
                />
              </div>

              <Button
                className="w-full"
                type="submit"
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>{contact.form.sending}</>
                ) : (
                  <>
                    {contact.form.send}
                    <Send className="w-5 h-5" />
                  </>
                )}
              </Button>

              {submitStatus.type && (
                <div
                  className={`flex items-center gap-3
                     p-4 rounded-xl ${
                       submitStatus.type === "success"
                         ? "bg-green-500/10 border border-green-500/20 text-green-400"
                         : "bg-red-500/10 border border-red-500/20 text-red-400"
                     }`}
                >
                  {submitStatus.type === "success" ? (
                    <CheckCircle className="w-5 h-5 shrink-0" />
                  ) : (
                    <AlertCircle className="w-5 h-5 shrink-0" />
                  )}
                  <p className="text-sm">{submitStatus.message}</p>
                </div>
              )}
            </form>
          </div>

          <div className="glass rounded-3xl p-8 border border-primary/30 animate-fade-in animation-delay-500 order-2 lg:order-none lg:col-start-1 lg:col-span-2 lg:row-start-3">
            <h3 className="text-xl font-semibold mb-2">
              {contact.bookingTitle}
            </h3>
            <p className="text-muted-foreground text-sm mb-6">
              {contact.bookingText}
            </p>
            <BookingWidget />
          </div>

          <div className="glass rounded-3xl p-8 animate-fade-in animation-delay-400 order-3 lg:order-none lg:col-start-2 lg:row-start-1">
            <h3 className="text-xl font-semibold mb-6">{contact.infoTitle}</h3>
            <div className="space-y-4">
              {contact.info.map((item, i) => {
                const Icon = contactIcons[i] ?? Mail;

                return (
                  <a
                    key={i}
                    href={item.href}
                    className="flex items-center gap-4 p-4 rounded-xl hover:bg-surface transition-colors group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>

                    <div>
                      <div className="text-sm text-muted-foreground">
                        {item.label}
                      </div>
                      <div className="font-medium">{item.value}</div>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>

          <div className="glass rounded-3xl p-8 border border-primary/30 animate-fade-in animation-delay-400 order-4 lg:order-none lg:col-start-2 lg:row-start-2">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              <span className="font-medium">{contact.availableTitle}</span>
            </div>
            <p className="text-muted-foreground text-sm">
              {contact.availableText}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
