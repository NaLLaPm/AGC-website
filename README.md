# AGC Amritsar — Admissions Portal

A single-page admissions experience for **Amritsar Group of Colleges**.

**Goal:** Turn prospective students and parents into applicants. One primary action everywhere: **Apply now**.

**Stack:** Vite + React (TanStack Router), Tailwind CSS, TypeScript.

**Design**

- Colours: teal `#06262A` / `#0A3D42`, marble `#EDF2F0`, gold `#D9A93A`, magenta `#B4245D` as accent.
- Fonts: Bricolage Grotesque for headings, Instrument Sans for body.
- Motion: hero entrance, ripple effect, reduced-motion respected.

**Sections, in order**

1. Sticky nav with an Apply button
2. Hero: headline, badge, two CTAs (Apply, Call)
3. Recruiter strip
4. Programs, with tabs by school
5. Admissions, four steps
6. Campus life and FAQ
7. Enquiry form, address, phone
8. Footer

## Development

You need Node.js — install with [nvm](https://github.com/nvm-sh/nvm#installing-and-updating) or [fnm](https://github.com/Schniz/fnm).

```sh
git clone <this-repository-url>
cd AGC-website
npm install
npm run dev
```

## Build

```sh
npm run build
```

## Open items

- Connect enquiry form to an email delivery service or Google Sheets.
- Verify all fees, dates, and program details directly with AGC.
- Add OG image and finalize favicon.
- Lighthouse audit and SEO meta review before launch.
