import { useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import './Contact.css'

export default function Contact() {
  const ref = useScrollReveal()
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = e => {
    e.preventDefault()
    const subject = encodeURIComponent(`Portfolio Contact: ${form.name}`)
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)
    window.open(`mailto:adityau24092003@gmail.com?subject=${subject}&body=${body}`)
    setSent(true)
    setTimeout(() => setSent(false), 4000)
  }

  return (
    <section className="contact" id="contact" ref={ref}>
      <div className="contact-bg">
        <div className="contact-orb" />
      </div>

      <div className="container">
        <div className="contact-grid">
          <div className="contact-left">
            <div className="section-line fade-in" />
            <h2 className="section-title fade-in fade-in-delay-1">Let's Connect</h2>
            <p className="contact-bio fade-in fade-in-delay-2">
              I'm actively looking for <strong>SWE and Cloud Engineering roles</strong>.
              Whether you have a project to discuss, a role to share, or just want to talk tech, my inbox is open.
            </p>

            <div className="contact-links fade-in fade-in-delay-3">
              <a href="mailto:adityau24092003@gmail.com" className="contact-link">
                <div className="contact-link-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 7 10-7"/>
                  </svg>
                </div>
                <div>
                  <span className="contact-link-label">Email</span>
                  <span className="contact-link-value">adityau24092003@gmail.com</span>
                </div>
              </a>

              <a href="https://linkedin.com/in/aditya-upadhyay2423" target="_blank" rel="noreferrer" className="contact-link">
                <div className="contact-link-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </div>
                <div>
                  <span className="contact-link-label">LinkedIn</span>
                  <span className="contact-link-value">in/aditya-upadhyay2423</span>
                </div>
              </a>

              <a href="https://github.com/AdityaU101" target="_blank" rel="noreferrer" className="contact-link">
                <div className="contact-link-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                </div>
                <div>
                  <span className="contact-link-label">GitHub</span>
                  <span className="contact-link-value">AdityaU101</span>
                </div>
              </a>
            </div>
          </div>

          <div className="contact-right fade-in fade-in-delay-3">
            <form className="contact-form" onSubmit={handleSubmit}>
              <h3 className="form-title">Send a Message</h3>

              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="What's on your mind?"
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" className={`btn btn-primary form-submit ${sent ? 'sent' : ''}`}>
                {sent ? (
                  <>✓ Opening email client…</>
                ) : (
                  <>
                    Send Message
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
                    </svg>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      <footer className="site-footer">
        <div className="container footer-inner">
          <span className="footer-logo">
            <span className="logo-bracket">&lt;</span>AU<span className="logo-bracket">/&gt;</span>
          </span>
          <span className="footer-copy">
            © {new Date().getFullYear()} Aditya Upadhyay. Built with React + Vite.
          </span>
          <a href="#hero" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }} className="footer-top">
            Back to top ↑
          </a>
        </div>
      </footer>
    </section>
  )
}
