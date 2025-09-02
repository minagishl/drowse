import { useState } from 'preact/hooks';
import { ChevronDown, Info } from 'lucide-preact';
import type { SleepCycle } from '../utils/sleepCalculator';
import { getRecommendedCycle } from '../utils/sleepCalculator';

interface SleepResultsProps {
  cycles: SleepCycle[];
}

export function SleepResults({ cycles }: SleepResultsProps) {
  if (cycles.length === 0) return null;

  const [showAll, setShowAll] = useState(false);
  const recommended = getRecommendedCycle(cycles);

  // Show recommended + 2 other cycles by default
  const visibleCycles = showAll
    ? cycles
    : cycles.filter((_, index) => index < 3);

  const formatTimeDisplay = (cycle: SleepCycle) => {
    const { hours, minutes, period } = cycle.time;
    return `${hours}:${minutes.toString().padStart(2, '0')} ${period}`;
  };

  const getHoursOfSleep = (cycleCount: number) => {
    const hours = Math.floor(cycleCount * 1.5);
    const mins = (cycleCount * 1.5 - hours) * 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  };

  return (
    <div className="sm:mt-8 space-y-4">
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-green-400">Recommended</h3>
          <span className="text-xs font-medium text-green-300 px-3 py-1 rounded-full bg-green-900/20 border border-green-700/50">
            {recommended.cycleCount} cycles
          </span>
        </div>
        <div className="text-4xl font-bold text-white mb-3 tracking-tight">
          {formatTimeDisplay(recommended)}
        </div>
        <div className="text-gray-300 text-sm flex items-center gap-2">
          <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
          {getHoursOfSleep(recommended.cycleCount)} of sleep
          <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
          Based on sleep cycles
        </div>
      </div>

      <div className="grid gap-3">
        {visibleCycles.map((cycle, index) => {
          const isRecommended = cycle.cycleCount === recommended.cycleCount;
          if (isRecommended) return null;

          return (
            <div
              key={index}
              className="bg-gray-800 border border-gray-700 rounded-xl p-4 hover:bg-gray-700 hover:border-gray-600 transition-all duration-300 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xl font-bold text-white tracking-tight">
                    {formatTimeDisplay(cycle)}
                  </div>
                  <div className="text-sm text-gray-400 flex items-center gap-1.5">
                    <span>{getHoursOfSleep(cycle.cycleCount)} of sleep</span>
                    <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
                    <span>{cycle.cycleCount} cycles</span>
                  </div>
                </div>
                {(cycle.cycleCount === 1 || cycle.cycleCount === 6) && (
                  <div className="text-xs font-medium text-gray-400 px-3 py-1.5 rounded-full bg-gray-700/70 border border-gray-600/50">
                    {cycle.cycleCount === 1
                      ? 'Min'
                      : cycle.cycleCount === 6
                      ? 'Max'
                      : ''}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {cycles.length > 3 && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="w-full bg-gray-700/50 hover:bg-gray-600 border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white py-4 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
          >
            <span>
              {showAll
                ? 'Show Less'
                : `Show ${cycles.length - visibleCycles.length} More Options`}
            </span>
            <ChevronDown
              size={16}
              className={`transition-transform ${showAll ? 'rotate-180' : ''}`}
            />
          </button>
        )}
      </div>

      <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-5 mt-6 backdrop-blur-sm">
        <div className="flex items-start gap-3">
          <div className="w-6 h-6 rounded-full bg-green-600/20 border border-green-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
            <Info size={12} className="text-green-400" />
          </div>
          <div className="text-sm text-gray-300 space-y-2">
            <p className="leading-relaxed">
              Sleep cycles typically last 90 minutes. Waking up at the end of a
              cycle helps you feel more refreshed.
            </p>
            <p className="text-gray-400 leading-relaxed">
              It takes an average of 15 minutes to fall asleep.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
