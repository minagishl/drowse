import { Modal } from './Modal';
import type { SleepCycle } from '../utils/sleepCalculator';
import { FaTwitter, FaFacebook } from 'react-icons/fa';
import { Share, Copy } from 'lucide-preact';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  recommendedCycle: SleepCycle;
}

export function ShareModal({
  isOpen,
  onClose,
  recommendedCycle,
}: ShareModalProps) {
  const formatTimeDisplay = (cycle: SleepCycle) => {
    const { hours, minutes, period } = cycle.time;
    return `${hours}:${minutes.toString().padStart(2, '0')} ${period}`;
  };

  const getHoursOfSleep = (cycleCount: number) => {
    const hours = Math.floor(cycleCount * 1.5);
    const mins = (cycleCount * 1.5 - hours) * 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  };

  const generateShareText = () => {
    const time = formatTimeDisplay(recommendedCycle);
    const duration = getHoursOfSleep(recommendedCycle.cycleCount);
    return `Optimal sleep time: ${time} (${duration} of sleep) - Based on sleep cycles #drowse #sleep #wellness`;
  };

  const shareUrl = typeof window !== 'undefined' ? window.location.origin : '';

  const handleTwitterShare = () => {
    const text = generateShareText();
    const url = `https://x.com/intent/tweet?text=${encodeURIComponent(
      text
    )}&url=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank', 'width=550,height=420');
  };

  const handleFacebookShare = () => {
    const url = `https://www.facebook.com/sharer.php?u=${encodeURIComponent(
      shareUrl
    )}`;
    window.open(url, '_blank', 'width=550,height=420');
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Drowse - Sleep Calculation Results',
          text: generateShareText(),
          url: shareUrl,
        });
      } catch {
        handleTwitterShare();
      }
    } else {
      handleTwitterShare();
    }
  };

  const copyToClipboard = async () => {
    const text = `${generateShareText()}\n${shareUrl}`;
    try {
      await navigator.clipboard.writeText(text);
      alert('Copied to clipboard!');
    } catch {
      alert('Failed to copy to clipboard');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Share Your Sleep Results">
      <div className="space-y-6">
        <div className="text-center">
          <div className="text-2xl font-bold text-white mb-2">
            {formatTimeDisplay(recommendedCycle)}
          </div>
          <div className="text-gray-400">
            {getHoursOfSleep(recommendedCycle.cycleCount)} of sleep •{' '}
            {recommendedCycle.cycleCount} cycles
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-300 mb-3">
            Share on social media
          </h3>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleTwitterShare}
              className="flex items-center justify-center gap-3 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors cursor-pointer"
              aria-label="Share on Twitter"
            >
              <FaTwitter />
              Twitter
            </button>

            <button
              onClick={handleFacebookShare}
              className="flex items-center justify-center gap-3 px-4 py-3 bg-blue-800 hover:bg-blue-900 text-white font-medium rounded-lg transition-colors cursor-pointer"
              aria-label="Share on Facebook"
            >
              <FaFacebook />
              Facebook
            </button>

            <button
              onClick={handleNativeShare}
              className="flex items-center justify-center gap-3 px-4 py-3 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition-colors cursor-pointer"
              aria-label="Share with other apps"
            >
              <Share className="w-4 h-4" />
              More
            </button>

            <button
              onClick={copyToClipboard}
              className="flex items-center justify-center gap-3 px-4 py-3 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition-colors cursor-pointer"
              aria-label="Copy to clipboard"
            >
              <Copy className="w-4 h-4" />
              Copy
            </button>
          </div>
        </div>

        <div className="bg-gray-700/50 rounded-lg p-4">
          <p className="text-sm text-gray-300 leading-relaxed">
            "{generateShareText()}"
          </p>
        </div>
      </div>
    </Modal>
  );
}
