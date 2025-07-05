import { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";

interface VideoThumbnailProps {
  src: string;
  title: string;
  onLoad?: () => void;
  onError?: () => void;
}

export const VideoThumbnail = ({ src, title, onLoad, onError }: VideoThumbnailProps) => {
  const { t } = useLanguage();
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
    onError?.();
  };

  return (
    <div className="relative overflow-hidden bg-gray-200 min-h-[200px] md:min-h-[271px]">
      {isLoading && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-600"></div>
        </div>
      )}
      
      {hasError ? (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-300">
          <div className="text-center text-gray-600">
            <div className="text-2xl mb-2">📹</div>
            <div className="text-sm">{t('common.error')}</div>
          </div>
        </div>
      ) : (
        <video
          src={src}
          className="w-full h-full object-cover"
          muted
          preload="metadata"
          onLoadStart={() => setIsLoading(true)}
          onLoadedData={handleLoad}
          onError={handleError}
          playsInline
        />
      )}
      
      <div className="absolute top-3 left-2 text-white p-1 rounded text-sm line-clamp-3 md:text-lg bg-black bg-opacity-50">
        {title}
      </div>
    </div>
  );
}; 