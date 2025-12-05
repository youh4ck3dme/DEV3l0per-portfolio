import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  status: 'live' | 'development' | 'archived';
  year: string;
}

const projects: Project[] = [
  {
    id: '001',
    title: 'NEURAL_SYNC',
    description: 'Real-time collaborative code editor with AI-powered suggestions and syntax highlighting for 50+ languages.',
    tech: ['React', 'WebSocket', 'Monaco', 'GPT-4'],
    status: 'live',
    year: '2024',
  },
  {
    id: '002',
    title: 'VOID_COMMERCE',
    description: 'Headless e-commerce platform with brutalist design philosophy. 99.9% uptime, sub-100ms response times.',
    tech: ['Next.js', 'Stripe', 'PostgreSQL', 'Redis'],
    status: 'live',
    year: '2024',
  },
  {
    id: '003',
    title: 'QUANTUM_CMS',
    description: 'Content management system designed for developers who hate content management systems.',
    tech: ['TypeScript', 'GraphQL', 'Prisma', 'Vercel'],
    status: 'development',
    year: '2024',
  },
  {
    id: '004',
    title: 'DARK_ANALYTICS',
    description: 'Privacy-first analytics dashboard. No cookies, no tracking, just data.',
    tech: ['Go', 'ClickHouse', 'React', 'D3.js'],
    status: 'live',
    year: '2023',
  },
  {
    id: '005',
    title: 'CYBER_AUTH',
    description: 'Zero-knowledge authentication system with biometric integration and hardware key support.',
    tech: ['Rust', 'WebAuthn', 'ZK-SNARKs', 'HSM'],
    status: 'archived',
    year: '2023',
  },
];

export default function ProjectsSection() {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'live' | 'development' | 'archived'>('all');

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter((p) => p.status === filter);

  const statusColors = {
    live: '#00FF00',
    development: '#FFFF00',
    archived: '#888888',
  };

  return (
    <section id="projects" className="py-24 px-4 bg-[#0A0A0A]" data-testid="projects-section">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4"
        >
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[#444444]">
              PORTFOLIO
            </span>
            <h2 className="font-mono text-4xl md:text-5xl font-bold tracking-tighter text-[#EDEDED] mt-2">
              Selected Works
            </h2>
          </div>

          <div className="flex gap-2">
            {(['all', 'live', 'development', 'archived'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 font-mono text-xs uppercase tracking-widest border transition-colors ${
                  filter === status
                    ? 'bg-[#EDEDED] text-[#030303] border-[#EDEDED]'
                    : 'bg-transparent text-[#888888] border-[rgba(255,255,255,0.08)] hover:text-[#EDEDED]'
                }`}
                data-testid={`filter-${status}`}
              >
                {status}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="border-t border-[rgba(255,255,255,0.08)]">
          {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{
                  duration: 0.4,
                  ease: [0.16, 1, 0.3, 1],
                  delay: index * 0.05,
                }}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
                className="group border-b border-[rgba(255,255,255,0.08)] py-8 cursor-pointer hover-elevate"
                data-testid={`project-${project.id}`}
              >
                <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
                  <div className="flex items-center gap-4 md:w-24">
                    <span className="font-mono text-xs text-[#444444]">
                      {project.id}
                    </span>
                    <div
                      className="w-2 h-2"
                      style={{ backgroundColor: statusColors[project.status] }}
                    />
                  </div>

                  <div className="flex-1">
                    <h3 className="font-mono text-xl md:text-2xl font-bold tracking-tight text-[#EDEDED] mb-2 group-hover:text-[#00FFFF] transition-colors">
                      {project.title}
                    </h3>
                    <p className="font-mono text-sm text-[#888888] mb-4 max-w-2xl">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 font-mono text-xs uppercase tracking-widest text-[#444444] border border-[rgba(255,255,255,0.08)]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-4 md:w-32 justify-end">
                    <span className="font-mono text-xs text-[#444444]">
                      {project.year}
                    </span>
                    <motion.div
                      animate={{
                        x: hoveredProject === project.id ? 0 : -10,
                        opacity: hoveredProject === project.id ? 1 : 0,
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <ArrowRight className="w-5 h-5 text-[#00FFFF]" />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
