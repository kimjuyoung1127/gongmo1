'use client';

import { Header } from '@/components/materials/Header';
import { ChatBubble } from '@/components/ai-manual/ChatBubble';
import { InputBar } from '@/components/ai-manual/InputBar';
import { QuickActions } from '@/components/ai-manual/QuickActions';
import { useDictionary } from '@/contexts/DictionaryContext';

export default function AIManualPage() {
    const dict = useDictionary();

    return (
        <div className="min-h-screen bg-gray-900 pb-32">
            <Header
                title={dict.dashboard.aiManual}
                showBack={true}
            />

            <main className="container mx-auto px-4 pt-20">
                <div className="flex flex-col">
                    {/* Date/Time or Divider could go here */}

                    {/* AI Message */}
                    <ChatBubble
                        isAi={true}
                        message="To operate the hydraulic lift, first ensure the safety harness is clipped to the yellow bar. Do you see the yellow bar?"
                        onListen={() => console.log('Listen')}
                        onTranslate={() => console.log('Translate')}
                    />

                    {/* User Message */}
                    <ChatBubble
                        isAi={false}
                        message="Where is the emergency shut-off?"
                    />

                    {/* AI Message Response */}
                    <ChatBubble
                        isAi={true}
                        message="The emergency shut-off is the large red button located on the base of the control panel."
                        onListen={() => console.log('Listen')}
                        onTranslate={() => console.log('Translate')}
                    />
                    {/* Image placeholder for AI response if needed */}
                    <div className="ml-14 mb-6 rounded-2xl overflow-hidden max-w-[70%] border border-gray-700">
                        {/* Placeholder for the image in the design */}
                        <div className="w-full h-32 bg-gray-800 flex items-center justify-center text-gray-500 text-xs">
                            [Control Panel Image]
                        </div>
                    </div>
                </div>
            </main>

            {/* Floating Action / Quick Actions Area */}
            <div className="fixed bottom-[calc(6rem+env(safe-area-inset-bottom))] left-0 right-0 px-4 z-40">
                <QuickActions />
            </div>

            <InputBar />
        </div>
    );
}
