import type { SleepCycle } from '../utils/sleepCalculator';

interface ShareButtonsProps {
  recommendedCycle: SleepCycle;
  onShareClick: () => void;
}

export function ShareButtons({ onShareClick }: ShareButtonsProps) {
  return (
    <div className="mt-4 pt-4 border-t border-gray-600">
      <p className="text-sm text-gray-400">
        <button
          onClick={onShareClick}
          className="text-green-400 hover:text-green-300 transition-colors underline cursor-pointer"
          aria-label="Share your results"
        >
          Share your results
        </button>
      </p>
    </div>
  );
}
