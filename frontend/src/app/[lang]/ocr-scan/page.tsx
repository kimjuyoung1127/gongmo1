'use client';

import { Header } from '@/components/materials/Header';
import { ScanPreview } from '@/components/OcrPage/ScanPreview';
import { ResultSheet } from '@/components/OcrPage/ResultSheet';
import { useDictionary } from '@/contexts/DictionaryContext';
import { MoreHorizontal } from 'lucide-react';

export default function OCRScanPage() {
    const dict = useDictionary();

    return (
        <div className="min-h-screen bg-gray-900">
            <Header
                title="Scan Result"
                subtitle="WEWORKHERE"
                showBack={true}
                rightElement={
                    <button className="text-gray-400 hover:text-white">
                        <MoreHorizontal size={24} />
                    </button>
                }
            />

            <main className="pt-14"> {/* Header height compensation */}
                <ScanPreview />
                <ResultSheet
                    translatedText="1. Always wear your hard hat when entering the construction zone."
                    originalText="1. निर्माण क्षेत्र में प्रवेश करते समय हमेशा अपनी सख्त टोपी पहनें।"
                />
            </main>
        </div>
    );
}
