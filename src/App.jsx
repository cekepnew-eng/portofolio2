import { useEffect, useMemo, useRef, useState, useCallback } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import './App.css'

/* ── Data ──────────────────────────────────────────── */
const PROJECTS = [
  {
    title: 'Project One',
    meta: 'UMKM · UI/UX · Frontend',
    year: '2025',
    preview: 'preview--1',
    image: '/project-1.jpg',
  },
  {
    title: 'Project Two',
    meta: 'Laporan · SistemLaporan · Web app',
    year: '2025',
    preview: 'preview--2',
    image: '/sistemprojek.jpg',
  },
  {
    title: 'Project Three',
    meta: 'UMKM · UI/UX · FRONTEND-BACKEND',
    year: '2026',
    preview: 'preview--3',
    image: '/bbcprojek.jpg',
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
    const vw = window.innerWidth
    const vh = window.innerHeight
    const previewW = Math.min(420, vw * 0.35, 360)
    const previewH = Math.min(300, vh * 0.25, 240)
    let x = e.clientX + 24
    let y = e.clientY - previewH / 2
    if (x + previewW > vw - 16) x = e.clientX - previewW - 24
    if (y < 16) y = 16
    if (y + previewH > vh - 16) y = vh - previewH - 16
    setPreviewPos({ x, y })
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
            style={{ left: previewPos.x, top: previewPos.y, position: 'fixed' }}
            initial={{ opacity: 0, scale: 0.6, rotate: -3 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.7, rotate: 3 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
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
            <span className="brand__mark" aria-hidden="true">
              <svg viewBox="0 0 48 48" width="28" height="28" focusable="false" aria-hidden="true">
                <path
                  d="M12 35V13h9.3c6.2 0 10.3 3.6 10.3 9.1 0 5.6-4.1 9.2-10.3 9.2H18.6V35H12zm6.6-9.1h2.6c3 0 4.8-1.4 4.8-3.7 0-2.2-1.8-3.6-4.8-3.6h-2.6v7.3z"
                  fill="currentColor"
                />
                <path
                  d="M26.8 35l8.3-22h6.9L34 35h-7.2zm10.8-6.9l-2.2-6.5-2.3 6.5h4.5z"
                  fill="currentColor"
                  opacity="0.72"
                />
              </svg>
            </span>
            <span className="brand__text">Adrian Maulana</span>
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
        {/* ═══════════ HERO (Pinned) ═══════════ */}
        <div className="heroWrap">
          <section className="hero hero--sticky">
            <div className="hero__bg" aria-hidden="true">
              <div className="hero__nebula" aria-hidden="true" />
              <div className="hero__stars" aria-hidden="true" />
              <div className="hero__shootingStar" aria-hidden="true" />
              <div className="hero__shootingStar" aria-hidden="true" />
              <div className="hero__shootingStar" aria-hidden="true" />
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
                  {splitText('WEB DEVELOPER')}
                </motion.span>
                <motion.span className="hero__title-line hero__title-line--stroke" variants={stagger} initial="hidden" animate="show">
                  {splitText('& DESIGNER')}
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
              </motion.div>
            </motion.div>
          </section>
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
                {/* Mobile thumbnail - visible on touch devices */}
                <span className="project-row__thumb">
                  <img src={p.image} alt={p.title} loading="lazy" />
                </span>
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
          variants={stagger}modern
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
        <div className="footer__main">
          {/* Brand Column */}
          <div className="footer__brandCol">
            <div className="footer__logoBox">
              <span className="footer__logo" aria-hidden="true">
                <svg viewBox="0 0 48 48" width="32" height="32" focusable="false">
                  <path d="M14 32V16h8c5 0 8 3 8 7 0 4-3 7-8 7h-4v2H14zm5-5h3c2 0 3-1 3-2 0-1-1-2-3-2h-3v4z" fill="currentColor"/>
                  <path d="M26 32l7-18h6l-6 18h-7z" fill="currentColor" opacity="0.7"/>
                </svg>
              </span>
              <span className="footer__brandName">Adrian Maulana</span>
            </div>
            <p className="footer__tagline">Creative Developer crafting digital experiences.</p>

            <div className="footer__socialRow" aria-label="Social links">
              {SOCIALS.map((s) => (
                <a key={s.label} className="footer__socialIcon" href={s.href} aria-label={s.label}>
                  <span aria-hidden="true">{s.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Links Grid */}
          <div className="footer__linksGrid">
            <div className="footer__linksCol">
              <h4 className="footer__colTitle">Navigation</h4>
              <a className="footer__colLink" href="#about">About</a>
              <a className="footer__colLink" href="#work">Work</a>
              <a className="footer__colLink" href="#skills">Skills</a>
              <a className="footer__colLink" href="#certificate">Certificates</a>
              <a className="footer__colLink" href="#contact">Contact</a>
            </div>

            <div className="footer__linksCol">
              <h4 className="footer__colTitle">Contact</h4>
              <a className="footer__contactRow" href="mailto:adrianmaulana@email.com">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                <span>{CONTACT_EMAIL}</span>
              </a>
              <a className="footer__contactRow" href="tel:+6282123368495">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                <span>0821 2336 8495</span>
              </a>
              <div className="footer__contactRow">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                <span>Pintu Ledeng</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer__bar">
          <div className="footer__copy">
            © {new Date().getFullYear()} Adrian Maulana. All rights reserved.
          </div>
          <div className="footer__time">
            {currentTime} WIB
          </div>
          <button
            className="footer__back"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            type="button"
            aria-label="Back to top"
          >
            <span>↑</span>
          </button>
        </div>
      </footer>
    </div>
  )
}

export default App
