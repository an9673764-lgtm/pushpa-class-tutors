import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, ArrowRight } from "lucide-react";
import tutorImg from "@/assets/tutor-teaching.jpg";

export const Route = createFileRoute("/tutors")({
  head: () => ({
    meta: [
      { title: "Become a Tutor — Pushpa Online Tuition" },
      { name: "description", content: "Join our global teaching team. Teach international students online from home with flexible hours and competitive earnings." },
      { property: "og:title", content: "Become an Online Tutor" },
      { property: "og:description", content: "Hiring online tutors for Maths, Sciences, English, Computer Science, Business and Economics." },
      { property: "og:url", content: "/tutors" },
    ],
    links: [{ rel: "canonical", href: "/tutors" }],
  }),
  component: TutorsPage,
});

const requirements = ["Bachelor's Degree or Higher", "Strong English Communication Skills", "Experience Teaching International Curricula", "Online Teaching Experience Preferred", "Subject Expertise", "Passion for Student Success"];
const subjects = ["Mathematics", "English", "Science", "Physics", "Chemistry", "Biology", "Computer Science", "Business Studies", "Economics"];
const benefits = ["Flexible Working Hours", "Work From Home", "International Student Exposure", "Competitive Earnings", "Professional Growth Opportunities"];

function TutorsPage() {
  const [submitted, setSubmitted] = useState(false);
  return (
    <div>
      <section className="container-page pt-16 pb-12 md:pt-24 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">We're hiring</p>
          <h1 className="mt-2 font-serif text-4xl md:text-5xl font-semibold">Join our global teaching team.</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-xl">Teach students from around the world from the comfort of your home. Flexible hours, international exposure and competitive earnings.</p>
          <a href="#apply" className="mt-7 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">
            Apply Now <ArrowRight className="size-4" />
          </a>
        </div>
        <img src={tutorImg} alt="Online tutor teaching from a home office" width={1400} height={1050} loading="lazy" className="rounded-3xl border border-border shadow-xl object-cover w-full h-[380px] lg:h-[480px]" />
      </section>

      <section className="container-page py-16 grid md:grid-cols-3 gap-5">
        {[
          { title: "Requirements", items: requirements },
          { title: "Subjects Required", items: subjects },
          { title: "Benefits", items: benefits },
        ].map((col) => (
          <div key={col.title} className="rounded-3xl border border-border bg-card p-7">
            <h2 className="font-serif text-xl font-semibold">{col.title}</h2>
            <ul className="mt-4 space-y-2.5">
              {col.items.map((i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                  <CheckCircle2 className="size-4 text-primary mt-0.5" /> {i}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section id="apply" className="container-page pb-24">
        <div className="rounded-3xl border border-border bg-secondary/40 p-8 md:p-12">
          <h2 className="font-serif text-2xl md:text-3xl font-semibold">Apply now</h2>
          <p className="mt-2 text-muted-foreground">Fill in your details — our team will get back within 3 working days.</p>
          {submitted ? (
            <div className="mt-8 rounded-2xl border border-border bg-card p-6 text-foreground">Thank you! Your application has been received. We'll reach out at the email you provided.</div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="mt-8 grid md:grid-cols-2 gap-4">
              <Field label="Full Name" name="name" required />
              <Field label="Email" name="email" type="email" required />
              <Field label="Phone" name="phone" />
              <Field label="Country" name="country" />
              <Field label="Highest Qualification" name="qualification" />
              <Field label="Subject(s) You Teach" name="subjects" />
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-foreground">Brief about your teaching experience</label>
                <textarea name="experience" rows={4} className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
              </div>
              <div className="md:col-span-2">
                <button type="submit" className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">
                  Submit Application <ArrowRight className="size-4" />
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}

function Field({ label, name, type = "text", required }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label className="block text-sm font-medium text-foreground">{label}{required && <span className="text-accent"> *</span>}</label>
      <input type={type} name={name} required={required} className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
    </div>
  );
}