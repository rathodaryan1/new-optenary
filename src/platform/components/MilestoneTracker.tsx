import { CheckCircle2, ChevronRight } from 'lucide-react';
import type { Milestone } from '../types';

interface MilestoneTrackerProps {
  milestones: Milestone[];
  editable?: boolean;
  onUpdateMilestone?: (milestoneId: string, status: Milestone['status'], progress: number) => void;
}

export default function MilestoneTracker({
  milestones,
  editable = false,
  onUpdateMilestone,
}: MilestoneTrackerProps) {
  return (
    <div className="space-y-4">
      {milestones.map((m, idx) => {
        const isCompleted = m.status === 'completed';
        const isInProgress = m.status === 'in_progress';

        return (
          <div
            key={m.id}
            className={`p-4 rounded-xl border transition-all ${
              isCompleted
                ? 'bg-white/[0.02] border-white/[0.08]'
                : isInProgress
                ? 'bg-[#D4FF3A]/[0.03] border-[#D4FF3A]/30 shadow-[0_0_20px_rgba(212,255,58,0.06)]'
                : 'bg-white/[0.01] border-white/[0.04] opacity-75'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              {/* Milestone Step & Name */}
              <div className="flex items-start sm:items-center gap-3">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center flex-none text-xs font-bold transition-all ${
                    isCompleted
                      ? 'bg-[#D4FF3A] text-[#08090A]'
                      : isInProgress
                      ? 'bg-white/10 text-white border border-[#D4FF3A] animate-pulse'
                      : 'bg-white/5 text-white/40 border border-white/10'
                  }`}
                >
                  {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-semibold text-white tracking-tight">{m.name}</h4>
                    {isInProgress && (
                      <span className="px-2 py-0.5 rounded-full bg-[#D4FF3A]/20 text-[#D4FF3A] text-[10px] font-mono font-bold uppercase tracking-wider">
                        Active Sprint
                      </span>
                    )}
                  </div>

                  {m.dueDate && (
                    <div className="text-[11px] text-white/50 font-mono mt-0.5">
                      Target Due: {m.dueDate} {m.completedAt && `• Completed ${m.completedAt}`}
                    </div>
                  )}
                </div>
              </div>

              {/* Progress & Status Pill */}
              <div className="flex items-center gap-3 self-end sm:self-auto">
                <span className="text-xs font-mono font-bold text-white/80">{m.progress}%</span>
                <span
                  className={`px-2.5 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider font-mono ${
                    isCompleted
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : isInProgress
                      ? 'bg-[#D4FF3A]/20 text-[#D4FF3A] border border-[#D4FF3A]/40'
                      : 'bg-white/5 text-white/40 border border-white/10'
                  }`}
                >
                  {m.status.replace('_', ' ')}
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-1.5 bg-white/[0.06] rounded-full overflow-hidden mt-3">
              <div
                className={`h-full transition-all duration-500 ${
                  isCompleted ? 'bg-emerald-400' : isInProgress ? 'bg-[#D4FF3A]' : 'bg-white/20'
                }`}
                style={{ width: `${m.progress}%` }}
              />
            </div>

            {/* Deliverables tags */}
            {m.deliverables && m.deliverables.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-white/[0.04]">
                {m.deliverables.map((d, dIdx) => (
                  <span
                    key={dIdx}
                    className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded bg-white/[0.04] text-white/70"
                  >
                    <ChevronRight className="w-2.5 h-2.5 text-[#D4FF3A]" />
                    <span>{d}</span>
                  </span>
                ))}
              </div>
            )}

            {/* Editable Controls for Admin Mode */}
            {editable && onUpdateMilestone && (
              <div className="mt-3 pt-3 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-white/40">Status:</span>
                  <select
                    value={m.status}
                    onChange={(e) =>
                      onUpdateMilestone(
                        m.id,
                        e.target.value as Milestone['status'],
                        e.target.value === 'completed' ? 100 : m.progress
                      )
                    }
                    className="bg-[#111316] border border-white/10 rounded-lg px-2 py-1 text-xs text-white"
                  >
                    <option value="pending">Pending</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-white/40">Progress:</span>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    value={m.progress}
                    onChange={(e) =>
                      onUpdateMilestone(
                        m.id,
                        Number(e.target.value) === 100
                          ? 'completed'
                          : Number(e.target.value) > 0
                          ? 'in_progress'
                          : 'pending',
                        Number(e.target.value)
                      )
                    }
                    className="accent-[#D4FF3A] w-24"
                  />
                  <span className="font-mono text-white/70">{m.progress}%</span>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
