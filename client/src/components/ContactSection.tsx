import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, MapPin, Clock, ExternalLink } from 'lucide-react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log('Form submitted:', formData);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      
      setTimeout(() => setSubmitted(false), 3000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 px-4" data-testid="contact-section">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12"
        >
          <span className="font-mono text-xs uppercase tracking-widest text-[#444444]">
            CONNECT
          </span>
          <h2 className="font-mono text-4xl md:text-5xl font-bold tracking-tighter text-[#EDEDED] mt-2">
            Get In Touch
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block font-mono text-xs uppercase tracking-widest text-[#888888] mb-2">
                  NAME
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-[#0A0A0A] border border-[rgba(255,255,255,0.08)] font-mono text-sm text-[#EDEDED] placeholder-[#444444] focus:border-[#00FFFF] focus:outline-none transition-colors"
                  placeholder="ENTER YOUR NAME"
                  required
                  data-testid="input-name"
                />
              </div>

              <div>
                <label className="block font-mono text-xs uppercase tracking-widest text-[#888888] mb-2">
                  EMAIL
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-[#0A0A0A] border border-[rgba(255,255,255,0.08)] font-mono text-sm text-[#EDEDED] placeholder-[#444444] focus:border-[#00FFFF] focus:outline-none transition-colors"
                  placeholder="your@email.com"
                  required
                  data-testid="input-email"
                />
              </div>

              <div>
                <label className="block font-mono text-xs uppercase tracking-widest text-[#888888] mb-2">
                  MESSAGE
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 bg-[#0A0A0A] border border-[rgba(255,255,255,0.08)] font-mono text-sm text-[#EDEDED] placeholder-[#444444] focus:border-[#00FFFF] focus:outline-none transition-colors resize-none h-32"
                  placeholder="Your message here..."
                  required
                  data-testid="input-message"
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className={`w-full px-6 py-4 font-mono text-sm uppercase tracking-widest flex items-center justify-center gap-2 transition-colors ${
                  submitted
                    ? 'bg-[#00FF00] text-[#030303] border-[#00FF00]'
                    : 'bg-[#EDEDED] text-[#030303] border-[#EDEDED]'
                } border`}
                data-testid="button-submit-contact"
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-pulse">TRANSMITTING</span>
                    <span className="terminal-cursor" />
                  </>
                ) : submitted ? (
                  <>MESSAGE RECEIVED</>
                ) : (
                  <>
                    SEND MESSAGE
                    <Send className="w-4 h-4" />
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="space-y-6"
          >
            <div className="p-6 bg-[#0A0A0A] border border-[rgba(255,255,255,0.08)]">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 flex items-center justify-center border border-[rgba(255,255,255,0.08)] text-[#00FFFF]">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-mono text-sm font-bold text-[#EDEDED] mb-1">
                    EMAIL
                  </h4>
                  <p className="font-mono text-sm text-[#888888]">
                    hello@d3v3l0p3r.dev
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-[#0A0A0A] border border-[rgba(255,255,255,0.08)]">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 flex items-center justify-center border border-[rgba(255,255,255,0.08)] text-[#00FFFF]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-mono text-sm font-bold text-[#EDEDED] mb-1">
                    LOCATION
                  </h4>
                  <p className="font-mono text-sm text-[#888888]">
                    Remote / Worldwide
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-[#0A0A0A] border border-[rgba(255,255,255,0.08)]">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 flex items-center justify-center border border-[rgba(255,255,255,0.08)] text-[#00FFFF]">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-mono text-sm font-bold text-[#EDEDED] mb-1">
                    RESPONSE TIME
                  </h4>
                  <p className="font-mono text-sm text-[#888888]">
                    Usually within 24 hours
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 border border-[#00FFFF]/20 bg-[#00FFFF]/5">
              <h4 className="font-mono text-sm font-bold text-[#00FFFF] mb-2">
                QUICK LINKS
              </h4>
              <div className="space-y-2">
                {['GitHub', 'LinkedIn', 'Twitter', 'Dribbble'].map((link) => (
                  <button
                    key={link}
                    onClick={() => console.log(`${link} clicked`)}
                    className="flex items-center gap-2 font-mono text-sm text-[#888888] hover:text-[#EDEDED] transition-colors"
                    data-testid={`link-${link.toLowerCase()}`}
                  >
                    <ExternalLink className="w-3 h-3" />
                    {link}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
