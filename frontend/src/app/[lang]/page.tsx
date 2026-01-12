'use client';

import { FeatureCard } from '@/components/mainpage/FeatureCard';
import { useDictionary, useLang } from '@/contexts/DictionaryContext';
import { useRouter } from 'next/navigation';
import { MessageSquare, Users, ScanText } from 'lucide-react';

export default function MainPage() {
  const dict = useDictionary();
  const lang = useLang();
  const router = useRouter();

  return (
    <div className="h-[calc(100dvh-5rem-env(safe-area-inset-bottom))] md:h-dvh bg-gray-900 pt-20 pb-6 md:pb-0 flex flex-col">
      <main className="container mx-auto px-4 h-full flex flex-col justify-center">
        <div className="flex flex-col md:grid md:grid-cols-3 gap-3 md:gap-6 h-full w-full max-w-6xl mx-auto">
          {/* AI Manual Card - Blue */}
          <FeatureCard
            title={dict.dashboard.aiManual}
            description={dict.dashboard.aiManualDesc}
            icon={MessageSquare}
            colorTheme="blue"
            buttonText={dict.dashboard.startChat}
            onClick={() => router.push(`/${lang}/ai-manual`)}
            className="flex-1"
          />

          {/* Community Card - Green */}
          <FeatureCard
            title={dict.dashboard.community}
            description={dict.dashboard.communityDesc}
            icon={Users}
            colorTheme="green"
            buttonText={dict.dashboard.joinDiscussion}
            onClick={() => router.push(`/${lang}/community`)}
            className="flex-1"
          />

          {/* OCR Scan Card - Orange */}
          <FeatureCard
            title={dict.dashboard.ocrScan}
            description={dict.dashboard.ocrScanDesc}
            icon={ScanText}
            colorTheme="orange"
            buttonText={dict.dashboard.startScanning}
            onClick={() => router.push(`/${lang}/ocr-scan`)}
            className="flex-1"
          />
        </div>
      </main>
    </div>
  );
}
