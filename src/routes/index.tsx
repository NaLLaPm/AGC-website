import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { ArrowRight, ArrowUpRight, Check, ChevronDown, Menu, Plus, Phone, MapPin, Mail, MessageCircle, X } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/sarovar-hero.jpg";
import campusImage from "@/assets/campus-life.jpg";

const APPLY_URL = "https://agcamritsar.in/form/";
const CALL_URL = "tel:+918872009951";
const WHATSAPP_URL = "https://wa.me/918872009950";
const EMAIL = "admission@acetedu.in";

const schools = [
  { name: "Engineering", intro: "Build what comes next.", courses: ["B.Tech Computer Science & Engineering", "B.Tech Mechanical Engineering", "B.Tech Civil Engineering", "M.Tech Computer Science & Engineering"], link: "https://agcamritsar.in/explore-programs.php" },
  { name: "Management", intro: "Lead with perspective.", courses: ["Bachelor of Business Administration", "B.Com (Honours)", "Master of Business Administration", "M.Com"], link: "https://agcamritsar.in/explore-programs.php" },
  { name: "Computing", intro: "Turn curiosity into capability.", courses: ["Bachelor of Computer Applications", "Master of Computer Applications"], link: "https://agcamritsar.in/explore-programs.php" },
  { name: "Pharmacy", intro: "Make a difference in health.", courses: ["Bachelor of Pharmacy", "Diploma in Pharmacy", "Doctor of Pharmacy"], link: "https://agcamritsar.in/explore-programs.php" },
  { name: "More schools", intro: "Find a path that feels like yours.", courses: ["Hotel Management & Tourism", "Allied Health Sciences", "Fashion Design", "Law"], link: "https://agcamritsar.in/explore-programs.php" },
] as const;

const enquirySchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(100),
  email: z.string().trim().email("Please enter a valid email address.").max(255),
  phone: z.string().trim().regex(/^[+\d\s()-]{8,20}$/, "Please enter a valid phone number."),
  interest: z.string().min(1, "Please choose an area of interest."),
  message: z.string().trim().max(500),
});

type EnquiryField = keyof z.infer<typeof enquirySchema>;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Admissions & Programs | Amritsar Group of Colleges" },
      { name: "description", content: "Explore programs and admissions at Amritsar Group of Colleges. Find your course, learn how to apply, and connect with the AGC admissions team." },
      { property: "og:title", content: "Admissions & Programs | Amritsar Group of Colleges" },
      { property: "og:description", content: "Explore programs, admissions and campus life at AGC Amritsar. Start your application today." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "CollegeOrUniversity", name: "Amritsar Group of Colleges", url: "https://agcamritsar.in/", address: { "@type": "PostalAddress", streetAddress: "12 Km Stone, Amritsar-Jalandhar, G.T. Road", addressLocality: "Amritsar", postalCode: "143001", addressRegion: "Punjab", addressCountry: "IN" }, telephone: "+918872009951", email: EMAIL }) }],
  }),
  component: Index,
});

function ApplyLink({ children = "Apply now", className = "", variant = "gold" }: { children?: React.ReactNode; className?: string; variant?: "gold" | "default" }) {
  return <Button asChild variant={variant} className={className}><a href={APPLY_URL} target="_blank" rel="noopener noreferrer">{children}<ArrowUpRight aria-hidden="true" /></a></Button>;
}

function Index() {
  const [activeSchool, setActiveSchool] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<EnquiryField, string>>>({});
  const [emailOpened, setEmailOpened] = useState(false);
  const selected = schools[activeSchool] ?? schools[0];

  function handleEnquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const parsed = enquirySchema.safeParse({
      name: data.get("name"), email: data.get("email"), phone: data.get("phone"),
      interest: data.get("interest"), message: data.get("message"),
    });
    if (!parsed.success) {
      const next: Partial<Record<EnquiryField, string>> = {};
      for (const issue of parsed.error.issues) {
        const field = issue.path[0] as EnquiryField;
        if (!next[field]) next[field] = issue.message;
      }
      setErrors(next);
      setEmailOpened(false);
      return;
    }
    setErrors({});
    const { name, email, phone, interest, message } = parsed.data;
    const subject = encodeURIComponent(`AGC admissions enquiry — ${interest}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nArea of interest: ${interest}\n\n${message || "Please contact me about admissions."}`);
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    setEmailOpened(true);
  }

  return <div className="min-h-screen overflow-x-hidden bg-background pb-16 text-foreground md:pb-0">
    <header className="sticky top-0 z-40 border-b border-primary-foreground/10 bg-deep text-primary-foreground">
      <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between gap-4 px-5 md:px-10 lg:px-16">
        <a href="#top" aria-label="AGC Amritsar home" className="flex min-w-0 items-center gap-3">
          <span className="font-display flex h-10 w-10 shrink-0 items-center justify-center border border-gold font-bold text-gold">A</span>
          <span className="flex flex-col leading-tight"><strong className="font-display text-lg font-bold">AGC<span className="text-gold">.</span></strong><span className="text-[9px] font-semibold uppercase tracking-[.16em] text-primary-foreground/70">Amritsar Group of Colleges</span></span>
        </a>
        <nav aria-label="Main navigation" className="hidden items-center gap-8 text-sm font-medium lg:flex">
          <a className="transition-colors hover:text-gold" href="#programs">Programs</a><a className="transition-colors hover:text-gold" href="#admissions">Admissions</a><a className="transition-colors hover:text-gold" href="#campus">Campus life</a><a className="transition-colors hover:text-gold" href="#enquire">Contact</a>
        </nav>
        <div className="flex items-center gap-3"><ApplyLink className="hidden h-10 px-5 sm:inline-flex" /><Button aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} variant="light" size="icon" className="lg:hidden" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</Button></div>
      </div>
      {menuOpen && <nav aria-label="Mobile navigation" className="flex flex-col border-t border-primary-foreground/15 bg-deep px-5 py-3 lg:hidden">{[["Programs", "#programs"], ["Admissions", "#admissions"], ["Campus life", "#campus"], ["Contact", "#enquire"]].map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)} className="border-b border-primary-foreground/10 py-3 text-sm">{label}</a>)}</nav>}
    </header>

    <main id="top">
      <section className="hero-scene flex min-h-[610px] items-center text-primary-foreground md:min-h-[680px] lg:min-h-[720px]" aria-labelledby="hero-heading">
        <img src={heroImage} width={1600} height={1008} alt="Illustrative architectural reflecting pool, not a photograph of AGC" className="hero-photo" fetchPriority="high" />
        <div className="hero-ripple" aria-hidden="true" />
        <div className="mx-auto w-full max-w-[1440px] px-5 pb-12 pt-12 md:px-10 md:pb-24 md:pt-24 lg:px-16">
          <div className="max-w-4xl">
            <span className="inline-flex items-center gap-2 border border-primary-foreground/40 px-3 py-2 text-[10px] font-semibold uppercase tracking-[.15em] sm:text-xs"><span className="h-1.5 w-1.5 rounded-full bg-magenta" />Admissions 2026 · Amritsar, Punjab</span>
            <div className="hero-title mt-6 md:mt-10">
              <h1 id="hero-heading" className="font-display max-w-[850px] text-[clamp(3.5rem,7vw,7.5rem)] font-semibold leading-[.98]">A future worth <span className="text-gold">reflecting</span> on.</h1>
              <span className="hero-reflection font-display mt-1 text-[clamp(3.5rem,7vw,7.5rem)] font-semibold text-gold" aria-hidden="true">reflecting</span>
            </div>
            <p className="relative z-10 mt-0 max-w-xl text-base leading-relaxed text-primary-foreground/90 md:mt-2 md:text-lg">Explore your possibilities at Amritsar Group of Colleges. The next chapter starts with one decision.</p>
            <div className="relative z-10 mt-6 flex flex-wrap gap-3 md:mt-8"><ApplyLink className="h-12 px-7 text-sm" /><Button asChild variant="light" className="h-12 px-6"><a href={CALL_URL}><Phone /> Call admissions</a></Button></div>
          </div>
        </div>
        <p className="absolute bottom-5 right-5 z-10 text-[10px] text-primary-foreground/70 md:right-10">Concept image · not AGC campus photography</p>
      </section>

      <section className="border-b border-border bg-card" aria-label="Recruiters featured by AGC"><div className="mx-auto flex max-w-[1440px] flex-col gap-7 px-5 py-8 md:flex-row md:items-center md:gap-10 md:px-10 lg:px-16"><p className="eyebrow max-w-[170px] shrink-0 leading-relaxed text-muted-foreground">Recruiters featured by AGC</p><div className="flex flex-wrap items-center gap-x-8 gap-y-4 font-display text-xl font-bold text-foreground/70 md:justify-between md:gap-x-5 md:text-2xl"><span>Amazon</span><span>Wipro</span><span>Dell</span><span>Nagarro</span><span>TCS</span></div></div></section>

      <section id="programs" className="scroll-mt-20 bg-background px-5 py-20 md:px-10 md:py-28 lg:px-16"><div className="mx-auto max-w-[1312px]">
        <div className="grid gap-5 md:grid-cols-[1fr_1fr] md:items-end"><div><p className="eyebrow text-magenta">01 / Find your direction</p><h2 className="font-display mt-4 max-w-2xl text-4xl font-semibold leading-[1.05] md:text-6xl">There’s more than one way to make an impact.</h2></div><p className="max-w-md text-base leading-relaxed text-muted-foreground md:justify-self-end">From engineering to healthcare, explore a range of courses designed for different ambitions.</p></div>
        <div className="mt-12 border-y border-border"><div role="tablist" aria-label="Program areas" className="flex gap-7 overflow-x-auto border-b border-border py-1 scrollbar-none">{schools.map((school, index) => <Button key={school.name} role="tab" aria-selected={activeSchool === index} aria-controls="program-panel" id={`school-tab-${index}`} variant="link" onClick={() => setActiveSchool(index)} className={`relative h-14 shrink-0 rounded-none px-0 font-semibold no-underline hover:no-underline ${activeSchool === index ? "text-primary after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-full after:bg-gold" : "text-muted-foreground"}`}>{school.name}</Button>)}</div>
          <div id="program-panel" role="tabpanel" aria-labelledby={`school-tab-${activeSchool}`} className="grid min-h-[340px] gap-9 py-10 md:grid-cols-[.8fr_1.2fr] md:py-14"><div><p className="eyebrow text-muted-foreground">Explore / {selected.name}</p><h3 className="font-display mt-5 max-w-sm text-3xl font-semibold md:text-4xl">{selected.intro}</h3><a href={selected.link} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex items-center gap-2 border-b border-primary pb-1 text-sm font-bold">View all programs <ArrowUpRight className="h-4 w-4" /></a></div><ul className="grid content-start gap-0">{selected.courses.map((course, index) => <li key={course} className="flex items-center gap-5 border-b border-border py-4 first:border-t"><span className="text-xs font-semibold text-muted-foreground">0{index + 1}</span><span className="font-display flex-1 text-lg font-semibold md:text-xl">{course}</span><ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground" /></li>)}</ul></div>
        </div>
      </div></section>

      <section id="admissions" className="scroll-mt-20 bg-deep px-5 py-20 text-primary-foreground md:px-10 md:py-28 lg:px-16"><div className="mx-auto max-w-[1312px]"><div className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><p className="eyebrow text-gold">02 / Admissions</p><h2 className="font-display mt-4 max-w-2xl text-4xl font-semibold leading-[1.05] md:text-6xl">Your next step starts here.</h2></div><p className="max-w-sm leading-relaxed text-primary-foreground/70">A simple way to get started. AGC’s admissions team can guide you through course-specific requirements.</p></div>
      <div className="mt-14 grid border-t border-primary-foreground/25 md:grid-cols-4">{[
        ["01", "Explore", "Find a program that matches your interests and goals."],
        ["02", "Check details", "Review eligibility, fees and admission guidance on AGC’s official site."],
        ["03", "Apply online", "Complete AGC’s official online admission form."],
        ["04", "Connect", "Speak with the admissions team about what comes next."],
      ].map(([number, title, copy]) => <div key={number} className="border-b border-primary-foreground/25 py-7 md:border-b-0 md:border-r md:px-7 md:first:pl-0 md:last:border-r-0"><span className="font-display text-5xl text-gold">{number}</span><h3 className="font-display mt-9 text-2xl font-semibold">{title}</h3><p className="mt-3 max-w-[240px] text-sm leading-relaxed text-primary-foreground/70">{copy}</p></div>)}</div>
      <div className="mt-10 flex flex-wrap items-center gap-6"><ApplyLink className="h-12 px-7" /><a href="https://agcamritsar.in/admission-guidelines.php" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border-b border-primary-foreground/70 pb-1 text-sm font-semibold">Read admission guidelines <ArrowUpRight className="h-4 w-4" /></a></div>
      </div></section>

      <section id="campus" className="scroll-mt-20 bg-background"><div className="mx-auto grid max-w-[1440px] lg:grid-cols-2"><div className="px-5 py-20 md:px-10 md:py-24 lg:pl-16 lg:pr-16"><p className="eyebrow text-magenta">03 / Life at AGC</p><h2 className="font-display mt-4 max-w-xl text-4xl font-semibold leading-[1.05] md:text-6xl">Room to learn. Space to grow.</h2><p className="mt-6 max-w-lg leading-relaxed text-muted-foreground">AGC brings academics, community and opportunity together in Amritsar.</p><div className="mt-12 grid grid-cols-2 gap-7 border-t border-border pt-8"><div><strong className="font-display block text-4xl font-semibold">A</strong><span className="mt-2 block text-sm text-muted-foreground">NAAC grade, as published by AGC</span></div><div><strong className="font-display block text-4xl font-semibold">2014</strong><span className="mt-2 block text-sm text-muted-foreground">Autonomous status conferred</span></div><div><strong className="font-display block text-4xl font-semibold">NEST</strong><span className="mt-2 block text-sm text-muted-foreground">AGC entrance scholarship test</span></div><div><strong className="font-display block text-4xl font-semibold">Amritsar</strong><span className="mt-2 block text-sm text-muted-foreground">Punjab, India</span></div></div><a href="https://agcamritsar.in/" target="_blank" rel="noopener noreferrer" className="mt-10 inline-flex items-center gap-2 border-b border-primary pb-1 text-sm font-bold">Visit AGC’s official site <ArrowUpRight className="h-4 w-4" /></a></div><div className="relative min-h-[420px] lg:min-h-full"><img src={campusImage} width={1200} height={912} loading="lazy" className="absolute inset-0 h-full w-full object-cover" alt="Illustrative scene of students walking on a college campus, not AGC students or campus" /><span className="absolute bottom-4 right-4 bg-deep/85 px-3 py-2 text-[10px] text-primary-foreground">Concept image · not AGC campus photography</span></div></div></section>

      <section className="bg-secondary px-5 py-20 md:px-10 md:py-24 lg:px-16"><div className="mx-auto grid max-w-[1312px] gap-10 md:grid-cols-[.8fr_1.2fr]"><div><p className="eyebrow text-magenta">Good to know</p><h2 className="font-display mt-4 text-4xl font-semibold md:text-5xl">Questions, answered.</h2><p className="mt-5 max-w-sm leading-relaxed text-muted-foreground">For course-specific advice, the admissions team is just a call away.</p></div><div className="border-t border-border">{[
        ["How do I apply?", "Start with AGC’s official online admission form. You can also call the admissions team for guidance."],
        ["Are scholarships available?", "AGC runs the National Entrance Scholarship Test (AGC NEST). See the official scholarship and admission guidance for current details."],
        ["Can I stay on campus?", "AGC lists separate boys’ and girls’ hostel facilities. Contact the college for current availability and fees."],
        ["Where can I find fees and eligibility?", "Use the official AGC admissions and program pages for the latest course-specific information."],
      ].map(([question, answer]) => <details key={question} className="faq-item border-b border-border py-5"><summary className="flex items-center justify-between gap-5 font-display text-lg font-semibold"><span>{question}</span><Plus className="h-5 w-5 shrink-0" /></summary><p className="max-w-xl pt-4 pr-8 text-sm leading-relaxed text-muted-foreground">{answer}</p></details>)}<a href="https://agcamritsar.in/admission-guidelines.php" target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex items-center gap-2 border-b border-primary pb-1 text-sm font-bold">More admission details <ArrowUpRight className="h-4 w-4" /></a></div></div></section>

      <section id="enquire" className="scroll-mt-20 bg-background px-5 py-20 md:px-10 md:py-28 lg:px-16"><div className="mx-auto grid max-w-[1312px] gap-12 lg:grid-cols-[.9fr_1.1fr] lg:gap-20"><div><p className="eyebrow text-magenta">04 / Get in touch</p><h2 className="font-display mt-4 max-w-lg text-4xl font-semibold leading-[1.05] md:text-6xl">Your question could change everything.</h2><p className="mt-6 max-w-md leading-relaxed text-muted-foreground">Tell the admissions team what you’d like to know. This draft opens your email app with your details ready to send.</p><div className="mt-12 space-y-6 border-t border-border pt-8 text-sm"><a href={CALL_URL} className="flex items-start gap-4"><Phone className="h-5 w-5 shrink-0 text-magenta" /><span><strong className="block font-semibold">Call admissions</strong><span className="mt-1 block text-muted-foreground">+91 88720 09951</span></span></a><a href={`mailto:${EMAIL}`} className="flex items-start gap-4"><Mail className="h-5 w-5 shrink-0 text-magenta" /><span><strong className="block font-semibold">Email</strong><span className="mt-1 block text-muted-foreground">{EMAIL}</span></span></a><div className="flex items-start gap-4"><MapPin className="h-5 w-5 shrink-0 text-magenta" /><span><strong className="block font-semibold">Visit</strong><span className="mt-1 block text-muted-foreground">12 Km Stone, Amritsar–Jalandhar G.T. Road,<br />Amritsar 143001, Punjab, India</span></span></div></div></div>
      <form noValidate onSubmit={handleEnquiry} className="bg-card p-6 md:p-10"><p className="eyebrow text-muted-foreground">Admissions enquiry</p><h3 className="font-display mt-3 text-2xl font-semibold">Let’s start a conversation.</h3><div className="mt-8 grid gap-5 sm:grid-cols-2"><Field label="Full name" name="name" error={errors.name} /><Field label="Email address" name="email" type="email" error={errors.email} /><Field label="Phone number" name="phone" type="tel" error={errors.phone} /><div><label className="mb-2 block text-sm font-semibold" htmlFor="interest">Area of interest <span className="text-magenta">*</span></label><div className="relative"><select id="interest" name="interest" defaultValue="" className="form-field appearance-none pr-9"><option value="" disabled>Select a program</option>{schools.map(school => <option key={school.name} value={school.name}>{school.name}</option>)}</select><ChevronDown className="pointer-events-none absolute right-3 top-4 h-4 w-4" /></div>{errors.interest && <p className="mt-1 text-xs text-magenta">{errors.interest}</p>}</div></div><div className="mt-5"><label className="mb-2 block text-sm font-semibold" htmlFor="message">Your question <span className="font-normal text-muted-foreground">(optional)</span></label><textarea id="message" name="message" rows={4} maxLength={500} placeholder="What would you like to know?" className="form-field resize-y" />{errors.message && <p className="mt-1 text-xs text-magenta">{errors.message}</p>}</div><Button type="submit" className="mt-6 h-12 w-full text-sm sm:w-auto sm:px-7">Prepare email <ArrowRight /></Button><p className="mt-4 text-xs leading-relaxed text-muted-foreground">Your email app will open; review and send the message there. This page does not submit it automatically.</p>{emailOpened && <p role="status" className="mt-4 flex items-start gap-2 text-sm text-foreground"><Check className="mt-0.5 h-4 w-4 shrink-0" />Email draft prepared. Please send it from your email app.</p>}</form>
      </div></section>
    </main>

    <footer className="bg-deep px-5 pb-24 pt-14 text-primary-foreground md:px-10 md:pb-9 lg:px-16"><div className="mx-auto max-w-[1312px]"><div className="flex flex-col justify-between gap-10 border-b border-primary-foreground/20 pb-12 md:flex-row"><div><strong className="font-display text-3xl">AGC<span className="text-gold">.</span></strong><p className="mt-2 text-sm text-primary-foreground/70">Amritsar Group of Colleges</p></div><div className="flex flex-wrap gap-x-8 gap-y-4 text-sm"><a href="#programs" className="hover:text-gold">Programs</a><a href="#admissions" className="hover:text-gold">Admissions</a><a href="#campus" className="hover:text-gold">Campus life</a><a href="#enquire" className="hover:text-gold">Contact</a><a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="hover:text-gold">WhatsApp ↗</a></div></div><div className="flex flex-col justify-between gap-4 pt-7 text-xs text-primary-foreground/60 md:flex-row"><p>Admissions concept for Amritsar Group of Colleges. Not an official AGC website.</p><p>Information sourced from <a href="https://agcamritsar.in/" target="_blank" rel="noopener noreferrer" className="underline">agcamritsar.in</a>. Verify current details with AGC.</p></div></div></footer>

    <div className="fixed inset-x-0 bottom-0 z-50 grid h-16 grid-cols-3 border-t border-primary-foreground/20 bg-deep text-primary-foreground md:hidden"><a href={APPLY_URL} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center gap-1 bg-gold text-xs font-bold text-gold-foreground"><ArrowUpRight className="h-5 w-5" />Apply</a><a href={CALL_URL} className="flex flex-col items-center justify-center gap-1 border-r border-primary-foreground/20 text-xs font-semibold"><Phone className="h-5 w-5" />Call</a><a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center gap-1 text-xs font-semibold"><MessageCircle className="h-5 w-5" />WhatsApp</a></div>
  </div>;
}

function Field({ label, name, type = "text", error }: { label: string; name: string; type?: string; error?: string | undefined }) {
  return <div><label htmlFor={name} className="mb-2 block text-sm font-semibold">{label} <span className="text-magenta">*</span></label><input id={name} name={name} type={type} maxLength={name === "phone" ? 20 : name === "email" ? 255 : 100} autoComplete={name === "name" ? "name" : name === "email" ? "email" : "tel"} className="form-field" aria-invalid={Boolean(error)} aria-describedby={error ? `${name}-error` : undefined} />{error && <p id={`${name}-error`} className="mt-1 text-xs text-magenta">{error}</p>}</div>;
}
