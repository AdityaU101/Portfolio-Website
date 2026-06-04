import { useScrollReveal } from '../hooks/useScrollReveal'
import './About.css'

const stats = [
  { value: '10+', label: 'Projects Built' },
  { value: '5+', label: 'Tech Domains' },
]

export default function About() {
  const ref = useScrollReveal()

  return (
    <section className="about" id="about" ref={ref}>
      <div className="container">
        <div className="about-grid">
          <div className="about-text">
            <div className="section-line fade-in" />
            <h2 className="section-title fade-in fade-in-delay-1">About Me</h2>
            <p className="about-body fade-in fade-in-delay-2">
              I'm a graduate student in Computer Science at <strong>Arizona State University</strong>,
              specializing in cloud infrastructure and machine learning systems. My work sits at the
              intersection of <strong>intelligent systems</strong> and <strong>scalable engineering</strong> —
              building things that are both smart and production-ready.
            </p>
            <p className="about-body fade-in fade-in-delay-2">
              From real-time computer vision pipelines to ML-driven cloud cost optimization, I enjoy
              solving problems that have a tangible impact. I'm currently seeking <strong>full-time SWE
              and Cloud Engineering roles</strong> starting after my graduation in May 2027.
            </p>
            <div className="about-details fade-in fade-in-delay-3">
              <DetailRow icon="🎓" label="Arizona State University" sub="M.S. Computer Science · 2025 – 2027" />
              <DetailRow icon="📍" label="Tempe, Arizona" sub="Open to remote & relocation" />
              <DetailRow icon="📧" label="aupadh47@asu.edu" sub="Feel free to reach out" />
            </div>
          </div>

          <div className="about-right fade-in fade-in-delay-3">
            <div className="stats-grid">
              {stats.map(s => (
                <div className="stat-card" key={s.label}>
                  <span className="stat-value">{s.value}</span>
                  <span className="stat-label">{s.label}</span>
                </div>
              ))}
            </div>

            <div className="about-code-card">
              <div className="code-header">
                <div className="code-dots">
                  <span className="dot red" />
                  <span className="dot yellow" />
                  <span className="dot green" />
                </div>
                <span className="code-filename">aditya.json</span>
              </div>
              <pre className="code-body">{`{
  "focus": [
    "Cloud Engineering",
    "Machine Learning",
    "Full-Stack Dev"
  ],
  "looking_for": "SWE / Cloud roles",
  "available": true,
  "coffee": "always"
}`}</pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function DetailRow({ icon, label, sub }) {
  return (
    <div className="detail-row">
      <span className="detail-icon">{icon}</span>
      <div>
        <span className="detail-label">{label}</span>
        <span className="detail-sub">{sub}</span>
      </div>
    </div>
  )
}
