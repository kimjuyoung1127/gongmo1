'use client';

import { Search } from 'lucide-react';

export const ScanPreview = () => {
    return (
        <div className="relative w-full h-[60vh] bg-gray-800 overflow-hidden">
            {/* Placeholder for the scanned image */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60 z-10 pointer-events-none" />

            {/* Simulate an image with a blurred background or actual image */}
            <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                <span className="text-gray-500">[Scanned Image Preview]</span>
            </div>

            {/* Bounding Boxes Simulation */}
            <div className="absolute top-1/4 left-10 right-10 h-12 bg-blue-500/30 border border-blue-400 rounded-sm" />
            <div className="absolute top-1/3 left-16 right-20 h-8 bg-blue-500/30 border border-blue-400 rounded-sm" />
            <div className="absolute top-[45%] left-10 right-10 h-24 bg-blue-500/30 border border-blue-400 rounded-sm" />

            {/* Tap to enlarge hint */}
            <button className="absolute bottom-4 right-4 z-20 bg-black/60 text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1 backdrop-blur-md">
                <Search size={12} />
                Tap to enlarge
            </button>
        </div>
    );
};
