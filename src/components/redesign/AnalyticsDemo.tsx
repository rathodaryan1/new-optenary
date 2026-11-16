import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Activity,
  Radio,
  TrendingUp,
  Play
} from 'lucide-react';

interface EventLog {
  id: string;
  time: string;
  category: 'api' | 'ai' | 'payment' | 'system';
  message: string;
  status: 'ok' | 'fast' | 'dispatched';
}

export default function AnalyticsDemo() {
  const [activeTab, setActiveTab] = useState<'traffic' | 'saas' | 'automation'>('traffic');
  const [logs, setLogs] = useState<EventLog[]>([
    { id: '1', time: '14:23:01', category: 'api', message: 'Edge Cache Hit (BOM1 Mumbai) · 38ms response', status: 'fast' },
    { id: '2', time: '14:23:09', category: 'payment', message: 'Razorpay UPI Webhook validated · Invoice generated', status: 'dispatched' },
    { id: '3', time: '14:23:18', category: 'ai', message: 'WhatsApp Agent resolved inquiry · Intent: Sweets Pricing', status: 'ok' },
    { id: '4', time: '14:23:25', category: 'system', message: 'PostgreSQL connection pool healthy · 0 queued queries', status: 'ok' },
  ]);

  const [counter, setCounter] = useState(14820);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter(prev => prev + Math.floor(Math.random() * 5) + 1);
    }, 2800);

    return () => clearInterval(interval);
  }, []);

  const simulateTrigger = () => {
    const categories: ('api' | 'ai' | 'payment' | 'system')[] = ['api', 'ai', 'payment', 'system'];
    const chosen = categories[Math.floor(Math.random() * categories.length)];
    const messages = {
      api: 'Edge Gateway routed request to worker · 42ms TTFB',
      ai: 'Autonomous Agent matched document chunk · Cosine similarity 0.94',
      payment: 'Stripe subscription renew event processed · Tenant updated',
      system: 'Redis memory defragmented · Cache hit ratio 96.4%'
    };

    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

    const newLog: EventLog = {
      id: String(Date.now()),
      time: timeStr,
      category: chosen,
      message: messages[chosen],
      status: 'fast'
    };

    setLogs(prev => [newLog, ...prev.slice(0, 4)]);
  };

  return (
    <section className="relative py-28 px-6 md:px-12 bg-[#030612] overflow-hidden border-t border-navy-border/50">
      {/* Background glow orbs */}
      <div className="absolute top-1/2 left-1/3 w-[600px] h-[600px] bg-brand-cyan/10 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-brand-blue/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-card border border-navy-border text-xs font-mono text-brand-cyan uppercase tracking-wider mb-4">
              <Radio size={12} className="animate-pulse" />
              <span>(05) DIGITAL PRODUCT DEMONSTRATION</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              Observability & intelligence <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue via-brand-cyan to-brand-purple">
                engineered into every solution.
              </span>
            </h2>
          </div>

          {/* Demonstration Notice Badge */}
          <div className="px-4 py-2.5 rounded-xl bg-navy-card/90 border border-brand-cyan/30 text-xs font-mono text-navy-muted backdrop-blur-md">
            <span className="text-brand-cyan font-bold block mb-0.5">ILLUSTRATIVE PRODUCT SUITE</span>
            <span className="text-[11px] text-navy-muted">Demonstrating real-time telemetry capabilities</span>
          </div>
        </div>

        {/* Dashboard Frame */}
        <div className="glass-panel-elevated rounded-2xl border border-brand-blue/30 overflow-hidden shadow-2xl">
          
          {/* Dashboard Topbar */}
          <div className="h-12 bg-navy-card px-4 sm:px-6 flex items-center justify-between border-b border-navy-border/80">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <span className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <span className="text-xs font-mono text-white font-semibold hidden sm:inline">
                Optenary Telemetry Command Center // Demo Console
              </span>
            </div>

            {/* View Switcher Tabs */}
            <div className="flex items-center gap-1 sm:gap-2">
              {[
                { id: 'traffic', label: 'API & Traffic' },
                { id: 'saas', label: 'Cloud Health' },
                { id: 'automation', label: 'AI Workflows' }
              ].map(t => (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id as any)}
                  className={`px-3 py-1 rounded-md text-[11px] font-mono transition-all ${
                    activeTab === t.id
                      ? 'bg-brand-blue text-white shadow-glow-blue'
                      : 'text-navy-muted hover:text-white hover:bg-navy-base'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Dashboard Body */}
          <div className="p-6 sm:p-8 space-y-8">
            
            {/* Top Stat Gauges */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-navy-card/90 border border-navy-border">
                <span className="text-xs font-mono text-navy-muted block mb-1">Simulated Edge Requests</span>
                <div className="text-2xl font-mono font-bold text-white flex items-center gap-2">
                  <span>{counter.toLocaleString()}</span>
                  <span className="text-xs text-emerald-400 font-normal">req/hr</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-navy-card/90 border border-navy-border">
                <span className="text-xs font-mono text-navy-muted block mb-1">Avg Global Latency</span>
                <div className="text-2xl font-mono font-bold text-brand-cyan flex items-center gap-2">
                  <span>42ms</span>
                  <span className="text-xs text-emerald-400 font-normal">Edge TTFB</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-navy-card/90 border border-navy-border">
                <span className="text-xs font-mono text-navy-muted block mb-1">Uptime SLA Standard</span>
                <div className="text-2xl font-mono font-bold text-brand-purple flex items-center gap-2">
                  <span>99.98%</span>
                  <span className="text-xs text-emerald-400 font-normal">Verified</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-navy-card/90 border border-navy-border">
                <span className="text-xs font-mono text-navy-muted block mb-1">AI Pipeline Status</span>
                <div className="text-2xl font-mono font-bold text-emerald-400 flex items-center gap-2">
                  <span>Active</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                </div>
              </div>
            </div>

            {/* Central Animated Chart Graphic */}
            <div className="p-5 rounded-xl bg-[#030614] border border-navy-border/80">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-xs font-mono text-white">
                  <TrendingUp size={14} className="text-brand-cyan" />
                  <span>Real-Time Request Concurrency Waveform</span>
                </div>
                <span className="text-[11px] font-mono text-navy-muted">
                  Live Buffer (Simulated Telemetry)
                </span>
              </div>

              {/* Animated SVG Chart Wave */}
              <div className="h-44 w-full relative flex items-end">
                <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 800 160">
                  <defs>
                    <linearGradient id="gradient-wave" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  
                  {/* Grid Lines */}
                  <line x1="0" y1="40" x2="800" y2="40" stroke="#151e3f" strokeDasharray="3 3" />
                  <line x1="0" y1="80" x2="800" y2="80" stroke="#151e3f" strokeDasharray="3 3" />
                  <line x1="0" y1="120" x2="800" y2="120" stroke="#151e3f" strokeDasharray="3 3" />

                  {/* Filled Area */}
                  <path
                    d="M0,130 C120,60 200,140 320,70 C440,20 520,110 640,40 C720,20 780,50 800,60 L800,160 L0,160 Z"
                    fill="url(#gradient-wave)"
                  />
                  {/* Stroke Line */}
                  <path
                    d="M0,130 C120,60 200,140 320,70 C440,20 520,110 640,40 C720,20 780,50 800,60"
                    fill="none"
                    stroke="#22d3ee"
                    strokeWidth="2.5"
                  />
                </svg>
              </div>

              {/* Chart Legend */}
              <div className="flex justify-between items-center text-[10px] font-mono text-navy-muted pt-3 border-t border-navy-border/50">
                <span>00:00 (T-60m)</span>
                <span>15:00</span>
                <span>30:00</span>
                <span>45:00</span>
                <span className="text-brand-cyan">NOW (Live Edge)</span>
              </div>
            </div>

            {/* Live Event Stream / Trigger Sandbox */}
            <div className="p-5 rounded-xl bg-navy-card/90 border border-navy-border/80">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-3 border-b border-navy-border/60">
                <div className="flex items-center gap-2 text-xs font-mono text-white">
                  <Activity size={14} className="text-brand-purple" />
                  <span>Real-Time Ingestion Event Log</span>
                </div>

                <button
                  onClick={simulateTrigger}
                  className="px-3 py-1.5 rounded-lg bg-brand-cyan/20 hover:bg-brand-cyan text-brand-cyan hover:text-black border border-brand-cyan/40 text-xs font-mono font-medium flex items-center gap-1.5 transition-all self-start sm:self-auto"
                >
                  <Play size={12} />
                  <span>Simulate Webhook Event</span>
                </button>
              </div>

              {/* Event Logs List */}
              <div className="space-y-2">
                <AnimatePresence>
                  {logs.map((log) => (
                    <motion.div
                      key={log.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      className="p-2.5 rounded-lg bg-navy-base border border-navy-border flex items-center justify-between text-xs font-mono"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-navy-muted">{log.time}</span>
                        <span className="px-1.5 py-0.5 rounded text-[10px] uppercase bg-navy-card border border-navy-border text-brand-cyan">
                          {log.category}
                        </span>
                        <span className="text-slate-300">{log.message}</span>
                      </div>
                      <span className="text-emerald-400 text-[10px] hidden sm:inline font-bold">
                        [SUCCESS]
                      </span>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

          </div>

          {/* Footer note */}
          <div className="h-10 bg-navy-card px-6 flex items-center justify-between border-t border-navy-border text-[11px] font-mono text-navy-muted">
            <span>Optenary Architecture Standard: Sub-second response · Complete observability</span>
            <span className="text-brand-cyan hidden sm:inline">Telemetry Module v2.4</span>
          </div>

        </div>

      </div>
    </section>
  );
}
