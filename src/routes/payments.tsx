import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { z } from "zod";
import {
  Check,
  ShieldCheck,
  Smartphone,
  CreditCard,
  Landmark,
  Globe,
  QrCode,
  Lock,
  Zap,
  BadgeCheck,
  ArrowLeft,
  Sparkles,
  Phone,
  Mail,
} from "lucide-react";

const searchSchema = z.object({
  level: z.enum(["y28", "y9g", "asa"]).optional(),
  duration: z.enum(["monthly", "3m", "6m", "yearly"]).optional(),
  rate: z.coerce.number().optional(),
});

export const Route = createFileRoute("/payments")({
  validateSearch: (s) => searchSchema.parse(s),
  head: () => ({
    meta: [
      { title: "Choose Your Learning Plan — Pushpa Online Tuition" },
      {
        name: "description",
        content:
          "Pick the plan that fits your curriculum and pay securely with UPI, cards, QR, net banking or international methods.",
      },
      { property: "og:title", content: "Choose Your Learning Plan — Pushpa Online Tuition" },
      {
        property: "og:description",
        content: "Flexible monthly, 3, 6 and 12-month plans for Years 2 through A-Level.",
      },
      { property: "og:url", content: "/payments" },
    ],
    links: [{ rel: "canonical", href: "/payments" }],
  }),
  component: PaymentsPage,
});

type LevelKey = "y28" | "y9g" | "asa";
type DurationKey = "monthly" | "3m" | "6m" | "yearly";

const PLANS: Record<
  LevelKey,
  {
    id: LevelKey;
    title: string;
    price: string;
    hourly: number; // headline hourly used for checkout when clicking Select Plan
    accent: string;
    ribbon?: string;
    features: string[];
    gradient: string;
    prices: Record<DurationKey, number>;
  }
> = {
  y28: {
    id: "y28",
    title: "Years 2 – 8",
    price: "£12 – £15 / Hour",
    hourly: 12,
    accent: "#2563EB",
    features: [
      "3 Classes per Week",
      "12 Classes + 2 Monthly Tests",
      "Free Worksheets",
      "Regular Progress Reports",
      "Experienced UK Tutors",
    ],
    gradient: "from-[#0F172A] to-[#1E3A8A]",
    prices: { monthly: 144, "3m": 432, "6m": 864, yearly: 1728 },
  },
  y9g: {
    id: "y9g",
    title: "Years 9 – GCSE",
    price: "£15 – £20 / Hour",
    hourly: 15,
    accent: "#7C3AED",
    ribbon: "Most Popular",
    features: [
      "3 Classes per Week",
      "12 Classes + 2 Monthly Tests",
      "Free Worksheets",
      "Progress Tracking",
      "Experienced UK Tutors",
    ],
    gradient: "from-[#7C3AED] to-[#A855F7]",
    prices: { monthly: 180, "3m": 540, "6m": 1080, yearly: 2160 },
  },
  asa: {
    id: "asa",
    title: "AS & A Level",
    price: "£25 – £30 / Hour",
    hourly: 25,
    accent: "#059669",
    features: [
      "3 Classes per Week",
      "12 Classes + 2 Monthly Tests",
      "Free Worksheets",
      "Progress Reports",
      "Expert Tutors",
    ],
    gradient: "from-[#059669] to-[#10B981]",
    prices: { monthly: 300, "3m": 900, "6m": 1800, yearly: 3600 },
  },
};

const DURATION_LABELS: Record<DurationKey, { label: string; short: string; discount: number }> = {
  monthly: { label: "Monthly Plan", short: "1 Month", discount: 0 },
  "3m": { label: "3 Months Plan", short: "3 Months", discount: 5 },
  "6m": { label: "6 Months Plan", short: "6 Months", discount: 10 },
  yearly: { label: "Yearly Plan", short: "12 Months", discount: 15 },
};

function PaymentsPage() {
  const { level, duration, rate } = Route.useSearch();
  const showCheckout = Boolean(level && duration);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Hero showCheckout={showCheckout} />
      {showCheckout ? (
        <CheckoutView level={level as LevelKey} duration={duration as DurationKey} rate={rate} />
      ) : (
        <PlansView />
      )}
    </div>
  );
}

function Hero({ showCheckout }: { showCheckout: boolean }) {
  return (
    <section
      className="relative overflow-hidden py-14 md:py-20 text-white"
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
          <Sparkles className="size-4" />
          <span className="uppercase tracking-wider">
            {showCheckout ? "Secure Checkout" : "Flexible Learning Plans"}
          </span>
        </div>
        <h1 className="mt-5 text-3xl md:text-5xl font-bold leading-tight">
          {showCheckout ? "Complete Your Payment" : "Choose Your Learning Plan"}
        </h1>
        <p className="mt-4 mx-auto max-w-2xl text-lg text-white/85">
          {showCheckout
            ? "Review your plan details and pay securely using your preferred method."
            : "Select the plan that best matches your curriculum and proceed securely to payment."}
        </p>
      </div>
    </section>
  );
}

/* ============================ PLAN SELECTION ============================ */

function PlansView() {
  const navigate = useNavigate({ from: "/payments" });

  return (
    <>
      {/* Plan cards */}
      <section className="container-page pt-14 md:pt-20">
        <div className="grid gap-6 md:grid-cols-3">
          {(Object.values(PLANS) as (typeof PLANS)[LevelKey][]).map((plan) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              onSelect={() =>
                navigate({
                  search: { level: plan.id, duration: "monthly", rate: plan.hourly },
                })
              }
            />
          ))}
        </div>
      </section>

      {/* Flexible plans table */}
      <section className="container-page pt-14 md:pt-20">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#2563EB]/10 text-[#2563EB] px-4 py-1.5 text-xs font-bold uppercase tracking-wider">
            💰 Flexible Plans
          </div>
          <h2 className="mt-4 text-3xl md:text-4xl font-bold text-[#0F172A]">
            Pick a Duration & Save More
          </h2>
          <p className="mt-3 text-slate-600 max-w-2xl mx-auto">
            Every price below is clickable — select one to lock in your plan and continue to
            secure payment.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <FlexibleTable
            onPick={(level, duration) =>
              navigate({ search: { level, duration, rate: PLANS[level].hourly } })
            }
          />
          <DiscountsCard />
        </div>
      </section>

      {/* Trust banner */}
      <section className="container-page py-14 md:py-20">
        <TrustBanner />
      </section>
    </>
  );
}

function PlanCard({
  plan,
  onSelect,
}: {
  plan: (typeof PLANS)[LevelKey];
  onSelect: () => void;
}) {
  const featured = Boolean(plan.ribbon);
  return (
    <div
      className={`relative rounded-3xl bg-white shadow-xl border ${
        featured ? "border-transparent ring-2 ring-[#7C3AED]" : "border-slate-100"
      } overflow-hidden flex flex-col`}
    >
      {plan.ribbon && (
        <div className="absolute top-4 right-4 z-10 rounded-full bg-[#F59E0B] px-3 py-1 text-[11px] font-bold text-[#0F172A] shadow-md">
          {plan.ribbon}
        </div>
      )}
      <div className={`px-6 py-6 bg-gradient-to-r ${plan.gradient} text-white`}>
        <h3 className="text-lg font-bold">{plan.title}</h3>
        <p className="mt-1 text-3xl font-extrabold tracking-tight">{plan.price}</p>
        <p className="mt-1 text-xs text-white/80">Based on 12 classes per month</p>
      </div>
      <ul className="flex-1 p-6 space-y-3">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-3 text-sm">
            <span className="mt-0.5 grid place-items-center size-5 rounded-full bg-emerald-100 text-emerald-700 shrink-0">
              <Check className="size-3.5" />
            </span>
            <span className="text-slate-700">{f}</span>
          </li>
        ))}
      </ul>
      <div className="p-6 pt-0">
        <button
          onClick={onSelect}
          className="w-full inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold text-white shadow-lg transition-transform hover:scale-[1.02]"
          style={{ background: `linear-gradient(135deg, ${plan.accent} 0%, #0F172A 140%)` }}
        >
          Select Plan
        </button>
      </div>
    </div>
  );
}

function FlexibleTable({
  onPick,
}: {
  onPick: (level: LevelKey, duration: DurationKey) => void;
}) {
  const durations: DurationKey[] = ["monthly", "3m", "6m", "yearly"];
  return (
    <div className="lg:col-span-2 rounded-3xl bg-white shadow-xl border border-slate-100 overflow-hidden">
      <div className="bg-gradient-to-r from-[#0F172A] to-[#1E3A8A] px-6 py-4">
        <h3 className="text-white font-bold text-lg">Flexible Plans</h3>
        <p className="text-white/70 text-xs mt-1">All prices in GBP (£) · Click any price to continue</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="text-left font-semibold px-4 py-3">Level</th>
              {durations.map((d) => (
                <th key={d} className="text-right font-semibold px-4 py-3">
                  {DURATION_LABELS[d].label}
                  {DURATION_LABELS[d].discount > 0 && (
                    <span className="ml-1 text-[10px] font-bold text-emerald-600">
                      −{DURATION_LABELS[d].discount}%
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {(Object.values(PLANS) as (typeof PLANS)[LevelKey][]).map((plan) => (
              <tr key={plan.id} className="border-t border-slate-100 hover:bg-slate-50/70 transition">
                <td className="px-4 py-3 font-semibold text-[#0F172A]">{plan.title}</td>
                {durations.map((d) => (
                  <td key={d} className="px-4 py-3 text-right">
                    <button
                      onClick={() => onPick(plan.id, d)}
                      className="inline-flex items-center gap-1 rounded-lg px-3 py-1.5 font-bold text-[#2563EB] hover:bg-[#2563EB]/10 hover:scale-105 transition"
                    >
                      £{plan.prices[d].toLocaleString()}
                    </button>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function DiscountsCard() {
  const rows = [
    { plan: "Monthly", discount: "No discount", tone: "muted" as const },
    { plan: "3 Months", discount: "5% Off", tone: "good" as const },
    { plan: "6 Months", discount: "10% Off", tone: "good" as const },
    { plan: "Yearly", discount: "15% Off", tone: "good" as const },
  ];
  return (
    <div className="rounded-3xl bg-white shadow-xl border border-slate-100 overflow-hidden">
      <div className="bg-gradient-to-r from-[#F59E0B] to-[#FBBF24] px-6 py-4">
        <h3 className="text-[#0F172A] font-bold text-lg">🎉 Longer Plan Discounts</h3>
        <p className="text-[#0F172A]/70 text-xs mt-1">Save more when you commit longer</p>
      </div>
      <ul className="p-4 divide-y divide-slate-100">
        {rows.map((d) => (
          <li key={d.plan} className="flex items-center justify-between py-3 px-2">
            <span className="font-semibold text-[#0F172A]">{d.plan}</span>
            <span
              className={`text-sm font-bold px-3 py-1 rounded-full ${
                d.tone === "muted"
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
  );
}

function TrustBanner() {
  const badges = [
    { icon: BadgeCheck, text: "100% Secure Payment" },
    { icon: Lock, text: "SSL Encrypted" },
    { icon: Zap, text: "Instant Confirmation" },
    { icon: ShieldCheck, text: "Safe Transactions" },
  ];
  return (
    <div
      className="rounded-2xl p-5 md:p-6 flex flex-wrap items-center justify-center gap-4 md:gap-6 shadow-lg"
      style={{ background: "linear-gradient(90deg, #EC4899 0%, #F59E0B 50%, #10B981 100%)" }}
    >
      {badges.map((b) => (
        <div
          key={b.text}
          className="flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-sm font-bold text-[#0F172A] shadow-sm"
        >
          <b.icon className="size-4 text-emerald-600" />
          <span>{b.text}</span>
        </div>
      ))}
    </div>
  );
}

/* ============================ CHECKOUT VIEW ============================ */

function CheckoutView({
  level,
  duration,
  rate,
}: {
  level: LevelKey;
  duration: DurationKey;
  rate?: number;
}) {
  const plan = PLANS[level];
  const dur = DURATION_LABELS[duration];
  const subtotal = plan.prices[duration];
  const discount = Math.round((subtotal * dur.discount) / 100);
  const total = subtotal - discount;
  const hourly = rate ?? plan.hourly;

  const [paid, setPaid] = useState(false);
  const [method, setMethod] = useState<string>("upi");

  const methods = useMemo(
    () => [
      { id: "gpay", name: "Google Pay", icon: Smartphone, color: "#4285F4" },
      { id: "upi", name: "UPI", icon: Smartphone, color: "#1E3A8A" },
      { id: "qr", name: "QR Code", icon: QrCode, color: "#0F172A" },
      { id: "debit", name: "Debit Card", icon: CreditCard, color: "#2563EB" },
      { id: "credit", name: "Credit Card", icon: CreditCard, color: "#7C3AED" },
      { id: "netbank", name: "Net Banking", icon: Landmark, color: "#059669" },
      { id: "intl", name: "International", icon: Globe, color: "#EC4899" },
      { id: "paypal", name: "PayPal", icon: Globe, color: "#003087" },
      { id: "stripe", name: "Stripe", icon: CreditCard, color: "#635BFF" },
    ],
    [],
  );

  return (
    <section className="container-page py-14 md:py-16">
      <Link
        to="/payments"
        search={{}}
        className="inline-flex items-center gap-2 text-sm font-semibold text-[#2563EB] hover:underline"
      >
        <ArrowLeft className="size-4" /> Back to plans
      </Link>

      {paid ? (
        <PaymentSuccess plan={plan} duration={duration} total={total} />
      ) : (
        <div className="mt-6 grid lg:grid-cols-5 gap-8">
          {/* Summary */}
          <div className="lg:col-span-2">
            <div className="rounded-3xl bg-white shadow-xl border border-slate-100 overflow-hidden sticky top-24">
              <div className={`px-6 py-5 bg-gradient-to-r ${plan.gradient} text-white`}>
                <p className="text-xs uppercase tracking-wider text-white/70">Selected Plan</p>
                <h2 className="mt-1 text-2xl font-bold">{plan.title}</h2>
                <p className="mt-1 text-sm text-white/85">
                  {dur.short} · £{hourly}/hour
                </p>
              </div>
              <div className="p-6 space-y-3 text-sm">
                <Row label="Curriculum" value={plan.title} />
                <Row label="Duration" value={dur.label} />
                <Row label="Hourly Rate" value={`£${hourly}`} />
                <Row label="Subtotal" value={`£${subtotal.toLocaleString()}`} />
                <Row
                  label={`Discount (${dur.discount}%)`}
                  value={`− £${discount.toLocaleString()}`}
                  valueClass="text-emerald-600 font-bold"
                />
                <div className="mt-3 border-t border-dashed border-slate-200 pt-3 flex items-center justify-between">
                  <span className="text-base font-bold text-[#0F172A]">Total</span>
                  <span className="text-2xl font-extrabold text-[#0F172A]">
                    £{total.toLocaleString()}
                  </span>
                </div>
              </div>
              <div className="px-6 pb-6">
                <div className="rounded-xl bg-slate-50 p-3 text-[11px] text-slate-500 leading-relaxed">
                  All payments are processed securely. A receipt will be sent to your email
                  automatically after successful payment.
                </div>
              </div>
            </div>
          </div>

          {/* Methods + QR */}
          <div className="lg:col-span-3 space-y-8">
            <div>
              <h3 className="text-xl font-bold text-[#0F172A]">Select a payment method</h3>
              <p className="text-sm text-slate-600 mt-1">
                Choose your preferred method to complete the payment.
              </p>
              <div className="mt-4 grid sm:grid-cols-3 gap-3">
                {methods.map((m) => {
                  const active = method === m.id;
                  return (
                    <button
                      key={m.id}
                      onClick={() => setMethod(m.id)}
                      className={`group rounded-2xl border-2 bg-white p-4 text-left transition shadow-sm hover:shadow-md ${
                        active ? "border-[#2563EB] ring-2 ring-[#2563EB]/20" : "border-slate-100"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className="grid place-items-center size-10 rounded-xl text-white shadow-md"
                          style={{ backgroundColor: m.color }}
                        >
                          <m.icon className="size-5" />
                        </span>
                        <div>
                          <p className="font-bold text-sm text-[#0F172A]">{m.name}</p>
                          <p className="text-[11px] text-slate-500">
                            {active ? "Selected" : "Tap to choose"}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {(method === "qr" || method === "upi" || method === "gpay") && (
              <div className="rounded-3xl bg-white border-[3px] border-[#2563EB] shadow-xl p-6 md:p-8 flex flex-col md:flex-row gap-6 items-center">
                <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100">
                  <QrPlaceholder />
                </div>
                <div className="text-center md:text-left">
                  <h4 className="text-lg font-bold text-[#0F172A]">Scan to Pay</h4>
                  <p className="mt-1 text-sm font-semibold text-[#2563EB]">Fast • Safe • Secure</p>
                  <p className="mt-3 text-sm text-slate-600 max-w-sm">
                    Open Google Pay, PhonePe, Paytm or any UPI app and scan the code to pay{" "}
                    <strong>£{total.toLocaleString()}</strong>.
                  </p>
                </div>
              </div>
            )}

            <button
              onClick={() => setPaid(true)}
              className="w-full inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-4 text-base font-bold text-white shadow-xl transition-transform hover:scale-[1.01]"
              style={{ background: "linear-gradient(135deg, #2563EB 0%, #1E40AF 100%)" }}
            >
              <Lock className="size-4" /> Pay £{total.toLocaleString()} Securely
            </button>

            <TrustBanner />

            {/* Help */}
            <div className="rounded-2xl bg-gradient-to-br from-[#0F172A] to-[#1E3A8A] p-6 text-white shadow-xl grid sm:grid-cols-2 gap-4">
              <div>
                <h4 className="font-bold text-lg">Need help paying?</h4>
                <p className="mt-1 text-sm text-white/75">
                  Our team will guide you through the payment.
                </p>
              </div>
              <div className="space-y-2 text-sm sm:text-right">
                <a
                  href="tel:+918939577588"
                  className="flex items-center gap-2 sm:justify-end hover:text-[#F59E0B]"
                >
                  <Phone className="size-4" /> +91 8939 577 588
                </a>
                <a
                  href="mailto:support@pushpaedu.com"
                  className="flex items-center gap-2 sm:justify-end hover:text-[#F59E0B]"
                >
                  <Mail className="size-4" /> support@pushpaedu.com
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function Row({
  label,
  value,
  valueClass = "",
}: {
  label: string;
  value: string;
  valueClass?: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-slate-500">{label}</span>
      <span className={`text-[#0F172A] font-semibold ${valueClass}`}>{value}</span>
    </div>
  );
}

function PaymentSuccess({
  plan,
  duration,
  total,
}: {
  plan: (typeof PLANS)[LevelKey];
  duration: DurationKey;
  total: number;
}) {
  const navigate = useNavigate();
  const receiptId = useMemo(
    () => `PE-${Date.now().toString(36).toUpperCase()}`,
    [],
  );
  return (
    <div className="mt-8 rounded-3xl bg-white shadow-2xl border border-emerald-100 overflow-hidden max-w-2xl mx-auto">
      <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 px-6 py-8 text-white text-center">
        <div className="mx-auto grid place-items-center size-16 rounded-full bg-white/20 backdrop-blur">
          <Check className="size-8" />
        </div>
        <h2 className="mt-4 text-2xl font-bold">Payment Successful</h2>
        <p className="mt-1 text-sm text-white/85">Thank you! Your enrollment is confirmed.</p>
      </div>
      <div className="p-6 space-y-3 text-sm">
        <Row label="Receipt ID" value={receiptId} />
        <Row label="Plan" value={plan.title} />
        <Row label="Duration" value={DURATION_LABELS[duration].label} />
        <Row
          label="Amount Paid"
          value={`£${total.toLocaleString()}`}
          valueClass="text-emerald-600 font-bold text-base"
        />
        <p className="text-xs text-slate-500 pt-2">
          A receipt has been sent to your registered email. Our team will contact you shortly with
          your class schedule.
        </p>
      </div>
      <div className="p-6 pt-0 flex flex-col sm:flex-row gap-3">
        <button
          onClick={() =>
            navigate({
              to: "/schedule",
              search: {
                type: "paid",
                plan_name: plan.title,
                plan_duration: DURATION_LABELS[duration].label,
                plan_amount: total,
              },
            })
          }
          className="flex-1 inline-flex items-center justify-center rounded-xl bg-[#10B981] px-5 py-3 text-sm font-bold text-white"
        >
          Schedule Your First Class →
        </button>
        <Link
          to="/contact"
          className="flex-1 inline-flex items-center justify-center rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-[#0F172A] hover:bg-slate-50"
        >
          Contact Support
        </Link>
      </div>
    </div>
  );
}

/* ============================ QR SVG ============================ */

function QrPlaceholder() {
  return (
    <div className="w-40 h-40 md:w-48 md:h-48 relative">
      <svg viewBox="0 0 100 100" className="w-full h-full text-[#0F172A]" fill="currentColor">
        <rect x="5" y="5" width="25" height="25" fill="none" stroke="currentColor" strokeWidth="6" />
        <rect x="12" y="12" width="11" height="11" fill="currentColor" />
        <rect x="70" y="5" width="25" height="25" fill="none" stroke="currentColor" strokeWidth="6" />
        <rect x="77" y="12" width="11" height="11" fill="currentColor" />
        <rect x="5" y="70" width="25" height="25" fill="none" stroke="currentColor" strokeWidth="6" />
        <rect x="12" y="77" width="11" height="11" fill="currentColor" />
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