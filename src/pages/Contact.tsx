import { useState } from "react";
import { motion } from "framer-motion";
import { Instagram, Youtube, Mail, Send } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

const socials = [
  {
    name: "Instagram",
    icon: Instagram,
    url: "https://instagram.com/ceezandray",
    handle: "@ceezandray",
  },
  {
    name: "TikTok",
    icon: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.71a8.21 8.21 0 0 0 4.76 1.52V6.79a4.85 4.85 0 0 1-1-.1z" />
      </svg>
    ),
    url: "https://tiktok.com/@ceezandray",
    handle: "@ceezandray",
  },
  {
    name: "YouTube",
    icon: Youtube,
    url: "https://youtube.com/@ceezandray",
    handle: "@ceezandray",
  },
  {
    name: "X (Twitter)",
    icon: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    url: "https://twitter.com/ceezandray",
    handle: "@ceezandray",
  },
];

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    inquiryType: "",
    message: "",
  });
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast({ title: "Please fill in all fields", variant: "destructive" });
      return;
    }
    setSending(true);
    const subject = formData.inquiryType ? `[${formData.inquiryType}] Contact from ${encodeURIComponent(formData.name)}` : `Contact from ${encodeURIComponent(formData.name)}`;
    const mailtoLink = `mailto:ceezandray@gmail.com?subject=${subject}&body=${encodeURIComponent(formData.message)}%0A%0AFrom: ${encodeURIComponent(formData.name)} (${encodeURIComponent(formData.email)})`;
    window.location.href = mailtoLink;
    setTimeout(() => {
      setSending(false);
      toast({ title: "Opening your email client..." });
      setFormData({ name: "", email: "", inquiryType: "", message: "" });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <section className="pt-32 pb-24 px-6">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="font-heading text-sm tracking-[0.3em] text-muted-foreground mb-4">
              GET IN TOUCH
            </h1>
            <h2 className="font-heading text-5xl md:text-6xl text-primary mb-6">
              CONTACT US
            </h2>
            <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Hit us up on socials or drop a message below. We're always down to connect.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-16">
            {/* Socials */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h3 className="font-heading text-2xl text-foreground mb-8">
                FOLLOW <span className="text-primary">THE MOVEMENT</span>
              </h3>
              <div className="space-y-5">
                {socials.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 border border-border rounded-lg hover:border-primary hover:bg-primary/5 transition-all duration-300 group"
                    >
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                        <Icon />
                      </div>
                      <div>
                        <p className="font-heading text-sm tracking-wider text-foreground">
                          {social.name}
                        </p>
                        <p className="text-muted-foreground text-sm">
                          {social.handle}
                        </p>
                      </div>
                    </a>
                  );
                })}
              </div>

              <div className="mt-8 flex items-center gap-3 text-muted-foreground">
                <Mail className="w-5 h-5 text-primary" />
                <a
                  href="mailto:ceezandray@gmail.com"
                  className="font-body text-sm hover:text-primary transition-colors"
                >
                  ceezandray@gmail.com
                </a>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h3 className="font-heading text-2xl text-foreground mb-8">
                DROP A <span className="text-primary">MESSAGE</span>
              </h3>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="font-heading text-xs tracking-wider text-muted-foreground mb-2 block">
                    NAME
                  </label>
                  <input
                    type="text"
                    maxLength={100}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-card border border-border rounded-lg px-4 py-3 text-foreground font-body focus:outline-none focus:border-primary transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="font-heading text-xs tracking-wider text-muted-foreground mb-2 block">
                    EMAIL
                  </label>
                  <input
                    type="email"
                    maxLength={255}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-card border border-border rounded-lg px-4 py-3 text-foreground font-body focus:outline-none focus:border-primary transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="font-heading text-xs tracking-wider text-muted-foreground mb-2 block">
                    INQUIRY TYPE
                  </label>
                  <select
                    value={formData.inquiryType}
                    onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                    className="w-full bg-card border border-border rounded-lg px-4 py-3 text-foreground font-body focus:outline-none focus:border-primary transition-colors"
                  >
                    <option value="">Select an inquiry type</option>
                    <option value="General Inquiries">General Inquiries</option>
                    <option value="Partnerships">Partnerships</option>
                    <option value="Distribution">Distribution</option>
                    <option value="Press & Media">Press & Media</option>
                  </select>
                </div>
                <div>
                  <label className="font-heading text-xs tracking-wider text-muted-foreground mb-2 block">
                    MESSAGE
                  </label>
                  <textarea
                    maxLength={1000}
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-card border border-border rounded-lg px-4 py-3 text-foreground font-body focus:outline-none focus:border-primary transition-colors resize-none"
                    placeholder="What's on your mind?"
                  />
                </div>
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full bg-primary text-primary-foreground font-heading text-sm tracking-wider py-3 rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  {sending ? "SENDING..." : "SEND MESSAGE"}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Contact;
