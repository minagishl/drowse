import { useState } from 'preact/hooks';
import { ArrowLeft } from 'lucide-preact';
import { TimeSelector } from './components/TimeSelector';
import { SleepResults } from './components/SleepResults';
import {
  calculateWakeUpTimes,
  calculateBedtimes,
  calculateSleepNowTimes,
  type SleepTime,
  type SleepCycle,
} from './utils/sleepCalculator';

type Mode = 'sleepNow' | 'specifyTime';
type TimeType = 'sleep' | 'wake';

export function App() {
  const [mode, setMode] = useState<Mode>('sleepNow');
  const [timeType, setTimeType] = useState<TimeType>('wake');
  const [wakeUpTime, setWakeUpTime] = useState<SleepTime>({
    hours: 7,
    minutes: 0,
    period: 'AM',
  });
  const [bedTime, setBedTime] = useState<SleepTime>({
    hours: 11,
    minutes: 0,
    period: 'PM',
  });
  const [results, setResults] = useState<SleepCycle[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleCalculate = () => {
    let cycles: SleepCycle[] = [];

    if (mode === 'sleepNow') {
      cycles = calculateSleepNowTimes();
    } else if (timeType === 'wake') {
      cycles = calculateBedtimes(wakeUpTime);
    } else if (timeType === 'sleep') {
      cycles = calculateWakeUpTimes(bedTime);
    }

    setResults(cycles);
    setShowResults(true);
  };

  const handleSleepNow = () => {
    setMode('sleepNow');
    const cycles = calculateSleepNowTimes();
    setResults(cycles);
    setShowResults(true);
  };

  const handleBackToInput = () => {
    setShowResults(false);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-6 sm:py-8">
        {/* Main Content */}
        <div className="max-w-lg sm:mt-8 mx-auto">
          {!showResults ? (
            <div className="space-y-6">
              {/* 1. Sleep Now */}
              <div
                className={`border-2 rounded-xl p-6 cursor-pointer transition-all duration-300 ease-in-out overflow-hidden ${
                  mode === 'sleepNow'
                    ? 'border-green-500 bg-green-500/5'
                    : 'border-gray-700 bg-gray-800/50 hover:border-gray-600 hover:bg-gray-800'
                }`}
                onClick={() => setMode('sleepNow')}
              >
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-semibold text-sm">
                    1
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Sleep Now!
                    </h3>
                    <p className="text-gray-400 text-sm">
                      Get optimal wake-up times based on sleep cycles
                    </p>

                    <div
                      className={`transition-all duration-300 ease-in-out ${
                        mode === 'sleepNow'
                          ? 'max-h-20 opacity-100 mt-4'
                          : 'max-h-0 opacity-0 mt-0'
                      } overflow-hidden`}
                    >
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSleepNow();
                        }}
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200"
                      >
                        Sleep Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. Specify Time */}
              <div
                className={`border-2 rounded-xl p-6 cursor-pointer transition-all duration-300 ease-in-out overflow-hidden ${
                  mode === 'specifyTime'
                    ? 'border-green-500 bg-green-500/5'
                    : 'border-gray-700 bg-gray-800/50 hover:border-gray-600 hover:bg-gray-800'
                }`}
                onClick={() => setMode('specifyTime')}
              >
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-semibold text-sm">
                    2
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Specify Time
                    </h3>
                    <p className="text-gray-400 text-sm">
                      Set your preferred sleep or wake time
                    </p>

                    <div
                      className={`transition-all duration-300 ease-in-out ${
                        mode === 'specifyTime'
                          ? 'max-h-96 opacity-100 mt-4'
                          : 'max-h-0 opacity-0 mt-0'
                      } overflow-hidden`}
                    >
                      <div
                        className="space-y-4"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <select
                          value={timeType}
                          onChange={(e) =>
                            setTimeType(e.currentTarget.value as TimeType)
                          }
                          className="w-full bg-gray-700 border-2 border-gray-600 rounded-lg px-4 py-3 text-white font-semibold focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 hover:bg-gray-600 transition-colors"
                        >
                          <option value="wake">Wake up time</option>
                          <option value="sleep">Sleep time</option>
                        </select>

                        <TimeSelector
                          value={timeType === 'wake' ? wakeUpTime : bedTime}
                          onChange={
                            timeType === 'wake' ? setWakeUpTime : setBedTime
                          }
                          className="w-full justify-between"
                        />

                        <button
                          onClick={handleCalculate}
                          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200"
                        >
                          Calculate
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Results Only */}
              {results.length > 0 && <SleepResults cycles={results} />}

              {/* Back Button and Copyright */}
              <div className="mt-8 flex justify-between items-center">
                <button
                  onClick={handleBackToInput}
                  className="flex items-center gap-2 text-gray-400 hover:text-gray-200 transition-colors"
                >
                  <ArrowLeft size={20} />
                  Back to input
                </button>
                <div className="text-gray-400 text-sm">
                  Created by{' '}
                  <a
                    href="https://minagishl.com"
                    target="_blank"
                    className="text-green-400 hover:text-green-300 transition-colors"
                  >
                    minagishl
                  </a>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
