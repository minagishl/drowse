import type { SleepTime } from '../utils/sleepCalculator';

interface TimeSelectorProps {
  value: SleepTime;
  onChange: (time: SleepTime) => void;
  className?: string;
}

export function TimeSelector({
  value,
  onChange,
  className = '',
}: TimeSelectorProps) {
  const hours = Array.from({ length: 12 }, (_, i) => i + 1);

  const handleHourChange = (hours: number) => {
    onChange({ ...value, hours });
  };

  const handleMinuteChange = (minutes: number) => {
    onChange({ ...value, minutes });
  };

  const handlePeriodChange = (period: 'AM' | 'PM') => {
    onChange({ ...value, period });
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <select
        value={value.hours}
        onChange={(e) => handleHourChange(Number(e.currentTarget.value))}
        className="bg-gray-700 border-2 border-gray-600 rounded-lg px-4 py-3 text-white font-semibold flex-1 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 hover:bg-gray-600 transition-colors"
      >
        {hours.map((hour) => (
          <option key={hour} value={hour} className="bg-gray-800">
            {hour}
          </option>
        ))}
      </select>

      <span className="text-gray-300 text-2xl font-bold">:</span>

      <select
        value={value.minutes}
        onChange={(e) => handleMinuteChange(Number(e.currentTarget.value))}
        className="bg-gray-700 border-2 border-gray-600 rounded-lg px-4 py-3 text-white font-semibold flex-1 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 hover:bg-gray-600 transition-colors"
      >
        {Array.from({ length: 60 }, (_, i) => i).map((minute) => (
          <option key={minute} value={minute} className="bg-gray-800">
            {minute.toString().padStart(2, '0')}
          </option>
        ))}
      </select>

      <select
        value={value.period}
        onChange={(e) =>
          handlePeriodChange(e.currentTarget.value as 'AM' | 'PM')
        }
        className="bg-gray-700 border-2 border-gray-600 rounded-lg px-4 py-3 text-white font-semibold flex-1 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 hover:bg-gray-600 transition-colors"
      >
        <option value="AM" className="bg-gray-800">
          AM
        </option>
        <option value="PM" className="bg-gray-800">
          PM
        </option>
      </select>
    </div>
  );
}
