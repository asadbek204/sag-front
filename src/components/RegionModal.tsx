import { useEffect, useRef, useState } from 'react';

interface RegionModalProps {
  showQuestion: boolean;
  onAccept: () => void;
  onDecline: () => void;
  showSelect: boolean;
  regionsAvailable: string[];
  regionsSoon: string[];
  selectedRegion: string;
  onSelectRegion: (region: string) => void;
  onCloseSelect: () => void;
  t: (key: string) => string;
  className?: string;
}

export const RegionModal = ({
  showQuestion,
  onAccept,
  onDecline,
  showSelect,
  regionsAvailable,
  regionsSoon,
  selectedRegion,
  onSelectRegion,
  onCloseSelect,
  t,
  className = '',
}: RegionModalProps) => {
  if (!showQuestion && !showSelect) return null;

  if (showSelect) {
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
        onClick={onCloseSelect}
      >
        <div
          className="bg-[#FFFCE0] rounded shadow-lg p-6 min-w-[400px] max-w-[95vw] max-h-[90vh] overflow-y-auto relative"
          onClick={e => e.stopPropagation()}
        >
          <button
            className="absolute top-3 right-3 text-2xl text-gray-400 hover:text-gray-700 focus:outline-none"
            onClick={onCloseSelect}
            aria-label="Close"
          >
            &times;
          </button>
          <div className="mb-4 text-lg font-semibold">{t('region.select_title')}</div>
          <div className="mb-2 text-base font-medium">{t('region.available_title')}</div>
          <div className="flex flex-col gap-2 mb-4">
            {regionsAvailable.map(region => (
              <label key={region} className="flex flex-row-reverse items-center justify-between gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="region"
                  value={region}
                  checked={selectedRegion === region}
                  onChange={() => {
                    onSelectRegion(region);
                    onCloseSelect();
                  }}
                />
                <span>{region}</span>
              </label>
            ))}
          </div>
          <div className="my-2 border-t" />
          <div className="mb-2 text-base font-medium">{t('region.soon_title')}</div>
          <div className="flex flex-col gap-2 mb-4">
            {regionsSoon.map(region => (
              <div key={region} className="pl-1 text-gray-800">{region}</div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (showQuestion) {
    // Прогресс-бар и таймер
    const [progress, setProgress] = useState(0);
    const timerRef = useRef<number | null>(null);
    const declineTimeoutRef = useRef<number | null>(null);
    useEffect(() => {
      if (!showQuestion) return;
      setProgress(0);
      let start = Date.now();
      const duration = 5000;
      function animate() {
        const elapsed = Date.now() - start;
        const percent = Math.min(100, (elapsed / duration) * 100);
        setProgress(percent);
        if (elapsed < duration) {
          timerRef.current = window.setTimeout(animate, 16);
        } else {
          setProgress(100);
          declineTimeoutRef.current = window.setTimeout(() => {
            onDecline();
          }, 250); // 250мс чтобы прогресс визуально дошёл до конца
        }
      }
      animate();
      return () => {
        if (timerRef.current) clearTimeout(timerRef.current);
        if (declineTimeoutRef.current) clearTimeout(declineTimeoutRef.current);
      };
    }, [showQuestion]);
    // Сброс таймера при нажатии кнопок
    const handleAccept = () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (declineTimeoutRef.current) clearTimeout(declineTimeoutRef.current);
      onAccept();
    };
    const handleDecline = () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (declineTimeoutRef.current) clearTimeout(declineTimeoutRef.current);
      onDecline();
    };
    return (
      <div className="relative">
        {/* Arrow */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-white" style={{zIndex:2}}>
          <svg width="32" height="16" viewBox="0 0 32 16"><polygon points="16,0 32,16 0,16" fill="white" /></svg>
        </div>
        <div className="bg-white rounded shadow-lg p-4 min-w-[275px] max-w-[90vw] flex flex-col items-center">
          <div className="mb-3 text-base text-black text-center">{t('region.question')}</div>
          {/* Прогресс-бар */}
          <div className="w-full h-1 bg-blue-100 my-4 relative overflow-hidden">
            <div
              className="absolute left-0 top-0 h-full bg-blue-600 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex gap-4 mt-2 w-full justify-center">
            <button
              className="flex-1 text-base rounded border-2 border-blue-700 bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-all"
              style={{minWidth:30}}
              onClick={handleAccept}
            >{t('region.yes')}</button>
            <button
              className="flex-1 text-base rounded border-2 border-gray-400 bg-gray-100 text-gray-800 font-semibold hover:bg-gray-200 transition-all"
              style={{minWidth:30}}
              onClick={handleDecline}
            >{t('region.no')}</button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}; 