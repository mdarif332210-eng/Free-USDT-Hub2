import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, AlertCircle, ShieldCheck } from 'lucide-react';
import { MonetagSlot } from '../components/ads/MonetagSlot';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    honeypot: '', // anti-bot field
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);
    setFieldErrors({});

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        setStatus({
          type: 'success',
          message: data.message || 'Your inquiry has been safely received. Our editorial team will review it shortly.',
        });
        setFormData({ name: '', email: '', subject: '', message: '', honeypot: '' });
      } else {
        setStatus({
          type: 'error',
          message: data.message || 'There was an issue processing your submission.',
        });
        if (data.errors) {
          setFieldErrors(data.errors);
        }
      }
    } catch (err: any) {
      setStatus({
        type: 'error',
        message: 'Network error. Please try submitting again in a moment.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#6C3BDB]">
          <Mail className="w-4 h-4" />
          <span>Editorial Communications Desk</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#202033] tracking-tight">
          Contact Free USDT Hub
        </h1>
        <p className="text-sm sm:text-base text-[#6D7080] leading-relaxed">
          Submit questions regarding our research, suggest a cryptocurrency reward program for independent audit,
          report broken faucet links, or inquire about official Monetag advertising compliance.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Contact Form Card */}
        <div className="lg:col-span-8 neu-raised-card p-6 sm:p-8 rounded-3xl">
          {status && (
            <div
              className={`p-4 rounded-xl mb-6 flex items-start gap-3 text-xs ${
                status.type === 'success'
                  ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-900'
                  : 'bg-rose-500/10 border border-rose-500/30 text-rose-900'
              }`}
            >
              {status.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              )}
              <p className="font-medium">{status.message}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Honeypot hidden input for bot trapping */}
            <div className="hidden" aria-hidden="true">
              <input
                type="text"
                name="honeypot"
                tabIndex={-1}
                autoComplete="off"
                value={formData.honeypot}
                onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Satoshi Nakamoto"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl neu-inset focus:outline-none focus:ring-1 focus:ring-[#6C3BDB] text-slate-900"
                />
                {fieldErrors.name && (
                  <p className="text-[11px] text-rose-600 mt-1">{fieldErrors.name[0]}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl neu-inset focus:outline-none focus:ring-1 focus:ring-[#6C3BDB] text-slate-900"
                />
                {fieldErrors.email && (
                  <p className="text-[11px] text-rose-600 mt-1">{fieldErrors.email[0]}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Subject *
              </label>
              <input
                type="text"
                required
                placeholder="Audit Request / General Inquiry"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl neu-inset focus:outline-none focus:ring-1 focus:ring-[#6C3BDB] text-slate-900"
              />
              {fieldErrors.subject && (
                <p className="text-[11px] text-rose-600 mt-1">{fieldErrors.subject[0]}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Message Content *
              </label>
              <textarea
                required
                rows={5}
                placeholder="Provide details regarding your question or report..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl neu-inset focus:outline-none focus:ring-1 focus:ring-[#6C3BDB] text-slate-900 resize-none"
              />
              {fieldErrors.message && (
                <p className="text-[11px] text-rose-600 mt-1">{fieldErrors.message[0]}</p>
              )}
            </div>

            <div className="pt-2 flex items-center justify-between">
              <span className="text-[11px] text-slate-500">
                Protected by sliding-window rate limiting & spam traps.
              </span>
              <button
                type="submit"
                disabled={isSubmitting}
                className="neu-btn-primary px-6 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
              </button>
            </div>
          </form>
        </div>

        {/* Sidebar Info */}
        <div className="lg:col-span-4 space-y-6">
          <div className="neu-raised-card p-6 rounded-2xl space-y-3">
            <h3 className="font-bold text-sm text-[#202033] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#6C3BDB]" />
              Editorial Integrity Notice
            </h3>
            <p className="text-xs text-[#6D7080] leading-relaxed">
              We never accept payment or incentives to endorse unregulated financial products or high-yield investment programs (HYIPs).
              All submissions are strictly vetted against our Anti-Scam Charter.
            </p>
          </div>

          <div className="neu-inset p-5 rounded-2xl text-xs text-slate-600 space-y-2">
            <span className="font-semibold text-slate-900 block">Response Timeframe</span>
            <p>Our editorial and moderation team typically reviews submitted inquiries within 24 to 48 business hours.</p>
          </div>
        </div>
      </div>

      {/* Monetag Ad */}
      <MonetagSlot slotType="banner" />
    </div>
  );
};
