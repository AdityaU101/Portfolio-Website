import { useScrollReveal } from '../hooks/useScrollReveal'
import './Skills.css'

const skillGroups = [
  {
    category: 'Languages',
    icon: '💻',
    skills: [
      { name: 'Python', level: 95, color: '#3b82f6' },
      { name: 'JavaScript', level: 85, color: '#f59e0b' },
      { name: 'Java', level: 80, color: '#ef4444' },
      { name: 'C / C++', level: 70, color: '#8b5cf6' },
      { name: 'Bash', level: 72, color: '#10b981' },
    ],
  },
  {
    category: 'Frontend',
    icon: '🎨',
    skills: [
      { name: 'React.js', level: 85, color: '#06b6d4' },
      { name: 'HTML5 / CSS3', level: 90, color: '#f97316' },
      { name: 'TypeScript', level: 70, color: '#3b82f6' },
      { name: 'Bootstrap', level: 80, color: '#8b5cf6' },
    ],
  },
  {
    category: 'Backend & DB',
    icon: '⚙️',
    skills: [
      { name: 'Node.js', level: 82, color: '#22c55e' },
      { name: 'Express.js', level: 80, color: '#94a3b8' },
      { name: 'MySQL', level: 78, color: '#3b82f6' },
      { name: 'MongoDB', level: 75, color: '#22c55e' },
    ],
  },
  {
    category: 'Cloud & DevOps',
    icon: '☁️',
    skills: [
      { name: 'AWS (EC2, S3)', level: 85, color: '#f59e0b' },
      { name: 'GCP', level: 70, color: '#4285f4' },
      { name: 'Docker', level: 75, color: '#06b6d4' },
      { name: 'GitHub Actions', level: 78, color: '#94a3b8' },
    ],
  },
  {
    category: 'ML / CV',
    icon: '🤖',
    skills: [
      { name: 'scikit-learn', level: 88, color: '#f97316' },
      { name: 'TensorFlow', level: 72, color: '#ef4444' },
      { name: 'OpenCV', level: 80, color: '#22c55e' },
      { name: 'Pandas / NumPy', level: 90, color: '#3b82f6' },
    ],
  },
  {
    category: 'Tools',
    icon: '🛠️',
    skills: [
      { name: 'Git / GitHub', level: 92, color: '#94a3b8' },
      { name: 'VS Code', level: 95, color: '#06b6d4' },
      { name: 'Apache Spark', level: 68, color: '#f97316' },
      { name: 'Linux / Bash', level: 78, color: '#22c55e' },
    ],
  },
]

export default function Skills() {
  const ref = useScrollReveal()

  return (
    <section className="skills" id="skills" ref={ref}>
      <div className="container">
        <div className="section-line fade-in" />
        <h2 className="section-title fade-in fade-in-delay-1">Skills & Tech Stack</h2>
        <p className="section-subtitle fade-in fade-in-delay-2">
          Technologies I work with across the full stack and beyond.
        </p>

        <div className="skills-grid">
          {skillGroups.map((group, gi) => (
            <div
              key={group.category}
              className={`skill-group fade-in fade-in-delay-${Math.min(gi + 1, 5)}`}
            >
              <div className="skill-group-header">
                <span className="skill-icon">{group.icon}</span>
                <h3 className="skill-category">{group.category}</h3>
              </div>
              <div className="skill-list">
                {group.skills.map(skill => (
                  <SkillBar key={skill.name} skill={skill} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function SkillBar({ skill }) {
  return (
    <div className="skill-row">
      <div className="skill-meta">
        <span className="skill-name">{skill.name}</span>
        <span className="skill-pct">{skill.level}%</span>
      </div>
      <div className="skill-track">
        <div
          className="skill-fill"
          style={{ '--fill-width': `${skill.level}%`, '--fill-color': skill.color }}
        />
      </div>
    </div>
  )
}
