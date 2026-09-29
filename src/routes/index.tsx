import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import {
  ArrowRight, ArrowUpRight, Check, ChevronDown, Menu, Plus,
  Phone, MapPin, Mail, MessageCircle, X, Train, Plane, Bus, Building2,
  Clock, FlaskConical, BookOpen, Home, Trophy, Lightbulb, UtensilsCrossed,
} from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import campusImage from "@/assets/agc-campus.jpg";
import agcLogo from "@/assets/agc-logo.png";
import amitSharma from "@/assets/faculty/amit-sharma.jpg";
import gauravTejpal from "@/assets/faculty/gaurav-tejpal.jpg";
import rajneeshArora from "@/assets/faculty/rajneesh-arora.jpg";
import vkBanga from "@/assets/faculty/vk-banga.webp";

// Company logos
import logoTCS from "@/assets/companies/tcs.png";
import logoInfosys from "@/assets/companies/infosys.png";
import logoCognizant from "@/assets/companies/cognizant.jpg";
import logoAccenture from "@/assets/companies/accenture.png";
import logoAmazon from "@/assets/companies/amazon.jpg";
import logoDell from "@/assets/companies/dell.png";
import logoEricsson from "@/assets/companies/ericsson.jpg";
import logoWipro from "@/assets/companies/wipro.jpg";
import logoNagarro from "@/assets/companies/nagarro.png";
import logoHCL from "@/assets/companies/hcl.png";
import logoIBM from "@/assets/companies/ibm.jpg";

// Accreditation logos
import logoAICTE from "@/assets/accreditations/aicte.png";
import logoNAAC  from "@/assets/accreditations/naac.png";
import logoNBA   from "@/assets/accreditations/nba.png";
import logoUGC   from "@/assets/accreditations/ugc.png";
import logoPCI   from "@/assets/accreditations/pci.png";

const APPLY_URL = "https://agcamritsar.in/form/";
const CALL_URL = "tel:+918872009951";
const WHATSAPP_URL = "https://wa.me/918872009950";
const EMAIL = "admission@acetedu.in";

const schools = [
  {
    name: "Engineering",
    intro: "Build what comes next.",
    courses: [
      { name: "B.Tech", detail: "CSE, AI & ML, IT, ECE, Electrical, Mechanical, Civil", years: "4 yrs" },
      { name: "B.Tech (Lateral)", detail: "Direct second-year admission", years: "3 yrs" },
      { name: "M.Tech", detail: "Specialisations in CSE & ECE", years: "2 yrs" },
    ],
    link: "https://agcamritsar.in/explore-programs.php",
  },
  {
    name: "Computing",
    intro: "Turn curiosity into capability.",
    courses: [
      { name: "BCA", detail: "Computer applications", years: "3 yrs" },
      { name: "MCA", detail: "Computer applications", years: "2 yrs" },
    ],
    link: "https://agcamritsar.in/explore-programs.php",
  },
  {
    name: "Management",
    intro: "Lead with perspective.",
    courses: [
      { name: "BBA", detail: "Bachelor of Business Administration", years: "3 yrs" },
      { name: "B.Com (Hons)", detail: "Commerce with honours", years: "3 yrs" },
      { name: "MBA", detail: "Master of Business Administration", years: "2 yrs" },
      { name: "M.Com", detail: "Master of Commerce", years: "2 yrs" },
    ],
    link: "https://agcamritsar.in/explore-programs.php",
  },
  {
    name: "Pharmacy",
    intro: "Make a difference in health.",
    courses: [
      { name: "B.Pharm", detail: "Bachelor of Pharmacy", years: "4 yrs" },
      { name: "D.Pharm", detail: "Diploma in Pharmacy", years: "2 yrs" },
      { name: "Pharm.D", detail: "Doctor of Pharmacy", years: "6 yrs" },
    ],
    link: "https://agcamritsar.in/explore-programs.php",
  },
  {
    name: "More",
    intro: "Find a path that feels like yours.",
    courses: [
      { name: "Hotel Management", detail: "HMCT & Tourism", years: "3-4 yrs" },
      { name: "Allied Health Sciences", detail: "Paramedical programs", years: "3 yrs" },
      { name: "Fashion Design", detail: "B.Sc Fashion Design", years: "3 yrs" },
      { name: "Agriculture", detail: "B.Sc Agriculture", years: "4 yrs" },
    ],
    link: "https://agcamritsar.in/explore-programs.php",
  },
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
      { title: "Admissions 2026-27 | Amritsar Group of Colleges" },
      { name: "description", content: "Explore programs and admissions at Amritsar Group of Colleges. NAAC A grade, NBA accredited. Engineering, Management, Pharmacy, Computing and more." },
      { property: "og:title", content: "Admissions 2026-27 | Amritsar Group of Colleges" },
      { property: "og:description", content: "NAAC A grade, NBA accredited college in Amritsar. Apply online for 2026-27 admissions." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://agcamritsar.in/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://agcamritsar.in/" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "CollegeOrUniversity",
        name: "Amritsar Group of Colleges",
        url: "https://agcamritsar.in/",
        address: {
          "@type": "PostalAddress",
          streetAddress: "12 Km Stone, Amritsar-Jalandhar, G.T. Road",
          addressLocality: "Amritsar",
          postalCode: "143001",
          addressRegion: "Punjab",
          addressCountry: "IN",
        },
        telephone: "+918872009951",
        email: EMAIL,
      }),
    }],
  }),
  component: Index,
});

function ApplyLink({ children = "Apply now", className = "" }: { children?: React.ReactNode; className?: string }) {
  return (
    <Button asChild variant="gold" className={className}>
      <a href={APPLY_URL} target="_blank" rel="noopener noreferrer">
        {children}<ArrowUpRight aria-hidden="true" />
      </a>
    </Button>
  );
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
    const subject = encodeURIComponent("AGC admissions enquiry - " + interest);
    const body = encodeURIComponent("Name: " + name + "\nEmail: " + email + "\nPhone: " + phone + "\nArea of interest: " + interest + "\n\n" + (message || "Please contact me about admissions."));
    window.location.href = "mailto:" + EMAIL + "?subject=" + subject + "&body=" + body;
    setEmailOpened(true);
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-background pb-16 text-foreground md:pb-0">

      {/* NAV */}
      <header className="sticky top-0 z-40 border-b border-border bg-white text-foreground shadow-sm">
        <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between gap-4 px-5 md:px-10 lg:px-16">
          <a href="#top" aria-label="AGC Amritsar home" className="flex min-w-0 items-center gap-3">
            <img src={agcLogo} alt="Amritsar Group of Colleges" className="h-14 w-auto shrink-0" />
          </a>
          <nav aria-label="Main navigation" className="hidden items-center gap-8 text-sm font-medium lg:flex">
            <a className="transition-colors hover:text-gold" href="#programs">Programs</a>
            <a className="transition-colors hover:text-gold" href="#admissions">Admissions</a>
            <a className="transition-colors hover:text-gold" href="#campus">Campus</a>
            <a className="transition-colors hover:text-gold" href="#leadership">Leadership</a>
            <a className="transition-colors hover:text-gold" href="#enquire">Contact</a>
          </nav>
          <div className="flex items-center gap-3">
            <ApplyLink className="hidden h-10 px-5 sm:inline-flex" />
            <Button
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              variant="outline"
              size="icon"
              className="lg:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
        {menuOpen && (
          <nav aria-label="Mobile navigation" className="flex flex-col border-t border-border bg-white px-5 py-3 lg:hidden">
            {[["Programs", "#programs"], ["Admissions", "#admissions"], ["Campus", "#campus"], ["Leadership", "#leadership"], ["Contact", "#enquire"]].map(([label, href]) => (
              <a key={href} href={href} onClick={() => setMenuOpen(false)} className="border-b border-border py-3 text-sm">{label}</a>
            ))}
          </nav>
        )}
      </header>

      <main id="top">

        {/* HERO */}
        <section
          className="hero-scene flex min-h-[620px] items-center text-primary-foreground md:min-h-[700px] lg:min-h-[760px]"
          aria-labelledby="hero-heading"
        >
          <img
            src={campusImage}
            width={1600}
            height={1067}
            alt="Amritsar Group of Colleges campus"
            className="hero-photo"
            fetchPriority="high"
          />
          <div className="hero-ripple" aria-hidden="true" />
          <div className="mx-auto w-full max-w-[1440px] px-5 pb-16 pt-16 md:px-10 md:pb-28 md:pt-28 lg:px-16">
            <div className="max-w-4xl">
              <span className="inline-flex items-center gap-2 border border-primary-foreground/40 px-3 py-2 text-[10px] font-semibold uppercase tracking-[.15em] sm:text-xs">
                <span className="h-1.5 w-1.5 rounded-full bg-magenta" />
                Admissions open for 2026-27 &middot; Amritsar, Punjab
              </span>
              <div className="hero-title mt-6 md:mt-10">
                <h1 id="hero-heading" className="font-display max-w-[860px] text-[clamp(3rem,7vw,7.5rem)] font-semibold leading-[.96]">
                  Amritsar Group<br />of <span className="text-gold">Colleges.</span>
                </h1>
              </div>
              <p className="relative z-10 mt-5 max-w-xl text-base leading-relaxed text-primary-foreground/85 md:text-lg">
                Find your place to begin. Study engineering, management, agriculture, design and hospitality at our Amritsar campus.
              </p>
              <div className="relative z-10 mt-6 flex flex-wrap gap-3 md:mt-8">
                <ApplyLink className="h-12 px-7 text-sm" />
                <Button asChild variant="light" className="h-12 px-6">
                  <a href={CALL_URL}><Phone /> Call admissions</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* RECRUITER STRIP */}
        <section className="overflow-hidden border-b border-border" aria-label="Companies that recruit from AGC">
          {/* Stats bar */}
          <div className="bg-deep px-5 py-6 text-primary-foreground md:px-10 lg:px-16">
            <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-6">
              <div>
                <p className="eyebrow text-gold">Placements</p>
                <h2 className="font-display mt-1 text-2xl font-semibold md:text-3xl">Our students work at the best.</h2>
              </div>
              <div className="flex flex-wrap gap-8">
                {[["500+", "Students placed"], ["40+", "Recruiting companies"], ["8 LPA", "Highest package"], ["3.5 LPA", "Average package"]].map(([val, label]) => (
                  <div key={label}>
                    <strong className="font-display block text-2xl font-bold text-gold md:text-3xl">{val}</strong>
                    <span className="text-xs text-primary-foreground/60">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Scrolling logo ticker */}
          <div className="bg-white py-6">
            <div className="ticker-wrap">
              <div className="ticker-track">
                {[...Array(2)].map((_, pass) =>
                  [
                    { src: logoTCS,       alt: "TCS" },
                    { src: logoInfosys,   alt: "Infosys" },
                    { src: logoCognizant, alt: "Cognizant" },
                    { src: logoAccenture, alt: "Accenture" },
                    { src: logoAmazon,    alt: "Amazon" },
                    { src: logoDell,      alt: "Dell" },
                    { src: logoEricsson,  alt: "Ericsson" },
                    { src: logoWipro,     alt: "Wipro" },
                    { src: logoNagarro,   alt: "Nagarro" },
                    { src: logoHCL,       alt: "HCL" },
                    { src: logoIBM,       alt: "IBM" },
                  ].map(({ src, alt }) => (
                    <div
                      key={pass + "-" + alt}
                      className="mx-2 flex-shrink-0 overflow-hidden rounded-lg border border-border bg-white shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
                      style={{ width: "200px", height: "92px" }}
                    >
                      <img src={src} alt={alt} className="h-full w-full object-cover" />
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ACCREDITATIONS STRIP */}
        <section className="border-b border-border bg-deep text-primary-foreground" aria-label="Accreditations and approvals">
          <div className="mx-auto flex max-w-[1440px] flex-wrap items-center gap-x-10 gap-y-5 px-5 py-7 md:px-10 lg:px-16">
            <p className="eyebrow shrink-0 text-primary-foreground/50">Recognised by</p>
            {[
              { src: logoUGC,   alt: "UGC — University Grants Commission",   label: "Autonomous"  },
              { src: logoNAAC,  alt: "NAAC — Grade A",                        label: "NAAC Grade A" },
              { src: logoNBA,   alt: "NBA — National Board of Accreditation", label: "NBA Accredited" },
              { src: logoAICTE, alt: "AICTE — All India Council for Technical Education", label: "AICTE Approved" },
              { src: logoPCI,   alt: "PCI — Pharmacy Council of India",       label: "PCI Approved"  },
            ].map(({ src, alt, label }) => (
              <div key={label} className="flex flex-col items-center gap-1.5">
                <img src={src} alt={alt} className="h-10 w-auto max-w-[120px] object-contain" />
                <span className="text-[10px] font-semibold uppercase tracking-wider text-primary-foreground/50">{label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* PROGRAMS */}
        <section id="programs" className="scroll-mt-20 bg-background px-5 py-20 md:px-10 md:py-28 lg:px-16">
          <div className="mx-auto max-w-[1312px]">
            <div className="grid gap-5 md:grid-cols-[1fr_1fr] md:items-end">
              <div>
                <p className="eyebrow text-magenta">01 / Find your direction</p>
                <h2 className="font-display mt-4 max-w-2xl text-4xl font-semibold leading-[1.05] md:text-6xl">
                  Pick a school, see what you can study.
                </h2>
              </div>
              <p className="max-w-md text-base leading-relaxed text-muted-foreground md:justify-self-end">
                Degrees are affiliated to IKG Punjab Technical University, Jalandhar and approved by AICTE.
              </p>
            </div>

            <div className="mt-12 border-y border-border">
              <div role="tablist" aria-label="Program areas" className="flex gap-7 overflow-x-auto border-b border-border py-1 scrollbar-none">
                {schools.map((school, index) => (
                  <Button
                    key={school.name}
                    role="tab"
                    aria-selected={activeSchool === index}
                    aria-controls="program-panel"
                    id={"school-tab-" + index}
                    variant="link"
                    onClick={() => setActiveSchool(index)}
                    className={"relative h-14 shrink-0 rounded-none px-0 font-semibold no-underline hover:no-underline " + (activeSchool === index ? "text-primary after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-full after:bg-gold" : "text-muted-foreground")}
                  >
                    {school.name}
                  </Button>
                ))}
              </div>
              <div id="program-panel" role="tabpanel" aria-labelledby={"school-tab-" + activeSchool} className="grid min-h-[300px] gap-9 py-10 md:grid-cols-[.8fr_1.2fr] md:py-14">
                <div>
                  <p className="eyebrow text-muted-foreground">Explore / {selected.name}</p>
                  <h3 className="font-display mt-5 max-w-sm text-3xl font-semibold md:text-4xl">{selected.intro}</h3>
                  <a href={selected.link} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex items-center gap-2 border-b border-primary pb-1 text-sm font-bold">
                    View all programs <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
                <ul className="grid content-start gap-0">
                  {selected.courses.map((course, index) => (
                    <li key={course.name} className="flex items-center gap-5 border-b border-border py-4 first:border-t">
                      <span className="text-xs font-semibold text-muted-foreground">{"0" + (index + 1)}</span>
                      <span className="font-display flex-1 font-semibold md:text-lg">{course.name}</span>
                      <span className="hidden text-sm text-muted-foreground sm:block">{course.detail}</span>
                      <span className="shrink-0 rounded border border-border px-2 py-0.5 text-[11px] font-semibold text-muted-foreground">{course.years}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ADMISSIONS */}
        <section id="admissions" className="scroll-mt-20 bg-deep px-5 py-20 text-primary-foreground md:px-10 md:py-28 lg:px-16">
          <div className="mx-auto max-w-[1312px]">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <p className="eyebrow text-gold">02 / Admissions</p>
                <h2 className="font-display mt-4 max-w-2xl text-4xl font-semibold leading-[1.05] md:text-6xl">
                  Four steps from form to first class.
                </h2>
              </div>
              <p className="max-w-sm leading-relaxed text-primary-foreground/70">
                Admission runs on AGC-NEST and merit. Valid JEE Main, GATE or CMAT scores are accepted too.
              </p>
            </div>
            <div className="mt-14 grid border-t border-primary-foreground/25 md:grid-cols-4">
              {[
                ["01", "Register online", "Fill the application form and pay the Rs. 1,000 application fee."],
                ["02", "Show your score", "Sit for AGC-NEST, or submit a valid JEE Main, GATE or CMAT score."],
                ["03", "Verify documents", "Bring your marksheets and ID for verification on campus."],
                ["04", "Pay fees and enrol", "Confirm your seat, then choose hostel and transport."],
              ].map(([number, title, copy]) => (
                <div key={number} className="border-b border-primary-foreground/25 py-7 md:border-b-0 md:border-r md:px-7 md:first:pl-0 md:last:border-r-0">
                  <span className="font-display text-5xl text-gold">{number}</span>
                  <h3 className="font-display mt-9 text-2xl font-semibold">{title}</h3>
                  <p className="mt-3 max-w-[240px] text-sm leading-relaxed text-primary-foreground/70">{copy}</p>
                </div>
              ))}
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <ApplyLink className="h-12 px-7" />
              <a href="https://agcamritsar.in/admission-guidelines.php" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border-b border-primary-foreground/70 pb-1 text-sm font-semibold">
                Read admission guidelines <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>

        {/* CAMPUS */}
        <section id="campus" className="scroll-mt-20 bg-background px-5 py-20 md:px-10 md:py-28 lg:px-16">
          <div className="mx-auto max-w-[1312px]">
            <p className="eyebrow text-magenta">03 / Life at AGC</p>
            <h2 className="font-display mt-4 max-w-xl text-4xl font-semibold leading-[1.05] md:text-6xl">
              Life across twenty-four verdant acres.
            </h2>
            <p className="mt-6 max-w-2xl leading-relaxed text-muted-foreground">
              State-of-the-art academic blocks, research labs, high-performance computing, sports arenas, and vibrant residential facilities.
            </p>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { Icon: FlaskConical, title: "Advanced AI & Engineering Labs", copy: "Over 50 high-tech laboratories featuring Apple Authorized Training, AI/ML computing clusters, IoT prototyping, robotics workshops, and CNC machining centers." },
                { Icon: BookOpen, title: "Central Digital Knowledge Hub", copy: "Modern multi-storey library stocking 60,000+ volumes, 150+ journals, Springer/IEEE digital subscriptions, and National Digital Library access." },
                { Icon: Home, title: "Student Residential Hostels", copy: "Secure on-campus hostels housing 1,200+ students with AC and non-AC options, 24/7 security, high-speed Wi-Fi, and hygienic dining." },
                { Icon: Trophy, title: "Collegiate Sports Arena & Gym", copy: "Full-size cricket stadium, basketball and volleyball courts, indoor badminton, table tennis, and a fully equipped modern fitness gymnasium." },
                { Icon: Lightbulb, title: "Innovation & Incubation Hub", copy: "AICTE and MSME-approved startup incubation center with pre-seed funding, IP mentorship, prototyping gear, and entrepreneurship bootcamps." },
                { Icon: UtensilsCrossed, title: "AGC Swagatam Dining", copy: "On-campus fine-dining center and live hospitality training restaurant with diverse cuisines, open-air cafe spaces, and event dining." },
              ].map(({ Icon, title, copy }) => (
                <div key={title} className="rounded-sm border border-border p-7">
                  <Icon className="h-6 w-6 text-gold" />
                  <h3 className="font-display mt-4 text-lg font-semibold">{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{copy}</p>
                </div>
              ))}
            </div>

            <div className="mt-14 grid grid-cols-2 gap-7 border-t border-border pt-10 sm:grid-cols-4">
              {[
                ["Founded", "2002"],
                ["Accreditation", "NAAC A + NBA"],
                ["Affiliation", "IKGPTU, Jalandhar"],
                ["Entrance test", "AGC-NEST"],
              ].map(([label, value]) => (
                <div key={label}>
                  <strong className="font-display block text-3xl font-semibold md:text-4xl">{value}</strong>
                  <span className="mt-2 block text-sm text-muted-foreground">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* LEADERSHIP */}
        <section id="leadership" className="scroll-mt-20 bg-secondary px-5 py-20 md:px-10 md:py-28 lg:px-16">
          <div className="mx-auto max-w-[1312px]">
            <p className="eyebrow text-magenta">04 / Leadership</p>
            <h2 className="font-display mt-4 max-w-xl text-4xl font-semibold leading-[1.05] md:text-6xl">
              Guiding minds, shaping futures.
            </h2>
            <p className="mt-6 max-w-2xl leading-relaxed text-muted-foreground">
              Learn from esteemed administrators, senior academicians, and researchers dedicated to intellectual rigor and career readiness.
            </p>

            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  photo: amitSharma,
                  pos: "object-top",
                  name: "Adv. Amit Sharma",
                  role: "Chairman & CEO",
                  credential: "Advocate & educational visionary",
                  bio: "Leading AGC's strategic mission, autonomous growth, and multi-disciplinary university-level expansion.",
                },
                {
                  photo: gauravTejpal,
                  pos: "object-left-top",
                  name: "Dr. Gaurav Tejpal",
                  role: "Principal, AGC",
                  credential: "Ph.D., Member Secretary (BOG)",
                  bio: "Senior academician in Mechanical & Advanced Manufacturing, driving NEP-aligned curricula and innovation ecosystems.",
                },
                {
                  photo: rajneeshArora,
                  pos: "object-left-top",
                  name: "Dr. Rajneesh Arora",
                  role: "Managing Director",
                  credential: "Ph.D. IIT Delhi, Ex-VC IKGPTU",
                  bio: "Distinguished academic leader guiding AGC's institutional governance and research culture.",
                },
                {
                  photo: vkBanga,
                  pos: "object-top",
                  name: "Prof. (Dr.) V. K. Banga",
                  role: "Distinguished Academic Advisor",
                  credential: "Ph.D., AI & Robotics Specialist",
                  bio: "Longtime mentor instrumental in AGC's autonomous status, NAAC A grade, and global research consortia.",
                },
              ].map(({ photo, pos, name, role, credential, bio }) => (
                <div key={name} className="flex flex-col">
                  <div className="aspect-[4/5] overflow-hidden bg-muted">
                    <img src={photo} alt={name} className={"h-full w-full object-cover " + pos} />
                  </div>
                  <div className="mt-4">
                    <p className="eyebrow text-gold">{role}</p>
                    <h3 className="font-display mt-1 text-xl font-semibold">{name}</h3>
                    <p className="mt-1 text-xs font-medium text-muted-foreground">{credential}</p>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-background px-5 py-20 md:px-10 md:py-24 lg:px-16">
          <div className="mx-auto grid max-w-[1312px] gap-10 md:grid-cols-[.8fr_1.2fr]">
            <div>
              <p className="eyebrow text-magenta">Good to know</p>
              <h2 className="font-display mt-4 text-4xl font-semibold md:text-5xl">Questions parents ask first.</h2>
              <p className="mt-5 max-w-sm leading-relaxed text-muted-foreground">For course-specific advice, the admissions team is just a call away.</p>
            </div>
            <div className="border-t border-border">
              {[
                ["Do I need a JEE score?", "No. You can take AGC-NEST or apply on merit. A valid JEE Main, GATE or CMAT score is accepted as an alternative."],
                ["Is hostel and transport available?", "Yes. Separate AC and non-AC residential hostels accommodate 1,200+ students with 24/7 security, power backup, and high-speed Wi-Fi. AGC operates 40+ dedicated college buses connecting Amritsar, Batala, Gurdaspur, Tarn Taran, Jalandhar, and Beas."],
                ["Who is AGC affiliated to?", "IK Gujral Punjab Technical University, Jalandhar, with AICTE approval, UGC autonomous status, NAAC A and NBA accreditation."],
                ["How do I get the fee structure?", "Send an enquiry below or call 0183-5069527 -- the helpdesk will share the programme-wise fee sheet. The online application fee is Rs. 1,000."],
              ].map(([question, answer]) => (
                <details key={question} className="faq-item border-b border-border py-5">
                  <summary className="flex items-center justify-between gap-5 font-display text-lg font-semibold">
                    <span>{question}</span>
                    <Plus className="h-5 w-5 shrink-0" />
                  </summary>
                  <p className="max-w-xl pt-4 pr-8 text-sm leading-relaxed text-muted-foreground">{answer}</p>
                </details>
              ))}
              <a href="https://agcamritsar.in/admission-guidelines.php" target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex items-center gap-2 border-b border-primary pb-1 text-sm font-bold">
                More admission details <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>

        {/* LOCATION */}
        <section className="bg-deep px-5 py-20 text-primary-foreground md:px-10 md:py-24 lg:px-16">
          <div className="mx-auto max-w-[1312px]">
            <p className="eyebrow text-gold">Find us</p>
            <h2 className="font-display mt-4 max-w-xl text-4xl font-semibold leading-[1.05] md:text-5xl">
              On the historic Grand Trunk Road.
            </h2>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-primary-foreground/70">
              Conveniently located at 12 Km Stone on the Amritsar-Jalandhar National Highway (NH-3), easily accessible by air, rail, and dedicated college transit.
            </p>

            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { Icon: Train, label: "Railway Station", detail: "Amritsar Jn", dist: "14 km" },
                { Icon: Plane, label: "International Airport", detail: "ATQ Airport", dist: "24 km" },
                { Icon: Bus, label: "College Bus Fleet", detail: "40+ Routes across Punjab", dist: "" },
                { Icon: Building2, label: "City Bus Stand", detail: "Amritsar ISBT", dist: "12 km" },
              ].map(({ Icon, label, detail, dist }) => (
                <div key={label} className="flex items-start gap-4">
                  <Icon className="mt-1 h-5 w-5 shrink-0 text-gold" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-primary-foreground/60">{label}</p>
                    <p className="font-display mt-1 font-semibold">{detail}</p>
                    {dist && <p className="text-sm text-primary-foreground/60">{dist}</p>}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 grid gap-8 border-t border-primary-foreground/20 pt-10 sm:grid-cols-2">
              <div className="flex items-start gap-4">
                <MapPin className="mt-1 h-5 w-5 shrink-0 text-magenta" />
                <div>
                  <p className="font-semibold">Campus Address</p>
                  <p className="mt-1 text-sm leading-relaxed text-primary-foreground/70">
                    Amritsar Group of Colleges (AGC)<br />
                    12 Km Stone, Amritsar-Jalandhar G.T. Road (NH-3),<br />
                    Post Office Meharbanpur, Amritsar 143001, Punjab, India.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Clock className="mt-1 h-5 w-5 shrink-0 text-magenta" />
                <div>
                  <p className="font-semibold">Visiting &amp; Helpdesk Hours</p>
                  <div className="mt-1 space-y-1 text-sm text-primary-foreground/70">
                    <p><span className="font-medium text-primary-foreground/90">Mon - Fri</span> &middot; 9:00 AM - 5:00 PM</p>
                    <p><span className="font-medium text-primary-foreground/90">Saturday (Admissions)</span> &middot; 9:00 AM - 3:00 PM</p>
                    <p><span className="font-medium text-primary-foreground/90">Sunday &amp; Holidays</span> &middot; Closed (Online Forms Active)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ENQUIRY */}
        <section id="enquire" className="scroll-mt-20 bg-background px-5 py-20 md:px-10 md:py-28 lg:px-16">
          <div className="mx-auto grid max-w-[1312px] gap-12 lg:grid-cols-[.9fr_1.1fr] lg:gap-20">
            <div>
              <p className="eyebrow text-magenta">05 / Get in touch</p>
              <h2 className="font-display mt-4 max-w-lg text-4xl font-semibold leading-[1.05] md:text-6xl">
                Tell us what you want to study.
              </h2>
              <p className="mt-6 max-w-md leading-relaxed text-muted-foreground">
                The admissions helpdesk answers on working days and can walk you through the form.
              </p>
              <div className="mt-12 space-y-6 border-t border-border pt-8 text-sm">
                <a href={CALL_URL} className="flex items-start gap-4">
                  <Phone className="h-5 w-5 shrink-0 text-magenta" />
                  <span>
                    <strong className="block font-semibold">Call admissions</strong>
                    <span className="mt-1 block text-muted-foreground">+91 88720 09951 / 0183-5069527</span>
                  </span>
                </a>
                <a href={"mailto:" + EMAIL} className="flex items-start gap-4">
                  <Mail className="h-5 w-5 shrink-0 text-magenta" />
                  <span>
                    <strong className="block font-semibold">Email</strong>
                    <span className="mt-1 block text-muted-foreground">{EMAIL}</span>
                  </span>
                </a>
                <div className="flex items-start gap-4">
                  <MapPin className="h-5 w-5 shrink-0 text-magenta" />
                  <span>
                    <strong className="block font-semibold">Visit</strong>
                    <span className="mt-1 block text-muted-foreground">
                      12 Km Stone, Amritsar-Jalandhar G.T. Road,<br />
                      Amritsar 143001, Punjab, India
                    </span>
                  </span>
                </div>
              </div>
            </div>

            <form noValidate onSubmit={handleEnquiry} className="bg-card p-6 md:p-10">
              <p className="eyebrow text-muted-foreground">Admissions enquiry</p>
              <h3 className="font-display mt-3 text-2xl font-semibold">Let's start a conversation.</h3>
              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                <Field label="Full name" name="name" error={errors.name} />
                <Field label="Email address" name="email" type="email" error={errors.email} />
                <Field label="Phone number" name="phone" type="tel" error={errors.phone} />
                <div>
                  <label className="mb-2 block text-sm font-semibold" htmlFor="interest">
                    Area of interest <span className="text-magenta">*</span>
                  </label>
                  <div className="relative">
                    <select id="interest" name="interest" defaultValue="" className="form-field appearance-none pr-9">
                      <option value="" disabled>Select a program</option>
                      {schools.map(school => (
                        <option key={school.name} value={school.name}>{school.name}</option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-4 h-4 w-4" />
                  </div>
                  {errors.interest && <p className="mt-1 text-xs text-magenta">{errors.interest}</p>}
                </div>
              </div>
              <div className="mt-5">
                <label className="mb-2 block text-sm font-semibold" htmlFor="message">
                  Your question <span className="font-normal text-muted-foreground">(optional)</span>
                </label>
                <textarea id="message" name="message" rows={4} maxLength={500} placeholder="What would you like to know?" className="form-field resize-y" />
                {errors.message && <p className="mt-1 text-xs text-magenta">{errors.message}</p>}
              </div>
              <Button type="submit" className="mt-6 h-12 w-full text-sm sm:w-auto sm:px-7">
                Prepare email <ArrowRight />
              </Button>
              <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                Your email app will open; review and send the message there.
              </p>
              {emailOpened && (
                <p role="status" className="mt-4 flex items-start gap-2 text-sm text-foreground">
                  <Check className="mt-0.5 h-4 w-4 shrink-0" />
                  Email draft prepared. Please send it from your email app.
                </p>
              )}
            </form>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="bg-deep px-5 pb-24 pt-14 text-primary-foreground md:px-10 md:pb-9 lg:px-16">
        <div className="mx-auto max-w-[1312px]">
          <div className="flex flex-col justify-between gap-10 border-b border-primary-foreground/20 pb-12 md:flex-row">
            <div>
              <img src={agcLogo} alt="Amritsar Group of Colleges" className="h-12 w-auto" />
              <p className="mt-2 text-sm text-primary-foreground/60">Amritsar Group of Colleges</p>
            </div>
            <div className="flex flex-wrap gap-x-8 gap-y-4 text-sm">
              <a href="#programs" className="hover:text-gold">Programs</a>
              <a href="#admissions" className="hover:text-gold">Admissions</a>
              <a href="#campus" className="hover:text-gold">Campus</a>
              <a href="#leadership" className="hover:text-gold">Leadership</a>
              <a href="#enquire" className="hover:text-gold">Contact</a>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="hover:text-gold">WhatsApp &#8599;</a>
            </div>
          </div>
          <div className="flex flex-col justify-between gap-4 pt-7 text-xs text-primary-foreground/50 md:flex-row">
            <p>&copy; {new Date().getFullYear()} Amritsar Group of Colleges &middot; Admissions Portal</p>
            <p>Information sourced from <a href="https://agcamritsar.in/" target="_blank" rel="noopener noreferrer" className="underline">agcamritsar.in</a>. Verify current details with AGC.</p>
          </div>
        </div>
      </footer>

      {/* MOBILE STICKY BAR */}
      <div className="fixed inset-x-0 bottom-0 z-50 grid h-16 grid-cols-3 border-t border-primary-foreground/20 bg-deep text-primary-foreground md:hidden">
        <a href={APPLY_URL} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center gap-1 bg-gold text-xs font-bold text-gold-foreground">
          <ArrowUpRight className="h-5 w-5" />Apply
        </a>
        <a href={CALL_URL} className="flex flex-col items-center justify-center gap-1 border-r border-primary-foreground/20 text-xs font-semibold">
          <Phone className="h-5 w-5" />Call
        </a>
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center gap-1 text-xs font-semibold">
          <MessageCircle className="h-5 w-5" />WhatsApp
        </a>
      </div>

    </div>
  );
}

function Field({ label, name, type = "text", error }: { label: string; name: string; type?: string; error?: string }) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-sm font-semibold">
        {label} <span className="text-magenta">*</span>
      </label>
      <input
        id={name}
        name={name}
        type={type}
        maxLength={name === "phone" ? 20 : name === "email" ? 255 : 100}
        autoComplete={name === "name" ? "name" : name === "email" ? "email" : "tel"}
        className="form-field"
        aria-invalid={Boolean(error)}
        aria-describedby={error ? name + "-error" : undefined}
      />
      {error && <p id={name + "-error"} className="mt-1 text-xs text-magenta">{error}</p>}
    </div>
  );
}
