export type MotifKind =
  | 'graph' | 'ranges' | 'network' | 'diff' | 'signal' | 'pipeline' | 'scatter'
  | 'ledger' | 'shelves' | 'verse' | 'checks' | 'swatch' | 'dial' | 'notebook'
  | 'split' | 'tokens' | 'brackets' | 'gauge'

export type Domain = 'AI systems' | 'Cloud & data' | 'Machine learning' | 'Web apps' | 'Practice'

export interface Project {
  id: string
  title: string
  blurb: string
  domain: Domain
  stack: string[]
  motif: MotifKind
  repo: string
  /**
   * Live demo URL. Leave null until the site is deployed; the card then
   * links to the source instead of a dead address. Fill these in after
   * each Vercel import (see DEPLOY.md).
   */
  demo: string | null
  featured?: boolean
}

const GH = 'https://github.com/AdityaU101'
const P = `${GH}/Projects/tree/main`

export const projects: Project[] = [
  {
    id: 'cloudarch',
    title: 'CloudArch',
    blurb:
      'Describe an application in plain English and get a full cloud design for AWS, Azure or Google Cloud: diagram, Terraform, Kubernetes manifests, CI/CD, cost estimate and a STRIDE threat model.',
    domain: 'AI systems',
    stack: ['TypeScript', 'React', 'Express', 'Groq', 'PostgreSQL'],
    motif: 'graph',
    repo: `${GH}/CloudArch`,
    demo: 'https://cloudarch-ebon.vercel.app/',
    featured: true,
  },
  {
    id: 'clearchart',
    title: 'ClearChart',
    blurb:
      'Turns a lab report or discharge summary into a plain-English explanation, with out-of-range values flagged and every claim grounded in cited clinical guidelines.',
    domain: 'AI systems',
    stack: ['Python', 'FastAPI', 'Hybrid RAG', 'Redis', 'PostgreSQL'],
    motif: 'ranges',
    repo: `${GH}/SecondOpinion`,
    demo: 'https://clear-chart.vercel.app/',
    featured: true,
  },
  {
    id: 'linkedin-assistant',
    title: 'LinkedIn Assistant',
    blurb:
      'An explainable job-matching framework on open-weight LLMs. Upload a resume, get ranked jobs with matched and missing skills, each cited back to the source text and inspectable in a knowledge graph.',
    domain: 'AI systems',
    stack: ['Python', 'Open-weight LLMs', 'QLoRA', 'Neo4j', 'FAISS'],
    motif: 'network',
    repo: `${GH}/LinkedIn-Conversational-Assistant`,
    demo: null,
    featured: true,
  },
  {
    id: 'pr-review',
    title: 'PR Code Review Assistant',
    blurb:
      'A small microservice system that fetches a pull request, analyses the diff and returns review feedback, built on a FastAPI gateway with Redis and PostgreSQL.',
    domain: 'AI systems',
    stack: ['Python', 'FastAPI', 'Redis', 'PostgreSQL', 'React'],
    motif: 'diff',
    repo: `${P}/pr-code-review-assistant`,
    demo: 'https://pr-code-review-assistant.vercel.app/',
    featured: true,
  },
  {
    id: 'vm-selection',
    title: 'ML-Driven VM Instance Selection',
    blurb:
      'A two-stage XGBoost pipeline that recommends the most cost-efficient EC2 instance type for a workload, with roughly 18% lower cost than baseline selection.',
    domain: 'Machine learning',
    stack: ['Python', 'XGBoost', 'scikit-learn', 'AWS EC2'],
    motif: 'gauge',
    repo: `${P}/ML%20Driven%20VM%20Instance%20Selection%20for%20Cloud%20Workloads`,
    demo: 'https://ml-driven-vm-instance-selection.vercel.app/',
  },
  {
    id: 'drowsiness',
    title: 'Drowsiness Detection System',
    blurb:
      'Real-time driver fatigue detection. Tracks eye aspect ratio from a webcam feed against a personal calibration baseline and raises an alert when it drops.',
    domain: 'Machine learning',
    stack: ['Python', 'Flask', 'OpenCV', 'dlib', 'React'],
    motif: 'signal',
    repo: `${P}/Drowsiness%20Detection%20System`,
    demo: 'https://drowsiness-detection-beta.vercel.app/',
  },
  {
    id: 'data-at-scale',
    title: 'Data Processing at Scale',
    blurb:
      'Graph analytics on NYC taxi trips. A Kafka stream feeds Neo4j on Kubernetes, where PageRank and breadth-first search run over the trip graph.',
    domain: 'Cloud & data',
    stack: ['Kafka', 'Neo4j', 'Kubernetes', 'Docker', 'Python'],
    motif: 'pipeline',
    repo: `${P}/Data%20Processing%20at%20Scale%20Sem%20Project`,
    demo: 'https://dps-project-dusky.vercel.app/',
  },
  {
    id: 'loan-management',
    title: 'Loan Management System',
    blurb:
      'Loan lifecycle management across banks, branches, customers, loans, payments and approvals, behind a React dashboard and a Node and MySQL API.',
    domain: 'Web apps',
    stack: ['React', 'TypeScript', 'Express', 'MySQL'],
    motif: 'ledger',
    repo: `${P}/Loan-Management-System`,
    demo: 'https://loan-management-system-mocha.vercel.app/',
  },
  {
    id: 'inventory',
    title: 'Inventory Management',
    blurb:
      'An inventory tracker for small teams: items, categories, suppliers and transactions with Google sign-in, real-time sync and CSV export.',
    domain: 'Web apps',
    stack: ['React', 'Firebase', 'Vite'],
    motif: 'shelves',
    repo: `${P}/Inventory%20Management%20App`,
    demo: 'https://inventory-management-system-xi-umber.vercel.app/',
  },
  {
    id: 'poetry-haven',
    title: 'Poetry Haven',
    blurb: 'A poetry discovery front end with search, featured poets and genre browsing.',
    domain: 'Web apps',
    stack: ['React', 'CSS'],
    motif: 'verse',
    repo: `${P}/Poetry%20Haven%20Website`,
    demo: 'https://poetry-haven-website.vercel.app/',
  },
  {
    id: 'todo',
    title: 'ToDo List',
    blurb: 'A persistent task manager. Add, complete and delete, saved in the browser.',
    domain: 'Web apps',
    stack: ['React'],
    motif: 'checks',
    repo: `${P}/ToDo_List`,
    demo: null,
  },
  {
    id: 'color-flipper',
    title: 'Color Flipper',
    blurb: 'A colour toy that flips the page through named and hex colours.',
    domain: 'Web apps',
    stack: ['JavaScript'],
    motif: 'swatch',
    repo: `${P}/Color%20Flipper`,
    demo: null,
  },
  {
    id: 'counter',
    title: 'Counter App',
    blurb: 'The smallest possible app, done carefully: increment, decrement, reset.',
    domain: 'Web apps',
    stack: ['JavaScript'],
    motif: 'dial',
    repo: `${P}/CounterApp`,
    demo: null,
  },
  {
    id: 'ml-notebooks',
    title: 'ML Notebooks',
    blurb:
      'Nine scikit-learn notebooks, from data cleaning and linear regression through to classification and house-price prediction.',
    domain: 'Machine learning',
    stack: ['Python', 'scikit-learn', 'pandas'],
    motif: 'notebook',
    repo: `${GH}/ML_Projects`,
    demo: null,
  },
  {
    id: 'diabetes',
    title: 'Diabetes Prediction',
    blurb: 'A support vector classifier on standardised patient measurements.',
    domain: 'Machine learning',
    stack: ['Python', 'scikit-learn', 'SVM'],
    motif: 'split',
    repo: `${GH}/ML_Projects/blob/main/Diabetes_prediction.ipynb`,
    demo: null,
  },
  {
    id: 'loan-prediction',
    title: 'Loan Approval Prediction',
    blurb: 'A support vector classifier that predicts loan approval from applicant details.',
    domain: 'Machine learning',
    stack: ['Python', 'scikit-learn', 'SVM'],
    motif: 'scatter',
    repo: `${GH}/ML_Projects/blob/main/Loan_Prediction.ipynb`,
    demo: null,
  },
  {
    id: 'fake-news',
    title: 'Fake News Classifier',
    blurb: 'TF-IDF features and logistic regression to label news articles as real or fake.',
    domain: 'Machine learning',
    stack: ['Python', 'scikit-learn', 'NLTK'],
    motif: 'tokens',
    repo: `${GH}/ML_Projects/blob/main/Fake_news.ipynb`,
    demo: null,
  },
  {
    id: 'leetcode',
    title: 'LeetCode Solutions',
    blurb: '141 solutions in Java and Python, one problem at a time.',
    domain: 'Practice',
    stack: ['Java', 'Python'],
    motif: 'brackets',
    repo: `${GH}/Programs`,
    demo: null,
  },
]

export const domains: Domain[] = ['AI systems', 'Cloud & data', 'Machine learning', 'Web apps', 'Practice']
