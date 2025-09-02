export interface SleepTime {
  hours: number;
  minutes: number;
  period: 'AM' | 'PM';
}

export interface SleepCycle {
  time: SleepTime;
  cycleCount: number;
}

const SLEEP_CYCLE_DURATION = 90; // minutes
const FALL_ASLEEP_TIME = 15; // minutes

export function formatTime(date: Date): SleepTime {
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return {
    hours: hours === 0 ? 12 : hours > 12 ? hours - 12 : hours,
    minutes,
    period: hours >= 12 ? 'PM' : 'AM',
  };
}

export function timeToDate(sleepTime: SleepTime): Date {
  const date = new Date();
  let hours = sleepTime.hours;

  if (sleepTime.period === 'PM' && hours !== 12) {
    hours += 12;
  } else if (sleepTime.period === 'AM' && hours === 12) {
    hours = 0;
  }

  date.setHours(hours, sleepTime.minutes, 0, 0);
  return date;
}

export function calculateWakeUpTimes(bedtime: SleepTime): SleepCycle[] {
  const bedDate = timeToDate(bedtime);
  const sleepStartTime = new Date(bedDate.getTime() + FALL_ASLEEP_TIME * 60000);

  const wakeUpTimes: SleepCycle[] = [];

  // Calculate all cycles (1-9 hours of sleep)
  for (let cycles = 1; cycles <= 6; cycles++) {
    const totalSleepTime = cycles * SLEEP_CYCLE_DURATION;
    const wakeUpTime = new Date(
      sleepStartTime.getTime() + totalSleepTime * 60000
    );

    wakeUpTimes.push({
      time: formatTime(wakeUpTime),
      cycleCount: cycles,
    });
  }

  return wakeUpTimes;
}

export function calculateBedtimes(wakeUpTime: SleepTime): SleepCycle[] {
  const wakeDate = timeToDate(wakeUpTime);
  const bedtimes: SleepCycle[] = [];

  // Calculate all cycles (1-9 hours of sleep)
  for (let cycles = 1; cycles <= 6; cycles++) {
    const totalSleepTime = cycles * SLEEP_CYCLE_DURATION;
    const sleepStartTime = new Date(
      wakeDate.getTime() - totalSleepTime * 60000
    );
    const bedtime = new Date(
      sleepStartTime.getTime() - FALL_ASLEEP_TIME * 60000
    );

    bedtimes.push({
      time: formatTime(bedtime),
      cycleCount: cycles,
    });
  }

  return bedtimes.reverse(); // Show earliest bedtime first
}

export function calculateSleepNowTimes(): SleepCycle[] {
  const now = new Date();
  const sleepStartTime = new Date(now.getTime() + FALL_ASLEEP_TIME * 60000);

  const wakeUpTimes: SleepCycle[] = [];

  // Calculate all cycles (1-9 hours of sleep)
  for (let cycles = 1; cycles <= 6; cycles++) {
    const totalSleepTime = cycles * SLEEP_CYCLE_DURATION;
    const wakeUpTime = new Date(
      sleepStartTime.getTime() + totalSleepTime * 60000
    );

    wakeUpTimes.push({
      time: formatTime(wakeUpTime),
      cycleCount: cycles,
    });
  }

  return wakeUpTimes;
}

export function getRecommendedCycle(cycles: SleepCycle[]): SleepCycle {
  // Recommend 5 cycles (7.5 hours) as optimal
  return cycles.find((cycle) => cycle.cycleCount === 5) || cycles[2];
}
