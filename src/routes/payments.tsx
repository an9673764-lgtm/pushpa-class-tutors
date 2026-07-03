import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Landmark,
  CreditCard,
  Smartphone,
  Globe,
  ShieldCheck,
  Lock,
  Zap,
  Phone,
  Mail,
  ExternalLink,
  Check,
} from "lucide-react";

export const Route = createFileRoute("/payments")({
  head: () => ({
    meta: [
      { title: "Payment Options — Pushpa Online Tuition" },
      { name: "description", content: "Secure payment options for Pushpa Online Tuition. Bank transfer, cards, UPI, PayPal, Wise and more." },
      { property: "og:title", content: "Payment Options — Pushpa Online Tuition" },
      { property: "og:description", content: "Choose your preferred payment method and complete your enrollment securely." },
      { property: "og:url", content: "/payments" },
    ],
    links: [{ rel: "canonical", href: "/payments" }],
  }),
  component: PaymentsPage,
});

const paymentCards = [
  {
    id: "bank",
    emoji: "🏦",
    title: "Bank Transfer",
    gradient: "from-[#0F172A] to-[#1E3A8A]",
    icon: Landmark,
    iconBg: "bg-blue-100 text-blue-700",
    rows: [
      { label: "Account Name", value: "Pushpa Education" },
      { label: "Bank", value: "XXXX Bank" },
      { label: "Account Number", value: "XXXXXXXXXX" },
      { label: "Sort Code / IFSC", value: "Available on request" },
    ],
    badge: "Secure Direct Transfer",
    badgeColor: "bg-blue-600",
  },
  {
    id: "card",
    emoji: "💳",
    title: "Online Payment",
    gradient: "from-[#7C3AED] to-[#A855F7]",
    icon: CreditCard,
    iconBg: "bg-purple-100 text-purple-700",
    rows: [
      { label: "Methods", value: "Debit Card · Credit Card" },
      { label: "Visa", value: "Accepted" },
      { label: "MasterCard", value: "Accepted" },
      { label: "American Express", value: "Accepted" },
    ],
    badge: "Secure Payment Gateway",
    badgeColor: "bg-purple-600",
  },
  {
    id: "wallet",
    emoji: "📱",
    title: "Digital Wallets",
    gradient: "from-[#059669] to-[#10B981]",
    icon: Smartphone,
    iconBg: "bg-emerald-100 text-emerald-700",
    rows: [
      { label: "UPI", value: "Supported" },
      { label: "Google Pay", value: "Supported" },
      { label: "PhonePe", value: "Supported" },
      { label: "Paytm", value: "Supported" },
      { label: "Apple Pay", value: "Supported" },
    ],
    badge: "Instant Payment",
    badgeColor: "bg-emerald-600",
  },
  {
    id: "international",
    emoji: "🌍",
    title: "International Payments",
    gradient: "from-[#2563EB] to-[#3B82F6]",
    icon: Globe,
    iconBg: "bg-sky-100 text-sky-700",
    rows: [
      { label: "PayPal", value: "Available" },
      { label: "Wise", value: "Available" },
      { label: "Stripe", value: "Available" },
      { label: "International Bank Transfer", value: "Available" },
    ],
    badge: "Multi-Currency Supported",
    badgeColor: "bg-blue-500",
  },
];

const trustBadges = [
  { emoji: "✅", text: "100% Secure Transactions" },
  { emoji: "🔒", text: "SSL Encrypted Payments" },
  { emoji: "⚡", text: "Instant Payment Confirmation" },
];

const paymentIcons = [
  { label: "Visa", color: "#1A1F71" },
  { label: "MasterCard", color: "#EB001B" },
  { label: "PayPal", color: "#003087" },
  { label: "Stripe", color: "#635BFF" },
  { label: "Google Pay", color: "#4285F4" },
  { label: "Apple Pay", color: "#000000" },
  { label: "UPI", color: "#1E3A8A" },
];

const pricingRows = [
  { level: "Years 2–8", rate: "£12", monthly: "£144", months3: "£432", months6: "£864", yearly: "£1,728" },
  { level: "Years 2–8", rate: "£15", monthly: "£180", months3: "£540", months6: "£1,080", yearly: "£2,160" },
  { level: "Years 9–GCSE", rate: "£15", monthly: "£180", months3: "£540", months6: "£1,080", yearly: "£2,160" },
  { level: "Years 9–GCSE", rate: "£20", monthly: "£240", months3: "£720", months6: "£1,440", yearly: "£2,880" },
  { level: "AS & A Level", rate: "£25", monthly: "£300", months3: "£900", months6: "£1,800", yearly: "£3,600" },
  { level: "AS & A Level", rate: "£30", monthly: "£360", months3: "£1,080", months6: "£2,160", yearly: "£4,320" },
];

const discountRows = [
  { plan: "Monthly", discount: "No discount" },
  { plan: "3 Months", discount: "5% Off" },
  { plan: "6 Months", discount: "10% Off" },
  { plan: "Yearly", discount: "15% Off" },
];

export default function PaymentsPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* HERO HEADER */}
      <section
        className="relative overflow-hidden py-16 md:py-20 text-white"
        style={{ background: "linear-gradient(135deg, #0F172A 0%, #1E3A8A 50%, #2563EB 100%)" }}
      >
        <div
          aria-hidden
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 30%, rgba(245,158,11,0.4), transparent 40%), radial-gradient(circle at 80% 70%, rgba(236,72,153,0.3), transparent 40%)",
          }}
        />
        <div className="container-page relative text-center">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-semibold backdrop-blur">
            <span className="text-lg">💳</span>
            <span className="uppercase tracking-wider">Easy & Secure Payment Options</span>
          </div>
          <h1 className="mt-5 text-3xl md:text-5xl font-bold leading-tight">
            Choose Your Preferred Payment Method
          </h1>
          <p className="mt-4 mx-auto max-w-2xl text-lg text-white/85">
            Choose your preferred payment method and complete your enrollment securely.
          </p>
        </div>
      </section>

      {/* PRICING TABLES */}
      <section className="container-page pb-4">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#2563EB]/10 text-[#2563EB] px-4 py-1.5 text-xs font-bold uppercase tracking-wider">
            💰 Transparent Pricing
          </div>
          <h2 className="mt-4 text-3xl md:text-4xl font-bold text-[#0F172A]">
            Class Plans & Pricing
          </h2>
          <p className="mt-3 text-slate-600 max-w-2xl mx-auto">
            Based on 12 classes per month. Choose the plan that fits your learning goals.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Pricing table */}
          <div className="lg:col-span-2 rounded-3xl bg-white shadow-xl border border-slate-100 overflow-hidden">
            <div className="bg-gradient-to-r from-[#0F172A] to-[#1E3A8A] px-6 py-4">
              <h3 className="text-white font-bold text-lg">Plan Prices by Level</h3>
              <p className="text-white/70 text-xs mt-1">All prices in GBP (£)</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-slate-600">
                  <tr>
                    <th className="text-left font-semibold px-4 py-3">Level</th>
                    <th className="text-right font-semibold px-4 py-3">Hourly</th>
                    <th className="text-right font-semibold px-4 py-3">Monthly<br/><span className="text-[10px] font-normal">(12 Classes)</span></th>
                    <th className="text-right font-semibold px-4 py-3">3 Months</th>
                    <th className="text-right font-semibold px-4 py-3">6 Months</th>
                    <th className="text-right font-semibold px-4 py-3">Yearly<br/><span className="text-[10px] font-normal">(12 Months)</span></th>
                  </tr>
                </thead>
                <tbody>
                  {pricingRows.map((r, i) => (
                    <tr key={i} className="border-t border-slate-100 hover:bg-slate-50/70 transition">
                      <td className="px-4 py-3 font-semibold text-[#0F172A]">{r.level}</td>
                      <td className="px-4 py-3 text-right text-[#2563EB] font-bold">{r.rate}</td>
                      <td className="px-4 py-3 text-right text-slate-700">{r.monthly}</td>
                      <td className="px-4 py-3 text-right text-slate-700">{r.months3}</td>
                      <td className="px-4 py-3 text-right text-slate-700">{r.months6}</td>
                      <td className="px-4 py-3 text-right font-bold text-[#0F172A]">{r.yearly}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Discounts card */}
          <div className="rounded-3xl bg-white shadow-xl border border-slate-100 overflow-hidden">
            <div className="bg-gradient-to-r from-[#F59E0B] to-[#FBBF24] px-6 py-4">
              <h3 className="text-[#0F172A] font-bold text-lg">🎉 Longer Plan Discounts</h3>
              <p className="text-[#0F172A]/70 text-xs mt-1">Save more when you commit longer</p>
            </div>
            <ul className="p-4 divide-y divide-slate-100">
              {discountRows.map((d) => (
                <li key={d.plan} className="flex items-center justify-between py-3 px-2">
                  <span className="font-semibold text-[#0F172A]">{d.plan}</span>
                  <span
                    className={`text-sm font-bold px-3 py-1 rounded-full ${
                      d.discount === "No discount"
                        ? "bg-slate-100 text-slate-500"
                        : "bg-emerald-100 text-emerald-700"
                    }`}
                  >
                    {d.discount}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* PAYMENT CARDS + QR */}
      <section className="container-page py-14 md:py-20">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cards column */}
          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-6">
            {paymentCards.map((card) => (
              <div
                key={card.id}
                className="group relative overflow-hidden rounded-3xl bg-white shadow-xl border border-slate-100 transition-transform hover:-translate-y-1.5"
              >
                {/* Gradient header */}
                <div
                  className={`px-6 py-4 bg-gradient-to-r ${card.gradient} flex items-center justify-between`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{card.emoji}</span>
                    <h3 className="text-lg font-bold text-white">{card.title}</h3>
                  </div>
                  <div className={`grid place-items-center size-9 rounded-full ${card.iconBg}`}>
                    <card.icon className="size-5" />
                  </div>
                </div>

                {/* Body */}
                <div className="p-6">
                  <ul className="space-y-3">
                    {card.rows.map((row) => (
                      <li
                        key={row.label}
                        className="flex items-start justify-between gap-3 text-sm"
                      >
                        <span className="text-slate-500 font-medium">{row.label}</span>
                        <span className="text-right text-slate-800 font-semibold">{row.value}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold text-white ${card.badgeColor}`}
                    >
                      <ShieldCheck className="size-3.5" />
                      {card.badge}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* QR column */}
          <div className="flex flex-col gap-6">
            <div className="flex-1 rounded-3xl bg-white border-[3px] border-[#2563EB] shadow-xl p-6 md:p-8 flex flex-col items-center justify-center text-center">
              <div className="relative">
                <div className="rounded-2xl bg-slate-50 p-4 md:p-5 border border-slate-100">
                  <QrPlaceholder />
                </div>
                <div className="absolute -top-3 -right-3 bg-[#2563EB] text-white rounded-full p-2 shadow-lg">
                  <Smartphone className="size-5" />
                </div>
              </div>
              <h3 className="mt-6 text-xl font-bold text-[#0F172A]">Scan to Pay</h3>
              <p className="mt-2 text-sm font-semibold text-[#2563EB] tracking-wide">
                Fast • Safe • Secure
              </p>
              <p className="mt-4 text-xs text-slate-500 max-w-[260px]">
                Use your preferred UPI app or wallet to scan and complete the payment instantly.
              </p>
            </div>

            {/* Quick contact mini-card */}
            <div className="rounded-3xl bg-gradient-to-br from-[#0F172A] to-[#1E3A8A] p-6 text-white shadow-xl">
              <h4 className="font-bold text-lg">Need payment help?</h4>
              <p className="mt-1 text-sm text-white/75">Our team is available 24/7.</p>
              <div className="mt-4 space-y-2 text-sm">
                <a href="tel:+918939577588" className="flex items-center gap-2 hover:text-[#F59E0B] transition">
                  <Phone className="size-4" /> +91 8939 577 588
                </a>
                <a href="mailto:support@pushpaedu.com" className="flex items-center gap-2 hover:text-[#F59E0B] transition">
                  <Mail className="size-4" /> support@pushpaedu.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Trust banner */}
        <div
          className="mt-10 rounded-2xl p-5 md:p-6 flex flex-wrap items-center justify-center gap-4 md:gap-8 shadow-lg"
          style={{
            background: "linear-gradient(90deg, #EC4899 0%, #F59E0B 50%, #10B981 100%)",
          }}
        >
          {trustBadges.map((b) => (
            <div
              key={b.text}
              className="flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-sm font-bold text-[#0F172A] shadow-sm"
            >
              <span>{b.emoji}</span>
              <span>{b.text}</span>
            </div>
          ))}
        </div>

        {/* CTA bar */}
        <div
          className="mt-10 rounded-3xl p-6 md:p-8 shadow-xl relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #F59E0B 0%, #FBBF24 50%, #FCD34D 100%)",
          }}
        >
          <div className="relative grid md:grid-cols-2 gap-6 items-center">
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-[#0F172A]">Need Help With Payment?</h3>
              <p className="mt-1 text-sm md:text-base text-[#0F172A]/80">
                Reach out and our team will guide you through the enrollment process.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 md:justify-end">
              <a
                href="tel:+918939577588"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0F172A] px-5 py-3 text-sm font-bold text-white shadow-lg hover:bg-[#1E293B] transition"
              >
                <Phone className="size-4" /> +91 8939 577 588
              </a>
              <a
                href="mailto:support@pushpaedu.com"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-[#0F172A] shadow-lg hover:bg-slate-50 transition"
              >
                <Mail className="size-4" /> support@pushpaedu.com
              </a>
              <a
                href="https://www.pushpaedu.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-[#0F172A] shadow-lg hover:bg-slate-50 transition"
              >
                <Globe className="size-4" /> www.pushpaedu.com
              </a>
            </div>
          </div>
        </div>

        {/* Payment icons + note */}
        <div className="mt-10 text-center">
          <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">
            We Accept
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {paymentIcons.map((icon) => (
              <span
                key={icon.label}
                className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-bold shadow-md border border-slate-100"
                style={{ color: icon.color }}
              >
                <span
                  className="inline-block size-2.5 rounded-full"
                  style={{ backgroundColor: icon.color }}
                />
                {icon.label}
              </span>
            ))}
          </div>
          <p className="mt-6 text-sm text-slate-500 max-w-2xl mx-auto">
            All payments are processed securely. Receipts will be sent automatically after successful payment.
          </p>
        </div>

        {/* Enrollment CTA */}
        <div className="mt-12 text-center">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-xl px-7 py-4 text-sm font-bold text-white shadow-xl hover:scale-[1.03] transition-transform"
            style={{ background: "linear-gradient(135deg, #2563EB 0%, #1E40AF 100%)" }}
          >
            Complete Your Enrollment <ExternalLink className="size-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}

function QrPlaceholder() {
  return (
    <div className="w-40 h-40 md:w-48 md:h-48 relative">
      <svg viewBox="0 0 100 100" className="w-full h-full text-[#0F172A]" fill="currentColor">
        {/* QR code frame corners */}
        <rect x="5" y="5" width="25" height="25" fill="none" stroke="currentColor" strokeWidth="6" />
        <rect x="12" y="12" width="11" height="11" fill="currentColor" />
        <rect x="70" y="5" width="25" height="25" fill="none" stroke="currentColor" strokeWidth="6" />
        <rect x="77" y="12" width="11" height="11" fill="currentColor" />
        <rect x="5" y="70" width="25" height="25" fill="none" stroke="currentColor" strokeWidth="6" />
        <rect x="12" y="77" width="11" height="11" fill="currentColor" />
        {/* Inner pattern */}
        <rect x="37" y="5" width="6" height="6" />
        <rect x="48" y="5" width="6" height="6" />
        <rect x="37" y="16" width="6" height="6" />
        <rect x="55" y="16" width="6" height="6" />
        <rect x="5" y="37" width="6" height="6" />
        <rect x="16" y="48" width="6" height="6" />
        <rect x="37" y="37" width="25" height="25" fill="none" stroke="currentColor" strokeWidth="5" />
        <rect x="44" y="44" width="11" height="11" fill="currentColor" />
        <rect x="70" y="37" width="6" height="6" />
        <rect x="82" y="48" width="6" height="6" />
        <rect x="89" y="37" width="6" height="6" />
        <rect x="5" y="70" width="25" height="25" />
        <rect x="37" y="70" width="6" height="6" />
        <rect x="48" y="77" width="6" height="6" />
        <rect x="55" y="70" width="6" height="6" />
        <rect x="70" y="70" width="6" height="6" />
        <rect x="82" y="77" width="6" height="6" />
        <rect x="77" y="89" width="6" height="6" />
        <rect x="89" y="82" width="6" height="6" />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-white/90 rounded-full p-2 shadow-lg border border-slate-100">
          <Check className="size-6 text-[#10B981]" />
        </div>
      </div>
    </div>
  );
}
