import { useScrollReveal } from '../hooks/useScrollReveal'
import './Experience.css'

const experiences = [
  {
    type: 'work',
    title: 'Graduate Student Assistant',
    org: 'Arizona State University',
    location: 'Tempe, AZ · On-site',
    period: 'Jan 2026 – Present',
    current: true,
    description: 'Grading programming assignments, design documents, and exams for CSE 460 (Software Design). Evaluating student work on OOP principles, modularity, and code quality. Providing structured feedback on readability, correctness, and maintainability. Collaborating with course instructors to uphold grading standards and reinforce clean code best practices.',
    tags: ['Object Oriented Design', 'Analytical Skills', 'Software Design', 'Java'],
    icon: '🏫',
  },
  {
    type: 'work',
    title: 'Software Engineer',
    org: 'Spirea Arch',
    location: 'Bengaluru, India · Hybrid',
    period: 'Jun 2024 – Aug 2024',
    current: false,
    description: 'Designed and developed responsive frontend components using ReactJS. Collaborated with backend developers for seamless API integration. Applied modular and reusable coding practices to improve scalability and maintainability.',
    tags: ['ReactJS', 'Node.js', 'API Integration', 'Software Construction'],
    icon: '💼',
  },
  {
    type: 'education',
    title: 'M.S. Computer Science',
    org: 'Arizona State University',
    location: 'Tempe, AZ',
    period: 'Aug 2025 – May 2027',
    current: false,
    description: 'Specializing in cloud infrastructure, distributed systems, and machine learning. Coursework includes Data Processing at Scale, ML systems, and advanced algorithms.',
    tags: ['Cloud', 'ML', 'Distributed Systems'],
    icon: '🎓',
  },
]

export default function Experience() {
  const ref = useScrollReveal()

  return (
    <section className="experience" id="experience" ref={ref}>
      <div className="container">
        <div className="section-line fade-in" />
        <h2 className="section-title fade-in fade-in-delay-1">Experience & Education</h2>
        <p className="section-subtitle fade-in fade-in-delay-2">
          My academic journey and professional milestones.
        </p>

        <div className="timeline">
          {experiences.map((item, i) => (
            <TimelineItem key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function TimelineItem({ item, index }) {
  return (
    <div className={`timeline-item fade-in fade-in-delay-${Math.min(index + 1, 5)}`}>
      <div className="timeline-icon-col">
        <div className={`timeline-dot ${item.current ? 'current' : ''}`}>
          <span>{item.icon}</span>
        </div>
        <div className="timeline-line" />
      </div>

      <div className="timeline-content">
        <div className="timeline-header">
          <div>
            <h3 className="timeline-title">{item.title}</h3>
            <div className="timeline-org">
              <span className="org-name">{item.org}</span>
              <span className="org-sep">·</span>
              <span className="org-location">{item.location}</span>
            </div>
          </div>
          <div className="timeline-meta">
            <span className="timeline-period">{item.period}</span>
            {item.current && <span className="current-badge">Current</span>}
          </div>
        </div>

        <p className="timeline-desc">{item.description}</p>

        <div className="timeline-tags">
          {item.tags.map(t => (
            <span className="tag" key={t}>{t}</span>
          ))}
        </div>

      </div>
    </div>
  )
}
