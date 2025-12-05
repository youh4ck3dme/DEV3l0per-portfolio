import { motion } from 'framer-motion';
import { Github, Twitter, Linkedin, Mail, MapPin, Calendar } from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  specialty: string;
  status: 'available' | 'busy' | 'away';
  avatar: string;
}

const team: TeamMember[] = [
  {
    id: 'dev-001',
    name: 'ALEX_VOID',
    role: 'Lead Developer',
    specialty: 'Full-Stack / Systems',
    status: 'available',
    avatar: 'AV',
  },
  {
    id: 'dev-002',
    name: 'MAYA_ROOT',
    role: 'Backend Architect',
    specialty: 'Distributed Systems',
    status: 'busy',
    avatar: 'MR',
  },
  {
    id: 'dev-003',
    name: 'KAI_BINARY',
    role: 'Frontend Engineer',
    specialty: 'React / WebGL',
    status: 'available',
    avatar: 'KB',
  },
  {
    id: 'dev-004',
    name: 'ZEN_PROTOCOL',
    role: 'DevOps Lead',
    specialty: 'Cloud / Security',
    status: 'away',
    avatar: 'ZP',
  },
];

const statusColors = {
  available: '#00FF00',
  busy: '#FF0000',
  away: '#FFFF00',
};

export default function DevelopersSection() {
  return (
    <section id="developers" className="py-24 px-4 bg-[#0A0A0A]" data-testid="developers-section">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12"
        >
          <span className="font-mono text-xs uppercase tracking-widest text-[#444444]">
            TEAM
          </span>
          <h2 className="font-mono text-4xl md:text-5xl font-bold tracking-tighter text-[#EDEDED] mt-2">
            Developers
          </h2>
          <p className="font-mono text-sm text-[#888888] mt-4 max-w-xl">
            A collective of code enthusiasts pushing the boundaries of digital experiences.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {team.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.4,
                ease: [0.16, 1, 0.3, 1],
                delay: index * 0.1,
              }}
              className="p-6 bg-[#030303] border border-[rgba(255,255,255,0.08)] hover-elevate"
              data-testid={`developer-${member.id}`}
            >
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 flex items-center justify-center border border-[rgba(255,255,255,0.08)] font-mono text-xl text-[#00FFFF] bg-[#0A0A0A]">
                  {member.avatar}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-mono text-lg font-bold tracking-tight text-[#EDEDED]">
                      {member.name}
                    </h3>
                    <div
                      className="w-2 h-2"
                      style={{ backgroundColor: statusColors[member.status] }}
                    />
                  </div>
                  <p className="font-mono text-sm text-[#00FFFF] mb-1">
                    {member.role}
                  </p>
                  <p className="font-mono text-xs text-[#888888]">
                    {member.specialty}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[rgba(255,255,255,0.08)] flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-widest text-[#444444]">
                  {member.status.toUpperCase()}
                </span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => console.log(`Github for ${member.name}`)}
                    className="text-[#888888] hover:text-[#EDEDED] transition-colors"
                    data-testid={`github-${member.id}`}
                  >
                    <Github className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => console.log(`Twitter for ${member.name}`)}
                    className="text-[#888888] hover:text-[#EDEDED] transition-colors"
                    data-testid={`twitter-${member.id}`}
                  >
                    <Twitter className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => console.log(`LinkedIn for ${member.name}`)}
                    className="text-[#888888] hover:text-[#EDEDED] transition-colors"
                    data-testid={`linkedin-${member.id}`}
                  >
                    <Linkedin className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
          className="mt-8 p-6 border border-[#00FF00]/20 bg-[#00FF00]/5"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h4 className="font-mono text-sm font-bold text-[#00FF00] mb-1">
                JOIN THE COLLECTIVE
              </h4>
              <p className="font-mono text-xs text-[#888888]">
                We're always looking for talented developers who think differently.
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => console.log('Apply clicked')}
              className="px-6 py-3 font-mono text-xs uppercase tracking-widest bg-[#00FF00] text-[#030303] border border-[#00FF00]"
              data-testid="button-apply"
            >
              APPLY NOW
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
