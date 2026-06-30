import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle2,
  Users,
  CalendarClock,
  Sparkles,
  ClipboardCheck,
  Globe2,
  GraduationCap,
  Star,
  BookOpen,
  Beaker,
  Calculator,
  Languages,
} from "lucide-react";
import heroImg from "@/assets/hero-students.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pushpa Online Tuition — International Tutors for UK, IGCSE, A-Level" },
      { name: "description", content: "Live one-to-one and small-group online tuition for Year 2 to A-Level. UK, Cambridge IGCSE & A-Level, UAE, Switzerland and German international curricula." },
      { property: "og:title", content: "Pushpa Online Tuition — Teach. Learn. Achieve." },
      { property: "og:description", content: "Personalised online tutoring for students worldwide across the leading international curricula." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

const bullets = [
  "Expert International Tutors",
  "Live Interactive Classes",
  "One-to-One & Small Group Sessions",
  "Flexible Scheduling",
  "Proven Academic Results",
];

const whyUs = [
  { icon: GraduationCap, title: "Experienced International Tutors", body: "Qualified educators with deep expertise in international curricula." },
  { icon: Sparkles, title: "Personalised Learning", body: "Lesson plans designed around each student's pace and goals." },
  { icon: CalendarClock, title: "Flexible Schedule", body: "Pick timings that work for your family across time zones." },
  { icon: Users, title: "Interactive Live Classes", body: "Engaging sessions with modern teaching tools and digital resources." },
  { icon: ClipboardCheck, title: "Regular Assessments", body: "Track progress with tests, assignments and performance reports." },
  { icon: Globe2, title: "Global Learning Community", body: "Connect with educators and students from around the world." },
];

const curriculums = [
  { flag: "🇬🇧", name: "UK National Curriculum", note: "Key Stages 1–5" },
  { flag: "🇬🇧", name: "Cambridge International", note: "IGCSE & A-Level" },
  { flag: "🇦🇪", name: "UAE Curriculum", note: "International schools" },
  { flag: "🇨🇭", name: "Switzerland Int. Schools", note: "School-aligned tutoring" },
  { flag: "🇩🇪", name: "Germany Int. Schools", note: "International standards" },
];

const steps = [
  { n: "01", title: "Free Consultation", body: "Discuss your learning goals and academic requirements." },
  { n: "02", title: "Tutor Matching", body: "We assign the most suitable tutor for the student's needs." },
  { n: "03", title: "Trial Class", body: "Attend a free demo and experience our teaching approach." },
  { n: "04", title: "Start Learning", body: "Join regular live classes and track academic progress." },
  { n: "05", title: "Achieve Results", body: "Improve confidence, grades and subject understanding." },
];

const subjectIcons = [
  { icon: Calculator, label: "Mathematics" },
  { icon: Beaker, label: "Sciences" },
  { icon: Languages, label: "English" },
  { icon: BookOpen, label: "Humanities" },
];

const testimonials = [
  { quote: "Pushpa Online Tuition helped me improve my Mathematics grades significantly. The tutors are highly supportive and knowledgeable.", name: "Sarah", place: "UAE" },
  { quote: "The personalised lessons and regular feedback helped me achieve excellent IGCSE results.", name: "Ahmed", place: "Dubai" },
  { quote: "My confidence in Physics and Chemistry improved tremendously after joining Pushpa Online Tuition.", name: "David", place: "UK" },
];

function Index() {
  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_80%_0%,oklch(0.94_0.06_45/.6),transparent),radial-gradient(50%_50%_at_0%_30%,oklch(0.9_0.05_195/.5),transparent)]" />
        <div className="container-page pt-14 pb-20 md:pt-20 md:pb-28 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-3 py-1 text-xs font-medium text-muted-foreground">
              <span className="size-1.5 rounded-full bg-accent" /> International Online Tuition
            </span>
            <h1 className="mt-5 font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.05] tracking-tight text-foreground">
              Teach. Learn. <span className="text-accent italic">Achieve.</span>
            </h1>
            <p className="mt-5 text-lg text-muted-foreground max-w-xl">
              Personalised online tutoring for Year 2 to A-Level students following the UK,
              Cambridge (IGCSE &amp; A-Level), UAE, Switzerland and German international curricula.
            </p>
            <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4">
              {bullets.map((b) => (
                <li key={b} className="flex items-center gap-2 text-sm text-foreground">
                  <CheckCircle2 className="size-4 text-primary" /> {b}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm hover:opacity-90 transition">
                Book a Free Trial Class <ArrowRight className="size-4" />
              </Link>
              <Link to="/tutors" className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-3 text-sm font-semibold text-foreground hover:bg-secondary transition">
                Become a Tutor
              </Link>
            </div>
            <div className="mt-8 flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-1 text-accent">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="size-4 fill-current" />)}
              </div>
              <span>Trusted by families in UK, UAE, Switzerland & Germany</span>
            </div>
          </div>
          <div className="lg:col-span-6">
            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-primary/20 to-accent/20 blur-2xl" />
              <img
                src={heroImg}
                width={1600}
                height={1200}
                alt="International students learning online together"
                className="relative rounded-3xl border border-border shadow-xl object-cover w-full h-[420px] lg:h-[520px]"
              />
              <div className="absolute -bottom-6 -left-6 hidden sm:block rounded-2xl border border-border bg-card p-4 shadow-lg w-64">
                <p className="text-xs text-muted-foreground">Average improvement</p>
                <p className="font-serif text-2xl text-foreground">+1.8 grades</p>
                <p className="text-xs text-muted-foreground mt-1">after one term of weekly classes</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SUBJECTS STRIP */}
      <section className="border-y border-border bg-secondary/40">
        <div className="container-page py-6 flex flex-wrap items-center justify-between gap-6">
          <p className="text-sm font-medium text-muted-foreground">We tutor across all core subjects</p>
          <div className="flex flex-wrap gap-6">
            {subjectIcons.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-sm text-foreground">
                <Icon className="size-4 text-primary" /> {label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="container-page py-20">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">Why choose us</p>
          <h2 className="mt-2 font-serif text-3xl md:text-4xl font-semibold">A learning experience built around your child.</h2>
          <p className="mt-3 text-muted-foreground">Six reasons families across the world trust Pushpa Online Tuition.</p>
        </div>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {whyUs.map(({ icon: Icon, title, body }) => (
            <div key={title} className="rounded-2xl border border-border bg-card p-6 hover:shadow-md transition-shadow">
              <div className="grid place-items-center size-11 rounded-xl bg-primary/10 text-primary">
                <Icon className="size-5" />
              </div>
              <h3 className="mt-4 font-serif text-lg font-semibold">{title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CURRICULUMS */}
      <section className="bg-secondary/40 border-y border-border">
        <div className="container-page py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-wider text-accent">Curriculums we cover</p>
              <h2 className="mt-2 font-serif text-3xl md:text-4xl font-semibold">Aligned with leading international boards.</h2>
            </div>
            <Link to="/curriculums" className="text-sm font-semibold text-primary hover:underline inline-flex items-center gap-1">See all <ArrowRight className="size-4" /></Link>
          </div>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {curriculums.map((c) => (
              <div key={c.name} className="rounded-2xl border border-border bg-card p-5">
                <div className="text-3xl">{c.flag}</div>
                <h3 className="mt-3 font-serif text-base font-semibold">{c.name}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{c.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="container-page py-20">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">How it works</p>
          <h2 className="mt-2 font-serif text-3xl md:text-4xl font-semibold">From first call to better grades — in five steps.</h2>
        </div>
        <ol className="mt-10 grid md:grid-cols-2 lg:grid-cols-5 gap-5">
          {steps.map((s) => (
            <li key={s.n} className="rounded-2xl border border-border bg-card p-6">
              <div className="font-serif text-3xl text-accent">{s.n}</div>
              <h3 className="mt-2 font-serif text-lg font-semibold">{s.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{s.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* FOR STUDENTS / PARENTS */}
      <section className="bg-secondary/40 border-y border-border">
        <div className="container-page py-20 grid md:grid-cols-2 gap-8">
          {[
            { title: "For Students", items: ["Better academic performance", "Increased confidence", "Personalised attention", "Improved study habits", "Exam preparation support", "Homework & assignment help"] },
            { title: "For Parents", items: ["Regular progress reports", "Transparent communication", "Flexible class schedules", "Safe online learning environment", "Dedicated academic support"] },
          ].map((col) => (
            <div key={col.title} className="rounded-3xl border border-border bg-card p-8">
              <h3 className="font-serif text-2xl font-semibold">{col.title}</h3>
              <ul className="mt-5 space-y-3">
                {col.items.map((i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                    <CheckCircle2 className="size-4 text-primary mt-0.5" /> {i}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="container-page py-20">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">Testimonials</p>
          <h2 className="mt-2 font-serif text-3xl md:text-4xl font-semibold">What our students say.</h2>
        </div>
        <div className="mt-10 grid md:grid-cols-3 gap-5">
          {testimonials.map((t) => (
            <figure key={t.name} className="rounded-2xl border border-border bg-card p-6 flex flex-col">
              <div className="flex items-center gap-0.5 text-accent">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="size-4 fill-current" />)}
              </div>
              <blockquote className="mt-4 text-foreground leading-relaxed">“{t.quote}”</blockquote>
              <figcaption className="mt-6 text-sm text-muted-foreground">— {t.name}, {t.place}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container-page pb-20">
        <div className="relative overflow-hidden rounded-3xl bg-primary text-primary-foreground p-10 md:p-14">
          <div className="absolute inset-0 -z-0 opacity-20 bg-[radial-gradient(60%_80%_at_90%_10%,oklch(0.8_0.14_45),transparent)]" />
          <div className="relative grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl font-semibold">Ready to begin?</h2>
              <p className="mt-3 text-primary-foreground/80 max-w-md">Book your free trial class today and start your learning journey with us. 🚀</p>
            </div>
            <div className="flex md:justify-end gap-3 flex-wrap">
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground hover:opacity-90 transition">
                Book Free Trial <ArrowRight className="size-4" />
              </Link>
              <Link to="/courses" className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/30 px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary-foreground/10 transition">
                Explore Courses
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
