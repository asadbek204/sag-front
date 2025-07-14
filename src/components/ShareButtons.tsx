import { Send, MessageCircle, Mail, Share2 } from "lucide-react";
import { useEffect, useState } from "react";

const ShareButtons = () => {
  const [url, setUrl] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  const encodedUrl = encodeURIComponent(url);

  const shareLinks = {
    telegram: `https://t.me/share/url?url=${encodedUrl}`,
    sms: `sms:?body=${encodedUrl}`,
    email: `mailto:?subject=Check this out!&body=${encodedUrl}`,
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex items-center gap-2">
        <Share2 size={18} className="text-gray-500" />
        <span className="text-gray-600 font-medium text-sm">Ulashish:</span>
      </div>

      <div className="flex items-center gap-3">
        <a
          href={shareLinks.telegram}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#229ED9] hover:bg-[#1c89b6] text-white p-2.5 rounded-full transition-all duration-200 hover:scale-110"
          aria-label="Telegramda ulashish"
        >
          <Send size={18} strokeWidth={1.5} />
        </a>

        <a
          href={shareLinks.sms}
          className="bg-[#4CAF50] hover:bg-[#449d48] text-white p-2.5 rounded-full transition-all duration-200 hover:scale-110"
          aria-label="SMS orqali ulashish"
        >
          <MessageCircle size={18} strokeWidth={1.5} />
        </a>

        <a
          href={shareLinks.email}
          className="bg-[#D44638] hover:bg-[#c03e32] text-white p-2.5 rounded-full transition-all duration-200 hover:scale-110"
          aria-label="Email orqali ulashish"
        >
          <Mail size={18} strokeWidth={1.5} />
        </a>

        <button
          onClick={copyToClipboard}
          className={`p-2.5 rounded-full transition-all duration-200 hover:scale-110 ${
            copied ? "bg-green-500" : "bg-gray-200 hover:bg-gray-300"
          }`}
          aria-label="Linkni nusxalash"
        >
          {copied ? (
            <span className="text-white text-xs">✓</span>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
          )}
        </button>
      </div>

      {copied && (
        <div className="text-green-600 text-xs mt-1 animate-fade-in">
          Link nusxalandi!
        </div>
      )}
    </div>
  );
};

export default ShareButtons;