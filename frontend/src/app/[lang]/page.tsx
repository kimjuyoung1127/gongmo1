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
    <div className="min-h-screen bg-gray-900 pb-24">
      <main className="container mx-auto px-4 py-8 space-y-6">
        {/* Welcome Text (Optional) */}
        {/* <h1 className="text-2xl font-bold text-white mb-6">{dict.dashboard.greeting}</h1> */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* AI Manual Card - Blue */}
          <FeatureCard
            title={dict.dashboard.aiManual}
            description={dict.dashboard.aiManualDesc}
            icon={MessageSquare}
            colorTheme="blue"
            buttonText={dict.dashboard.startChat}
            onClick={() => router.push(`/${lang}/ai-manual`)}
          />

          {/* Community Card - Green */}
          <FeatureCard
            title={dict.dashboard.community}
            description={dict.dashboard.communityDesc}
            icon={Users}
            colorTheme="green"
            buttonText={dict.dashboard.joinDiscussion}
            onClick={() => router.push(`/${lang}/community`)}
          />

          {/* OCR Scan Card - Orange */}
          <FeatureCard
            title={dict.dashboard.ocrScan}
            description={dict.dashboard.ocrScanDesc}
            icon={ScanText}
            colorTheme="orange"
            buttonText={dict.dashboard.startScanning}
            onClick={() => router.push(`/${lang}/ocr-scan`)}
          />
        </div>
      </main>
    </div>
  );
}
