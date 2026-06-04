import { useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import './Projects.css'

const projects = [
  {
    title: 'ML Driven VM Instance Selection',
    description:
      'Intelligent cloud resource allocation using ML to match workloads to optimal EC2 instance types, achieving ~18% cost-efficiency gain through SAR-based clustering.',
    tags: ['Python', 'AWS EC2', 'scikit-learn', 'Cloud', 'ML'],
    domain: 'Cloud / ML',
    icon: '☁️',
    highlight: true,
    link: 'https://github.com/AdityaU101/Projects/tree/main/ML%20Driven%20VM%20Instance%20Selection%20for%20Cloud%20Workloads',
  },
  {
    title: 'PR Code Review Assistant',
    description:
      'AI-powered tool that integrates with GitHub workflows to automatically analyze pull requests, surface feedback, and reduce review turnaround time.',
    tags: ['Python', 'GitHub API', 'AI', 'DevTools'],
    domain: 'DevTools / AI',
    icon: '🤖',
    highlight: true,
    link: 'https://github.com/AdityaU101/Projects/tree/main/pr-code-review-assistant',
  },
  {
    title: 'Drowsiness Detection System',
    description:
      'Real-time driver fatigue detection using computer vision. Tracks Eye Aspect Ratio (EAR) with dlib\'s shape predictor to trigger alerts before microsleep.',
    tags: ['Python', 'OpenCV', 'dlib', 'Computer Vision'],
    domain: 'Computer Vision',
    icon: '👁️',
    highlight: true,
    link: 'https://github.com/AdityaU101/Projects/tree/main/Drowsiness%20Detection%20System',
  },
  {
    title: 'Inventory Management App',
    description:
      'Full-stack inventory system with real-time tracking, CRUD operations, and an integrated PR Code Review Assistant for development workflow.',
    tags: ['React', 'Node.js', 'MongoDB', 'Full-Stack'],
    domain: 'Full-Stack',
    icon: '📦',
    link: 'https://github.com/AdityaU101/Projects/tree/main/Inventory%20Management%20App',
  },
  {
    title: 'Loan Management System',
    description:
      'End-to-end loan lifecycle management system with user authentication, loan application workflows, and admin dashboard.',
    tags: ['Node.js', 'Express', 'MySQL', 'Full-Stack'],
    domain: 'Full-Stack',
    icon: '💰',
    link: 'https://github.com/AdityaU101/Projects/tree/main/Loan-Management-System',
  },
  {
    title: 'Data Processing at Scale',
    description:
      'Semester project exploring large-scale data pipelines with distributed processing, covering ingestion, transformation, and analytics on big datasets.',
    tags: ['Python', 'Spark', 'Pandas', 'Data Engineering'],
    domain: 'Data Engineering',
    icon: '📊',
    link: 'https://github.com/AdityaU101/Projects/tree/main/Data%20Processing%20at%20Scale%20Sem%20Project',
  },
]

const FILTERS = ['All', 'Cloud / ML', 'DevTools / AI', 'Computer Vision', 'Full-Stack', 'Data Engineering']

export default function Projects() {
  const [filter, setFilter] = useState('All')
  const ref = useScrollReveal()

  const filtered = filter === 'All' ? projects : projects.filter(p => p.domain === filter)

  return (
    <section className="projects" id="projects" ref={ref}>
      <div className="container">
        <div className="section-header fade-in">
          <div className="section-line" />
          <h2 className="section-title fade-in fade-in-delay-1">Featured Projects</h2>
          <p className="section-subtitle fade-in fade-in-delay-2">
            A selection of what I've built — from ML systems to full-stack apps.
          </p>
        </div>

        <div className="filter-bar fade-in fade-in-delay-2">
          {FILTERS.map(f => (
            <button
              key={f}
              className={`filter-btn ${filter === f ? 'active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="projects-grid">
          {filtered.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>

        <div className="projects-footer fade-in">
          <a
            href="https://github.com/AdityaU101/Projects"
            target="_blank"
            rel="noreferrer"
            className="btn btn-secondary"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
            View All on GitHub
          </a>
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ project, index }) {
  return (
    <a
      href={project.link}
      target="_blank"
      rel="noreferrer"
      className={`project-card fade-in fade-in-delay-${Math.min(index + 1, 5)} ${project.highlight ? 'featured' : ''}`}
    >
      {project.highlight && <span className="featured-badge">Featured</span>}
      <div className="project-icon">{project.icon}</div>
      <div className="project-domain">{project.domain}</div>
      <h3 className="project-title">{project.title}</h3>
      <p className="project-desc">{project.description}</p>
      <div className="project-tags">
        {project.tags.map(t => (
          <span className="tag" key={t}>{t}</span>
        ))}
      </div>
      <div className="project-link">
        View on GitHub
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M7 17L17 7M17 7H7M17 7v10"/>
        </svg>
      </div>
    </a>
  )
}
