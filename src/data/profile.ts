export const profile = {
  name: 'Aditya Upadhyay',
  email: 'adityau24092003@gmail.com',
  github: 'https://github.com/AdityaU101',
  linkedin: 'https://linkedin.com/in/aditya-upadhyay2423',
  location: 'Tempe, Arizona',
}

export const about =
  'I am a graduate student in Computer Science at Arizona State University, working where cloud infrastructure meets machine learning. I like problems with a tangible result: a real-time vision pipeline, a model that picks cheaper cloud instances, a tool that explains a lab report. I am looking for full-time software and cloud engineering roles after I graduate in May 2027.'

export const capabilities: { group: string; items: string[] }[] = [
  { group: 'Languages', items: ['Python', 'TypeScript / JavaScript', 'Java', 'C / C++', 'Bash'] },
  { group: 'Cloud & DevOps', items: ['AWS (EC2, S3)', 'Google Cloud', 'Docker', 'Kubernetes', 'GitHub Actions'] },
  { group: 'Machine learning', items: ['scikit-learn', 'XGBoost', 'TensorFlow', 'OpenCV', 'pandas / NumPy'] },
  { group: 'Backend & data', items: ['Node.js / Express', 'FastAPI', 'PostgreSQL / MySQL', 'MongoDB', 'Kafka, Neo4j'] },
  { group: 'Frontend', items: ['React', 'Vite', 'Tailwind CSS', 'HTML / CSS'] },
  { group: 'Tools', items: ['Git / GitHub', 'Linux', 'VS Code', 'Apache Spark'] },
]

export const experience = [
  {
    period: 'Jan 2026 — Now',
    role: 'Graduate Student Assistant',
    org: 'Arizona State University',
    place: 'Tempe, AZ',
    text: 'Grade programming assignments, design documents and exams for CSE 460 (Software Design), with structured feedback on object-oriented design, modularity and code quality.',
  },
  {
    period: 'Aug 2025 — May 2027',
    role: 'M.S. Computer Science',
    org: 'Arizona State University',
    place: 'Tempe, AZ',
    text: 'Cloud infrastructure, distributed systems and machine learning. Coursework includes Data Processing at Scale.',
  },
  {
    period: 'Jun — Aug 2024',
    role: 'Software Engineer',
    org: 'Spirea Arch',
    place: 'Bengaluru, India',
    text: 'Built responsive React components and worked with backend developers on API integration, with an emphasis on modular, reusable code.',
  },
]
