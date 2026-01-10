'use client';

import { useDictionary } from '@/contexts/DictionaryContext';

export default function OCRScanPage() {
    const dict = useDictionary();
    return (
        <div className="p-8 text-center">
            <h1 className="text-2xl font-bold mb-4">{dict.dashboard.ocrScan}</h1>
            <p className="text-gray-600">Coming Soon...</p>
        </div>
    );
}
