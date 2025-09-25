import { Modal } from './Modal';

interface UsageModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function UsageModal({ isOpen, onClose }: UsageModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="How to Use Drowse">
      <div className="space-y-6">
        <section>
          <h3 className="text-lg font-semibold text-green-400 mb-3">
            Sleep Now Option
          </h3>
          <p className="text-gray-300 mb-3">
            Use this when you want to go to sleep immediately and find optimal
            wake-up times.
          </p>
          <ol className="list-decimal list-inside text-gray-300 space-y-2">
            <li>Click on "Sleep Now!" option</li>
            <li>Press the "Sleep Now" button</li>
            <li>View multiple wake-up time options based on sleep cycles</li>
            <li>
              Choose the recommended time (highlighted in green) or select
              another option
            </li>
          </ol>
        </section>

        <section>
          <h3 className="text-lg font-semibold text-green-400 mb-3">
            Specify Time Option
          </h3>
          <p className="text-gray-300 mb-3">
            Use this when you have a specific wake-up time or bedtime in mind.
          </p>
          <ol className="list-decimal list-inside text-gray-300 space-y-2">
            <li>Click on "Specify Time" option</li>
            <li>
              Choose between "Wake up time" or "Sleep time" from the dropdown
            </li>
            <li>Set your desired time using the time selector</li>
            <li>Press "Calculate" to see optimal sleep/wake times</li>
            <li>Review the results and sort by sleep duration if needed</li>
          </ol>
        </section>

        <section>
          <h3 className="text-lg font-semibold text-green-400 mb-3">
            Understanding Sleep Cycles
          </h3>
          <div className="text-gray-300 space-y-3">
            <p>
              <strong>Sleep cycles last approximately 90 minutes</strong> and
              consist of different stages:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Light sleep</li>
              <li>Deep sleep</li>
              <li>REM (Rapid Eye Movement) sleep</li>
            </ul>
            <p>
              Waking up at the end of a complete cycle helps you feel more
              refreshed and less groggy.
            </p>
          </div>
        </section>

        <section>
          <h3 className="text-lg font-semibold text-green-400 mb-3">
            Tips for Better Sleep
          </h3>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li>
              <strong>Consistency:</strong> Try to sleep and wake at the same
              time daily
            </li>
            <li>
              <strong>Environment:</strong> Keep your bedroom cool, dark, and
              quiet
            </li>
            <li>
              <strong>Pre-sleep routine:</strong> Avoid screens 1 hour before
              bedtime
            </li>
            <li>
              <strong>Fall asleep time:</strong> The calculator includes 15
              minutes to fall asleep
            </li>
            <li>
              <strong>Flexibility:</strong> Listen to your body and adjust as
              needed
            </li>
          </ul>
        </section>

        <section className="bg-gray-700/50 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-yellow-400 mb-3">
            Important Note
          </h3>
          <p className="text-gray-300 text-sm">
            This calculator provides general guidance based on average sleep
            cycles. Individual sleep needs vary. Consult a healthcare provider
            if you have persistent sleep issues or specific medical conditions.
          </p>
        </section>
      </div>
    </Modal>
  );
}
