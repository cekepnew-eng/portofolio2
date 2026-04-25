import { useEffect, useMemo, useRef, useState, useCallback } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import './App.css'

/* ── Data ──────────────────────────────────────────── */
const PROJECTS = [
  {
    title: 'Project One',
    meta: 'E-commerce · UI/UX · Frontend',
    year: '2025',
    preview: 'preview--1',
    image: '/project-one.jpg',
  },
  {
    title: 'Project Two',
    meta: 'SaaS · Design System · Web App',
    year: '2025',
    preview: 'preview--2',
    image: '/projects/project-two.jpg',
  },
  {
    title: 'Project Three',
    meta: 'Portfolio · Motion · Branding',
    year: '2024',
    preview: 'preview--3',
    image: '/projects/project-three.jpg',
  },
]

const CONTACT_EMAIL = 'you@example.com'

const CV_URL = '/cv.pdf'

const PROFILE_IMAGE_URL = '/me.jpg'

const SKILLS = [
  { name: 'React', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'Vite', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg' },
  { name: 'JavaScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { name: 'TypeScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
  { name: 'HTML', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
  { name: 'CSS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
  { name: 'Node.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { name: 'Figma', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
  { name: 'Git', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
  { name: 'GitHub', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
  { name: 'Framer Motion', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/framermotion/framermotion-original.svg' },
  { name: 'VS Code', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' },
]

const SERVICES = [
  { title: 'UI/UX Design', desc: 'Wireframes, high-fidelity interfaces, interactive prototypes, and scalable design systems that put users first.' },
  { title: 'Frontend Development', desc: 'Pixel-perfect React applications with clean architecture, responsive layouts, and buttery-smooth animations.' },
  { title: 'Brand & Visual Identity', desc: 'Art direction, typography, color systems, and digital brand guidelines that make your product unforgettable.' },
]

const MARQUEE_WORDS = [
  'Design Systems', 'Brand Identity', 'React', 'Vite',
  'Motion Design', 'Accessibility', 'Web Apps', 'UI Engineering',
]

const SOCIALS = [
  {
    label: 'GitHub',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">
        <path
          fill="currentColor"
          d="M12 2C6.48 2 2 6.58 2 12.26c0 4.56 2.87 8.43 6.84 9.8.5.1.68-.22.68-.48 0-.24-.01-.88-.01-1.73-2.78.62-3.37-1.38-3.37-1.38-.46-1.2-1.11-1.52-1.11-1.52-.9-.64.07-.63.07-.63 1 .07 1.52 1.06 1.52 1.06.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.02-2.75-.1-.26-.44-1.32.1-2.75 0 0 .84-.27 2.75 1.05.8-.23 1.66-.34 2.51-.35.85 0 1.71.12 2.51.35 1.9-1.32 2.74-1.05 2.74-1.05.54 1.43.2 2.49.1 2.75.63.72 1.01 1.63 1.01 2.75 0 3.93-2.34 4.8-4.57 5.05.36.32.68.95.68 1.92 0 1.38-.01 2.5-.01 2.84 0 .26.18.58.69.48 3.96-1.37 6.83-5.24 6.83-9.8C22 6.58 17.52 2 12 2z"
        />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">
        <path
          fill="currentColor"
          d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.65-1.85 3.4-1.85 3.64 0 4.31 2.4 4.31 5.53v6.21zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z"
        />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">
        <path
          fill="currentColor"
          d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2zm9 2h-9A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4z"
        />
        <path
          fill="currentColor"
          d="M12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"
        />
        <path fill="currentColor" d="M17.6 6.4a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
      </svg>
    ),
  },
]

const HERO_DETAILS = [
  { label: 'Based in', value: 'Indonesia' },
  { label: 'Availability', value: 'Open for projects' },
  { label: 'Focus', value: 'UI + Frontend' },
]

const CERTIFICATES = [
  {
    title: 'DasarJavaScript',
    issuer: 'codingcamp',
    year: '2025',
    category: 'Frontend',
    image: '/sertijava.jpg',
  },
  {
    title: 'Front-End',
    issuer: 'CodingCamp',
    year: '2024',
    category: 'Web Fundamentals',
    image: '/frontend.jpg',
  },
  {
    title: 'JavaScript Algorithms and Data Structures',
    issuer: 'freeCodeCamp',
    year: '2024',
    category: 'JavaScript',
    image: '/certs/js-algorithms.jpg',
  },
  {
    title: 'UI Design Foundations',
    issuer: 'Coursera',
    year: '2025',
    category: 'UI/UX',
    image: '/certs/ui-design-foundations.jpg',
  },
]

/* ── Easing ─────────────────────────────────────────── */
const ease = [0.16, 1, 0.3, 1]

function App() {
  const reduceMotion = useReducedMotion()
  const isCertificatePage = typeof window !== 'undefined' && window.location.pathname.toLowerCase().startsWith('/certificate')
  const [showSplash, setShowSplash] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [currentTime, setCurrentTime] = useState('')

  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' })

  /* ── Splash (2s) ─────────────────────────────────── */
  useEffect(() => {
    const id = window.setTimeout(() => setShowSplash(false), 2000)
    return () => window.clearTimeout(id)
  }, [])

  /* ── System theme ─────────────────────────────────── */
  const systemTheme = useMemo(() => {
    if (typeof window === 'undefined') return 'dark'
    return window.matchMedia?.('(prefers-color-scheme: light)')?.matches ? 'light' : 'dark'
  }, [])

  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'dark'
    const stored = window.localStorage.getItem('theme')
    return stored === 'light' || stored === 'dark' ? stored : systemTheme
  })

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    window.localStorage.setItem('theme', theme)
  }, [theme])


  /* ── Scroll detection ─────────────────────────────── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* ── Live clock ───────────────────────────────────── */
  useEffect(() => {
    const tick = () => {
      const now = new Date()
      setCurrentTime(now.toLocaleTimeString('en-US', {
        hour: '2-digit', minute: '2-digit', second: '2-digit',
        timeZone: 'Asia/Jakarta', hour12: false,
      }))
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  /* ── Close menu on hash ───────────────────────────── */
  useEffect(() => {
    const fn = () => setMenuOpen(false)
    window.addEventListener('hashchange', fn)
    window.addEventListener('popstate', fn)
    return () => {
      window.removeEventListener('hashchange', fn)
      window.removeEventListener('popstate', fn)
    }
  }, [])

  /* ── Animation variants ───────────────────────────── */
  const fadeUp = {
    hidden: reduceMotion ? {} : { opacity: 0, y: 40 },
    show: reduceMotion
      ? { opacity: 1 }
      : { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
  }

  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: reduceMotion ? 0 : 0.08 } },
  }

  const charVariant = {
    hidden: reduceMotion ? {} : { y: '110%', opacity: 0 },
    show: reduceMotion
      ? { opacity: 1 }
      : { y: '0%', opacity: 1, transition: { duration: 0.7, ease } },
  }

  /* ── Magnetic button ref ──────────────────────────── */
  const magBtnRef = useRef(null)

  const onMagMove = useCallback((e) => {
    if (reduceMotion) return
    const btn = magBtnRef.current
    if (!btn) return
    const r = btn.getBoundingClientRect()
    const x = e.clientX - r.left - r.width / 2
    const y = e.clientY - r.top - r.height / 2
    btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`
  }, [reduceMotion])

  const onMagLeave = useCallback(() => {
    const btn = magBtnRef.current
    if (btn) btn.style.transform = 'translate(0, 0)'
  }, [])

  const onContactSubmit = useCallback((e) => {
    e.preventDefault()

    const name = contactForm.name.trim()
    const email = contactForm.email.trim()
    const message = contactForm.message.trim()

    if (!name || !email || !message) return

    const subject = `Portfolio message from ${name}`
    const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    const href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

    window.location.href = href
  }, [contactForm])

  /* ── Project hover image ──────────────────────────── */
  const [previewPos, setPreviewPos] = useState({ x: 0, y: 0 })
  const [activeProject, setActiveProject] = useState(null)

  const onProjectMove = useCallback((e, idx) => {
    setPreviewPos({ x: e.clientX + 20, y: e.clientY - 120 })
    setActiveProject(idx)
  }, [])

  /* ── Split text into chars ────────────────────────── */
  const splitText = (text) =>
    text.split('').map((char, i) => (
      <motion.span key={i} className="char" variants={charVariant} style={{ display: 'inline-block' }}>
        {char === ' ' ? '\u00A0' : char}
      </motion.span>
    ))

  if (showSplash) {
    return (
      <div className="splash" aria-label="Loading">
        <div className="splash__name">Adrian</div>
      </div>
    )
  }

  return (
    <div className="page">

      {/* ── Floating preview image ─── */}
      <AnimatePresence>
        {activeProject !== null && (
          <motion.div
            className="project-row__preview"
            style={{ left: previewPos.x, top: previewPos.y, position: 'fixed', opacity: 1, transform: 'scale(1)' }}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.25, ease }}
          >
            <div className={`project-row__preview-inner ${PROJECTS[activeProject]?.preview}`}>
              <img
                src={PROJECTS[activeProject]?.image}
                alt={PROJECTS[activeProject]?.title || 'Project preview'}
                loading="eager"
                decoding="async"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══════════ HEADER ═══════════ */}
      <header
        className={`top ${scrolled ? 'scrolled' : ''}`}
        data-open={menuOpen ? 'true' : 'false'}
      >
        <div className="top__inner">
          <a className="brand" href="#top" aria-label="Home">
            <span className="brand__dot" aria-hidden="true" />
            <span>Adrian Maulana</span>
          </a>

          <nav className="nav" aria-label="Primary">
            {isCertificatePage ? (
              <>
                <a href="/">Home</a>
                <a href="/certificate">Certificate</a>
                <a href="/#contact">Contact</a>
              </>
            ) : (
              <>
                <a href="#about">About</a>
                <a href="#work">Work</a>
                <a href="#skills">Skills</a>
                <a href="#services">Services</a>
                <a href="#certificate">Certificate</a>
              </>
            )}
          </nav>

          <div className="top__controls">
            <button
              type="button"
              className="themeBtn"
              onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? '◐' : '◑'}
            </button>
            <a className="contactBtn" href={isCertificatePage ? '/#contact' : '#contact'}>Let's talk</a>
            <button
              type="button"
              className="menuBtn"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              <span className="menuBtn__lines" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            className="mobileNav"
            style={{ display: 'flex' }}
            aria-label="Mobile"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {(isCertificatePage
              ? [
                { label: 'Home', href: '/' },
                { label: 'Certificate', href: '/certificate' },
                { label: 'Contact', href: '/#contact' },
              ]
              : [
                { label: 'About', href: '#about' },
                { label: 'Work', href: '#work' },
                { label: 'Skills', href: '#skills' },
                { label: 'Services', href: '#services' },
                { label: 'Certificate', href: '#certificate' },
                { label: 'Contact', href: '#contact' },
                { label: 'Download CV', href: CV_URL, download: true },
              ]).map((item, i) => (
              <motion.a
                key={item.label}
                href={item.href}
                download={item.download ? true : undefined}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06, duration: 0.5, ease }}
              >
                {item.label}
              </motion.a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>

      <main id="top">
        {isCertificatePage ? (
          <section className="certificate-page section">
            <motion.div
              className="certificate-hero"
              initial="hidden"
              animate="show"
              variants={stagger}
            >
              <motion.span className="section__num" variants={fadeUp}>(Certificate)</motion.span>
              <motion.h1 className="certificate-hero__title" variants={fadeUp}>
                Professional
                <br />
                Certifications
              </motion.h1>
              <motion.p className="certificate-hero__desc" variants={fadeUp}>
                A focused collection of certifications that support my frontend,
                UI engineering, and product design workflow.
              </motion.p>
            </motion.div>

            <motion.div
              className="certificate-grid"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.1 }}
              variants={stagger}
            >
              {CERTIFICATES.map((cert) => (
                <motion.a
                  key={cert.title}
                  className="certificate-card"
                  variants={fadeUp}
                  href={cert.image}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${cert.title} certificate`}
                >
                  <div className="certificate-card__media" aria-hidden="true">
                    <img src={cert.image} alt="" loading="lazy" />
                  </div>
                  <div className="certificate-card__top">
                    <span>{cert.category}</span>
                    <span>{cert.year}</span>
                  </div>
                  <h3>{cert.title}</h3>
                  <p>Issued by {cert.issuer}</p>
                </motion.a>
              ))}
            </motion.div>
          </section>
        ) : (
          <>
        {/* ═══════════ HERO ═══════════ */}
        <section className="hero">
          <div className="hero__bg" aria-hidden="true">
            <div className="hero__orb hero__orb--1" />
            <div className="hero__orb hero__orb--2" />
            <div className="hero__orb hero__orb--3" />
          </div>

          <motion.div
            className="hero__content"
            variants={stagger}
            initial="hidden"
            animate="show"
          >
            <motion.div className="hero__label" variants={fadeUp}>
              Creative Developer — Based in Indonesia
            </motion.div>

            <motion.div className="hero__kicker" variants={fadeUp}>
              Digital craft for ambitious brands
            </motion.div>

            <h1 className="hero__title">
              <motion.span className="hero__title-line" variants={stagger} initial="hidden" animate="show">
                {splitText('ADRIAN')}
              </motion.span>
              <motion.span className="hero__title-line hero__title-line--stroke" variants={stagger} initial="hidden" animate="show">
                {splitText('MAULANA')}
              </motion.span>
            </h1>

            <motion.div className="hero__bottom" variants={fadeUp}>
              <div className="hero__lead">
                <p className="hero__desc">
                  I build fast, beautiful, and interactive web experiences.
                  Focused on clean code, smooth motion, and pixel-perfect interfaces
                  that make a lasting impression.
                </p>
                <div className="hero__actions">
                  <a href="#work" className="hero__btn">View selected work</a>
                  <a href="#certificate" className="hero__btn hero__btn--ghost">See certificates</a>
                  <a href={CV_URL} download className="hero__btn hero__btn--ghost">Download CV</a>
                </div>
                <ul className="hero__meta" aria-label="Profile highlights">
                  {HERO_DETAILS.map((item) => (
                    <li key={item.label}>
                      <span>{item.label}</span>
                      <strong>{item.value}</strong>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="hero__scroll">
                <span>Scroll</span>
                <div className="hero__scroll-line" />
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* ── Marquee ── */}
        <div className="marquee" aria-label="Skills marquee">
          <div className="marquee__track">
            {[...MARQUEE_WORDS, ...MARQUEE_WORDS].map((w, i) => (
              <span key={i}>{w}</span>
            ))}
          </div>
        </div>

        {/* ═══════════ ABOUT ═══════════ */}
        <motion.section
          id="about"
          className="section"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={stagger}
        >
          <motion.div className="section__header" variants={fadeUp}>
            <div>
              <span className="section__num">(01)</span>
              <h2 className="section__title">About me</h2>
            </div>
            <p className="section__desc">
              A glimpse into who I am and how I approach creative development.
            </p>
          </motion.div>

          <div className="about__grid">
            <motion.div className="about__text" variants={stagger}>
              <motion.p variants={fadeUp}>
                Hi, I'm Adrian Maulana — a web developer based in Indonesia
                who turns ideas into clean, modern interfaces that feel fast
                and intuitive. I've always been drawn to the intersection of
                design and engineering.
              </motion.p>
              <motion.p variants={fadeUp}>
                I focus on building responsive websites, component-driven UI,
                and smooth interactions with deep attention to accessibility,
                performance, and the small details that make a product feel
                truly premium.
              </motion.p>
              <motion.p variants={fadeUp}>
                Currently available for freelance projects and collaborations.
                Let's create something remarkable together.
              </motion.p>

              <motion.div className="about__stats" variants={stagger}>
                {[
                  { value: '6+', label: 'Projects shipped' },
                  { value: '100%', label: 'Satisfaction rate' },
                  { value: '24h', label: 'Response time' },
                  { value: '∞', label: 'Attention to detail' },
                ].map((stat) => (
                  <motion.div key={stat.label} className="stat-card" variants={fadeUp}>
                    <div className="stat-card__value">{stat.value}</div>
                    <div className="stat-card__label">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div className="about__highlights" variants={fadeUp}>
              <div className="about__photo" aria-label="Profile photo">
                <img src={PROFILE_IMAGE_URL} alt="Adrian Maulana" loading="lazy" decoding="async" />
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* ═══════════ WORK ═══════════ */}
        <motion.section
          id="work"
          className="section"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={stagger}
        >
          <motion.div className="section__header" variants={fadeUp}>
            <div>
              <span className="section__num">(02)</span>
              <h2 className="section__title">Selected work</h2>
            </div>
            <p className="section__desc">
              A curated selection of projects I've designed and built.
            </p>
          </motion.div>

          <motion.div className="projects" variants={stagger}>
            {PROJECTS.map((p, idx) => (
              <motion.a
                key={p.title}
                className="project-row"
                href="#"
                variants={fadeUp}
                onMouseMove={(e) => onProjectMove(e, idx)}
                onMouseLeave={() => setActiveProject(null)}
              >
                <span className="project-row__num">0{idx + 1}</span>
                <span className="project-row__title">{p.title}</span>
                <span className="project-row__meta">{p.meta}</span>
                <span className="project-row__year">{p.year}</span>
                <span className="project-row__arrow">↗</span>
                <span className="project-row__line" />
              </motion.a>
            ))}
          </motion.div>
        </motion.section>

        {/* ═══════════ SKILLS ═══════════ */}
        <motion.section
          id="skills"
          className="section skills-section"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
        >
          <motion.div className="section__header" variants={fadeUp}>
            <div>
              <span className="section__num">(03)</span>
              <h2 className="section__title">Tech & tools</h2>
            </div>
            <p className="section__desc">
              The stack I use to design, build, and ship.
            </p>
          </motion.div>

          <motion.div variants={fadeUp}>
            <div className="skills-row">
              {[...SKILLS, ...SKILLS].map((s, i) => (
                <div key={`a-${i}`} className="skill-tag">
                  <span className="skill-tag__icon">
                    <img src={s.logo} alt={s.name} loading="lazy" />
                  </span>
                  <span className="skill-tag__name">{s.name}</span>
                </div>
              ))}
            </div>
            <div className="skills-row skills-row--reverse">
              {[...SKILLS.slice().reverse(), ...SKILLS.slice().reverse()].map((s, i) => (
                <div key={`b-${i}`} className="skill-tag">
                  <span className="skill-tag__icon">
                    <img src={s.logo} alt={s.name} loading="lazy" />
                  </span>
                  <span className="skill-tag__name">{s.name}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.section>

        {/* ═══════════ CERTIFICATE ═══════════ */}
        <motion.section
          id="certificate"
          className="section"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
        >
          <motion.div className="section__header" variants={fadeUp}>
            <div>
              <span className="section__num">(04)</span>
              <h2 className="section__title">Certificates</h2>
            </div>
            <p className="section__desc">
              A selection of certifications that support my frontend journey.
            </p>
          </motion.div>

          <motion.div className="certificate-grid" variants={stagger}>
            {CERTIFICATES.map((cert) => (
              <motion.a
                key={cert.title}
                className="certificate-card"
                variants={fadeUp}
                href={cert.image}
                target="_blank"
                rel="noreferrer"
                aria-label={`${cert.title} certificate`}
              >
                <div className="certificate-card__media" aria-hidden="true">
                  <img src={cert.image} alt="" loading="lazy" />
                </div>
                <div className="certificate-card__top">
                  <span>{cert.category}</span>
                  <span>{cert.year}</span>
                </div>
                <h3>{cert.title}</h3>
                <p>Issued by {cert.issuer}</p>
              </motion.a>
            ))}
          </motion.div>
        </motion.section>

        {/* ═══════════ SERVICES ═══════════ */}
        <motion.section
          id="services"
          className="section"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
        >
          <motion.div className="section__header" variants={fadeUp}>
            <div>
              <span className="section__num">(04)</span>
              <h2 className="section__title">What I do</h2>
            </div>
          </motion.div>

          <motion.div className="services-list" variants={stagger}>
            {SERVICES.map((s, i) => (
              <motion.div key={s.title} className="service-item" variants={fadeUp}>
                <span className="service-item__num">0{i + 1}</span>
                <div>
                  <div className="service-item__title">{s.title}</div>
                  <div className="service-item__desc">{s.desc}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* ═══════════ CONTACT ═══════════ */}
        <motion.section
          id="contact"
          className="section contact"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
        >
          <motion.div className="eyebrow" variants={fadeUp}>(05) Contact</motion.div>
          <motion.h2 className="contact__title" variants={fadeUp}>
            Let's work<br />together
          </motion.h2>
          <motion.p className="contact__subtitle" variants={fadeUp}>
            Have a project in mind? I'd love to hear about it.
            I typically reply within 24 hours.
          </motion.p>

          <motion.form className="contactForm" variants={fadeUp} onSubmit={onContactSubmit}>
            <div className="contactForm__grid">
              <label className="field">
                <span className="field__label">Name</span>
                <input
                  value={contactForm.name}
                  onChange={(e) => setContactForm((s) => ({ ...s, name: e.target.value }))}
                  name="name"
                  autoComplete="name"
                  required
                />
              </label>

              <label className="field">
                <span className="field__label">Email</span>
                <input
                  value={contactForm.email}
                  onChange={(e) => setContactForm((s) => ({ ...s, email: e.target.value }))}
                  name="email"
                  autoComplete="email"
                  type="email"
                  required
                />
              </label>
            </div>

            <label className="field">
              <span className="field__label">Message</span>
              <textarea
                value={contactForm.message}
                onChange={(e) => setContactForm((s) => ({ ...s, message: e.target.value }))}
                name="message"
                rows={5}
                required
              />
            </label>

            <div className="contactForm__actions">
              <button ref={magBtnRef} className="formBtn" type="submit" onMouseMove={onMagMove} onMouseLeave={onMagLeave}>
                Send message
              </button>
              <a className="formLink" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            </div>
          </motion.form>

          <motion.div className="contact__links" variants={fadeUp}>
            {SOCIALS.map((s) => (
              <a key={s.label} className="contact__link" href={s.href} aria-label={s.label}>
                <span className="contact__icon" aria-hidden="true">{s.icon}</span>
                <span>{s.label}</span>
              </a>
            ))}
          </motion.div>
        </motion.section>
          </>
        )}
      </main>

      {/* ═══════════ FOOTER ═══════════ */}
      <footer className="footer">
        <div className="footer__left">
          <div className="footer__brand">© {new Date().getFullYear()} Adrian Maulana</div>
          <div className="footer__meta">{currentTime} WIB</div>
        </div>

        <div className="footer__mid" aria-label="Footer links">
          <a className="footer__link" href="#about">About</a>
          <a className="footer__link" href="#work">Work</a>
          <a className="footer__link" href="#skills">Skills</a>
          <a className="footer__link" href="#certificate">Certificate</a>
          <a className="footer__link" href="#contact">Contact</a>
        </div>

        <div className="footer__right">
          <div className="footer__social" aria-label="Social">
            {SOCIALS.map((s) => (
              <a key={s.label} className="footer__socialLink" href={s.href} aria-label={s.label}>
                <span aria-hidden="true">{s.icon}</span>
              </a>
            ))}
          </div>
          <button
            className="footer__back"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            type="button"
          >
            ↑ Back to top
          </button>
        </div>
      </footer>
    </div>
  )
}

export default App
