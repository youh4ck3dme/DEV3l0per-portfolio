import { motion } from 'framer-motion';
import { Cloud, Server, Database, Shield, Cpu, Network } from 'lucide-react';

interface CloudService {
  icon: typeof Cloud;
  name: string;
  provider: string;
  status: 'online' | 'degraded' | 'offline';
  latency: string;
}

const services: CloudService[] = [
  { icon: Server, name: 'COMPUTE_CLUSTER', provider: 'AWS EC2', status: 'online', latency: '12ms' },
  { icon: Database, name: 'DATA_STORE', provider: 'PostgreSQL', status: 'online', latency: '8ms' },
  { icon: Shield, name: 'CDN_EDGE', provider: 'Cloudflare', status: 'online', latency: '4ms' },
  { icon: Cpu, name: 'ML_INFERENCE', provider: 'GCP TPU', status: 'degraded', latency: '45ms' },
  { icon: Network, name: 'API_GATEWAY', provider: 'Kong', status: 'online', latency: '15ms' },
  { icon: Cloud, name: 'OBJECT_STORE', provider: 'S3', status: 'online', latency: '22ms' },
];

const statusColors = {
  online: '#00FF00',
  degraded: '#FFFF00',
  offline: '#FF0000',
};

export default function CloudSection() {
  return (
    <section id="cloud" className="py-24 px-4" data-testid="cloud-section">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12"
        >
          <span className="font-mono text-xs uppercase tracking-widest text-[#444444]">
            INFRASTRUCTURE
          </span>
          <h2 className="font-mono text-4xl md:text-5xl font-bold tracking-tighter text-[#EDEDED] mt-2">
            Cloud Status
          </h2>
          <p className="font-mono text-sm text-[#888888] mt-4 max-w-xl">
            Real-time infrastructure monitoring. All systems operational.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service, index) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.4,
                ease: [0.16, 1, 0.3, 1],
                delay: index * 0.1,
              }}
              className="p-6 bg-[#0A0A0A] border border-[rgba(255,255,255,0.08)] rounded-lg hover-elevate"
              data-testid={`cloud-service-${service.name.toLowerCase()}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 flex items-center justify-center border border-[rgba(255,255,255,0.08)] rounded-md text-[#00FFFF]">
                  <service.icon className="w-5 h-5" />
                </div>
                <div className="flex items-center gap-2">
                  <motion.div
                    className="w-2 h-2"
                    style={{ backgroundColor: statusColors[service.status] }}
                    animate={{
                      opacity: service.status === 'online' ? [1, 0.5, 1] : 1,
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                  <span className="font-mono text-xs uppercase tracking-widest text-[#444444]">
                    {service.status}
                  </span>
                </div>
              </div>

              <h3 className="font-mono text-lg font-bold tracking-tight text-[#EDEDED] mb-1">
                {service.name}
              </h3>
              <p className="font-mono text-xs text-[#888888] mb-4">
                {service.provider}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-[rgba(255,255,255,0.08)]">
                <span className="font-mono text-xs uppercase tracking-widest text-[#444444]">
                  LATENCY
                </span>
                <span className="font-mono text-sm text-[#00FF00]">
                  {service.latency}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
          className="mt-8 p-6 bg-[#0A0A0A] border border-[rgba(255,255,255,0.08)] rounded-lg"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h4 className="font-mono text-sm font-bold text-[#EDEDED] mb-1">
                SYSTEM HEALTH
              </h4>
              <p className="font-mono text-xs text-[#888888]">
                All critical services are operational. Last check: 2 seconds ago.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="font-mono text-2xl font-bold text-[#00FF00]">99.9%</div>
                <div className="font-mono text-xs text-[#444444] uppercase tracking-widest">UPTIME</div>
              </div>
              <div className="w-px h-12 bg-[rgba(255,255,255,0.08)]" />
              <div className="text-center">
                <div className="font-mono text-2xl font-bold text-[#EDEDED]">12ms</div>
                <div className="font-mono text-xs text-[#444444] uppercase tracking-widest">AVG LATENCY</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
