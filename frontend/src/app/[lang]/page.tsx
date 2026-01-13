'use client';

import { FeatureCard } from '@/components/mainpage/FeatureCard';
import { DailyBriefingModal } from '@/components/mainpage/DailyBriefingModal';
import { useDictionary, useLang } from '@/contexts/DictionaryContext';
import { useRouter } from 'next/navigation';
import { MessageSquare, Users, ScanText, Bell } from 'lucide-react';
import { useState } from 'react';

export default function MainPage() {
  const dict = useDictionary();
  const lang = useLang();
  const router = useRouter();
  const [isBriefingOpen, setIsBriefingOpen] = useState(false);

  return (
    <div className="relative bg-gray-900 pt-20 flex flex-col h-[calc(100dvh-4rem-env(safe-area-inset-bottom))] md:h-screen">

      {/* Red Notification Button (Toss Style Trigger) */}
      <button
        onClick={() => setIsBriefingOpen(true)}
        className="absolute top-24 right-6 z-40 p-3 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg shadow-red-500/30 transition-transform active:scale-95 animate-bounce-subtle group"
        aria-label="Daily Briefing"
      >
        <Bell size={24} fill="currentColor" className="group-hover:rotate-12 transition-transform" />
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full border-2 border-red-500" />
      </button>

      <main className="container mx-auto px-4 h-full flex flex-col md:justify-center">
        {/* Mobile: Flex Column (Stretch) | Desktop: Grid (Centered, Fixed Size) */}
        <div className="flex flex-col h-full pb-6 gap-3 md:grid md:grid-cols-3 md:gap-8 md:h-auto md:pb-0 md:w-full md:max-w-6xl md:mx-auto">

          {/* AI Manual Card */}
          <FeatureCard
            title={dict.dashboard.aiManual}
            description={dict.dashboard.aiManualDesc}
            icon={MessageSquare}
            colorTheme="blue"
            buttonText={dict.dashboard.startChat}
            onClick={() => router.push(`/${lang}/ai-manual`)}
            className="flex-1 md:flex-none md:h-[400px]"
          />

          {/* Community Card */}
          <FeatureCard
            title={dict.dashboard.community}
            description={dict.dashboard.communityDesc}
            icon={Users}
            colorTheme="green"
            buttonText={dict.dashboard.joinDiscussion}
            onClick={() => router.push(`/${lang}/community`)}
            className="flex-1 md:flex-none md:h-[400px]"
          />

          {/* OCR Scan Card */}
          <FeatureCard
            title={dict.dashboard.ocrScan}
            description={dict.dashboard.ocrScanDesc}
            icon={ScanText}
            colorTheme="orange"
            buttonText={dict.dashboard.startScanning}
            onClick={() => router.push(`/${lang}/ocr-scan`)}
            className="flex-1 md:flex-none md:h-[400px]"
          />
        </div>
      </main>

      <DailyBriefingModal
        isOpen={isBriefingOpen}
        onClose={() => setIsBriefingOpen(false)}
      />
    </div>
  );
}
