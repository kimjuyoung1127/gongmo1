'use client';

import { useState, useRef, useEffect } from 'react';
import { Camera, Upload, X, FileText, Globe, Loader2, CheckCircle, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { useDictionary } from '@/contexts/DictionaryContext';
import { Header } from '@/components/materials/Header';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';

interface OCRResult {
    document_type: string;
    original_text: string;
    translated_text: string;
    summary: string;
    key_info: {
        company?: string;
        date?: string;
        amount?: string;
        period?: string;
        conditions?: string[];
    };
    confidence: number;
    source_lang: string;
    target_lang: string;
}

type ResultSection = 'document' | 'original' | 'translated' | 'summary' | 'keyInfo';

export default function OCRScanPage() {
    const dict = useDictionary();
    const t = dict.ocr;
    
    const fileInputRef = useRef<HTMLInputElement>(null);
    const tabContainerRef = useRef<HTMLDivElement>(null);
    const tabRefs = useRef<{ [key in ResultSection]?: HTMLButtonElement }>({});
    
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [result, setResult] = useState<OCRResult | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [sourceLang, setSourceLang] = useState('ko');
    const [targetLang, setTargetLang] = useState('vi');
    
    // 스와이프 관련 상태
    const [activeSection, setActiveSection] = useState<ResultSection>('document');
    const [swipeDirection, setSwipeDirection] = useState<number>(0);

    // 섹션 정의
    const sections: ResultSection[] = ['document', 'original', 'translated', 'summary', 'keyInfo'];
    const sectionTitles = {
        document: t.documentType || '문서 종류',
        original: t.originalText || '원문',
        translated: t.translatedText || '번역문',
        summary: t.summary || '요약',
        keyInfo: t.keyInfo || '주요 정보'
    };

    // 탭 자동 스크롤 함수
    const scrollToActiveTab = (section: ResultSection) => {
        const tabElement = tabRefs.current[section];
        const containerElement = tabContainerRef.current;
        
        if (tabElement && containerElement) {
            const containerRect = containerElement.getBoundingClientRect();
            const tabRect = tabElement.getBoundingClientRect();
            
            // 탭이 컨테이너 밖에 있으면 스크롤
            const scrollLeft = tabElement.offsetLeft - (containerElement.offsetWidth / 2) + (tabElement.offsetWidth / 2);
            
            containerElement.scrollTo({
                left: scrollLeft,
                behavior: 'smooth'
            });
        }
    };

    // activeSection이 변경될 때마다 탭 스크롤
    useEffect(() => {
        if (result) {
            scrollToActiveTab(activeSection);
        }
    }, [activeSection, result]);

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            setError(t.imageOnly);
            return;
        }

        if (file.size > 20 * 1024 * 1024) {
            setError(t.fileSizeLimit);
            return;
        }

        setSelectedFile(file);
        setError(null);
        setResult(null);

        const reader = new FileReader();
        reader.onload = (e) => {
            setPreviewUrl(e.target?.result as string);
        };
        reader.readAsDataURL(file);
    };

    const handleAnalyze = async () => {
        if (!selectedFile) return;

        setIsAnalyzing(true);
        setError(null);

        try {
            const formData = new FormData();
            formData.append('file', selectedFile);

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/v1/ocr/analyze?source_lang=${sourceLang}&target_lang=${targetLang}`,
                {
                    method: 'POST',
                    body: formData,
                }
            );

            if (!response.ok) {
                throw new Error(t.analysisFailed);
            }

            const data = await response.json();
            
            if (data.success && data.data) {
                setResult(data.data);
                setActiveSection('document');
            } else {
                throw new Error(data.message || t.analysisFailed);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : t.analysisFailed);
        } finally {
            setIsAnalyzing(false);
        }
    };

    const handleReset = () => {
        setSelectedFile(null);
        setPreviewUrl(null);
        setResult(null);
        setError(null);
        setActiveSection('document');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    // 스와이프 핸들러
    const handleSwipe = (event: any, info: PanInfo) => {
        const threshold = 50;
        const currentIndex = sections.indexOf(activeSection);

        if (info.offset.x > threshold && currentIndex > 0) {
            setSwipeDirection(-1);
            setActiveSection(sections[currentIndex - 1]);
        } else if (info.offset.x < -threshold && currentIndex < sections.length - 1) {
            setSwipeDirection(1);
            setActiveSection(sections[currentIndex + 1]);
        }
    };

    const goToSection = (section: ResultSection) => {
        const currentIndex = sections.indexOf(activeSection);
        const targetIndex = sections.indexOf(section);
        setSwipeDirection(targetIndex > currentIndex ? 1 : -1);
        setActiveSection(section);
    };

    const goToPrevSection = () => {
        const currentIndex = sections.indexOf(activeSection);
        if (currentIndex > 0) {
            setSwipeDirection(-1);
            setActiveSection(sections[currentIndex - 1]);
        }
    };

    const goToNextSection = () => {
        const currentIndex = sections.indexOf(activeSection);
        if (currentIndex < sections.length - 1) {
            setSwipeDirection(1);
            setActiveSection(sections[currentIndex + 1]);
        }
    };

    // 섹션 컨텐츠 렌더링
    const renderSectionContent = () => {
        if (!result) return null;

        const slideVariants = {
            enter: (direction: number) => ({
                x: direction > 0 ? 1000 : -1000,
                opacity: 0
            }),
            center: {
                zIndex: 1,
                x: 0,
                opacity: 1
            },
            exit: (direction: number) => ({
                zIndex: 0,
                x: direction < 0 ? 1000 : -1000,
                opacity: 0
            })
        };

        return (
            <AnimatePresence initial={false} custom={swipeDirection} mode="wait">
                <motion.div
                    key={activeSection}
                    custom={swipeDirection}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                        x: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.2 }
                    }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={1}
                    onDragEnd={handleSwipe}
                    className="w-full"
                >
                    {activeSection === 'document' && (
                        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                            <h3 className="text-blue-400 font-semibold mb-2 flex items-center gap-2">
                                <FileText size={18} />
                                {t.documentType}
                            </h3>
                            <p className="text-white text-lg font-medium">{result.document_type}</p>
                        </div>
                    )}

                    {activeSection === 'original' && (
                        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                            <h3 className="text-gray-400 font-semibold mb-3">
                                {t.originalText} ({result.source_lang.toUpperCase()})
                            </h3>
                            <div className="bg-gray-950 border border-gray-800 rounded-lg p-4 max-h-96 overflow-y-auto">
                                <pre className="text-white text-sm whitespace-pre-wrap font-mono leading-relaxed">
                                    {result.original_text}
                                </pre>
                            </div>
                        </div>
                    )}

                    {activeSection === 'translated' && (
                        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                            <h3 className="text-blue-400 font-semibold mb-3">
                                {t.translatedText} ({result.target_lang.toUpperCase()})
                            </h3>
                            <div className="bg-blue-950/30 border border-blue-800/50 rounded-lg p-4 max-h-96 overflow-y-auto">
                                <pre className="text-white text-sm whitespace-pre-wrap leading-relaxed">
                                    {result.translated_text}
                                </pre>
                            </div>
                        </div>
                    )}

                    {activeSection === 'summary' && (
                        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                            <h3 className="text-green-400 font-semibold mb-3">{t.summary}</h3>
                            <p className="text-gray-300 leading-relaxed">{result.summary}</p>
                        </div>
                    )}

                    {activeSection === 'keyInfo' && (
                        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                            <h3 className="text-purple-400 font-semibold mb-4">{t.keyInfo}</h3>
                            {Object.keys(result.key_info).length > 0 ? (
                                <div className="space-y-3">
                                    {result.key_info.company && (
                                        <div className="flex gap-3">
                                            <span className="text-gray-500 min-w-20">{t.company}:</span>
                                            <span className="text-white">{result.key_info.company}</span>
                                        </div>
                                    )}
                                    {result.key_info.date && (
                                        <div className="flex gap-3">
                                            <span className="text-gray-500 min-w-20">{t.date}:</span>
                                            <span className="text-white">{result.key_info.date}</span>
                                        </div>
                                    )}
                                    {result.key_info.amount && (
                                        <div className="flex gap-3">
                                            <span className="text-gray-500 min-w-20">{t.amount}:</span>
                                            <span className="text-white">{result.key_info.amount}</span>
                                        </div>
                                    )}
                                    {result.key_info.period && (
                                        <div className="flex gap-3">
                                            <span className="text-gray-500 min-w-20">{t.period}:</span>
                                            <span className="text-white">{result.key_info.period}</span>
                                        </div>
                                    )}
                                    {result.key_info.conditions && result.key_info.conditions.length > 0 && (
                                        <div className="flex gap-3">
                                            <span className="text-gray-500 min-w-20">{t.conditions}:</span>
                                            <ul className="text-white space-y-1 flex-1">
                                                {result.key_info.conditions.map((condition, idx) => (
                                                    <li key={idx} className="flex items-start gap-2">
                                                        <span className="text-blue-500 mt-1">•</span>
                                                        <span>{condition}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <p className="text-gray-500 text-sm">
                                    {t.noInfo || '정보가 없습니다.'}
                                </p>
                            )}
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>
        );
    };

    return (
        <>
            <Header title={t.title} subtitle={t.subtitle} showBack={true} />
            
            <main className="pt-20 pb-24 px-4 min-h-screen bg-gray-950">
                <div className="max-w-4xl mx-auto space-y-6">
                    
                    {/* 언어 선택 */}
                    {!result && (
                        <div className="bg-gradient-to-br from-blue-600 to-blue-700 border-2 border-blue-500 rounded-xl p-6 shadow-lg shadow-blue-500/20">
                            <h3 className="text-white font-bold mb-4 flex items-center gap-2 text-lg">
                                <div className="bg-white/20 p-2 rounded-lg">
                                    <Globe size={24} className="text-white" />
                                </div>
                                {t.languageSettings}
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-blue-100 font-semibold mb-2">
                                        {t.sourceLang}
                                    </label>
                                    <select
                                        value={sourceLang}
                                        onChange={(e) => setSourceLang(e.target.value)}
                                        className="w-full bg-gray-900 border border-gray-700 text-white rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-white focus:border-white"
                                    >
                                        <option value="ko">{t.languages.ko}</option>
                                        <option value="en">{t.languages.en}</option>
                                        <option value="vi">{t.languages.vi}</option>
                                        <option value="ne">{t.languages.ne}</option>
                                        <option value="km">{t.languages.km}</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm text-blue-100 font-semibold mb-2">
                                        {t.targetLang}
                                    </label>
                                    <select
                                        value={targetLang}
                                        onChange={(e) => setTargetLang(e.target.value)}
                                        className="w-full bg-gray-900 border border-gray-700 text-white rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-white focus:border-white"
                                    >
                                        <option value="ko">{t.languages.ko}</option>
                                        <option value="en">{t.languages.en}</option>
                                        <option value="vi">{t.languages.vi}</option>
                                        <option value="ne">{t.languages.ne}</option>
                                        <option value="km">{t.languages.km}</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 업로드 영역 */}
                    {!previewUrl && !result && (
                        <div className="bg-gradient-to-br from-cyan-500 via-teal-500 to-emerald-500 border-2 border-cyan-400 rounded-xl p-2 shadow-xl shadow-cyan-500/30">
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleFileSelect}
                                className="hidden"
                            />
                            
                            <div
                                onClick={() => fileInputRef.current?.click()}
                                className="bg-gray-950/80 backdrop-blur-sm border-2 border-dashed border-cyan-300 rounded-lg p-12 text-center cursor-pointer hover:border-white hover:bg-gray-900/80 transition-all duration-300 group"
                            >
                                <div className="flex flex-col items-center gap-4">
                                    <div className="bg-gradient-to-br from-cyan-400 to-teal-500 p-6 rounded-full group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-cyan-500/50">
                                        <Upload size={48} className="text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-bold text-xl mb-2 group-hover:text-cyan-300 transition-colors">
                                            {t.uploadImage}
                                        </h3>
                                        <p className="text-cyan-200 text-sm mb-1">
                                            {t.uploadDesc}
                                        </p>
                                        <p className="text-cyan-300 text-xs font-semibold bg-cyan-900/30 px-4 py-1 rounded-full inline-block">
                                            {t.fileFormat}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 미리보기 및 분석 버튼 */}
                    {previewUrl && !result && (
                        <div className="bg-gray-900 border-2 border-cyan-500 rounded-xl overflow-hidden shadow-xl shadow-cyan-500/20">
                            <div className="relative">
                                <img
                                    src={previewUrl}
                                    alt="Preview"
                                    className="w-full max-h-96 object-contain bg-gray-950"
                                />
                                <button
                                    onClick={handleReset}
                                    className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-colors shadow-lg"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                            
                            <div className="p-6 space-y-4 bg-gradient-to-b from-gray-900 to-gray-950">
                                <div className="flex items-center gap-2 text-sm text-cyan-300 bg-cyan-900/20 px-4 py-2 rounded-lg border border-cyan-800">
                                    <FileText size={16} />
                                    <span className="font-medium">{selectedFile?.name}</span>
                                    <span className="text-cyan-600">•</span>
                                    <span>{(selectedFile!.size / 1024).toFixed(1)} KB</span>
                                </div>

                                <button
                                    onClick={handleAnalyze}
                                    disabled={isAnalyzing}
                                    className="w-full bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 disabled:from-gray-700 disabled:to-gray-700 text-white font-bold py-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:scale-[1.02]"
                                >
                                    {isAnalyzing ? (
                                        <>
                                            <Loader2 size={20} className="animate-spin" />
                                            {t.analyzing}
                                        </>
                                    ) : (
                                        <>
                                            <Camera size={20} />
                                            {t.startAnalysis}
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    )}

                    {/* 에러 메시지 */}
                    {error && (
                        <div className="bg-red-500/10 border-2 border-red-500 rounded-xl p-4 flex items-start gap-3 shadow-lg shadow-red-500/20">
                            <AlertCircle size={20} className="text-red-500 mt-0.5 flex-shrink-0" />
                            <div>
                                <h4 className="text-red-400 font-semibold">{t.error}</h4>
                                <p className="text-red-300 text-sm mt-1">{error}</p>
                            </div>
                        </div>
                    )}

                    {/* 분석 결과 - 스와이프 버전 */}
                    {result && (
                        <div className="space-y-4">
                            {/* 성공 메시지 */}
                            <div className="bg-green-500/10 border-2 border-green-500 rounded-xl p-4 flex items-center gap-3 shadow-lg shadow-green-500/20">
                                <CheckCircle size={20} className="text-green-500" />
                                <div className="flex-1">
                                    <h4 className="text-green-400 font-semibold">{t.analysisComplete}</h4>
                                    <p className="text-green-300 text-sm">
                                        {t.confidence}: {(result.confidence * 100).toFixed(0)}%
                                    </p>
                                </div>
                                <button
                                    onClick={handleReset}
                                    className="bg-gradient-to-r from-gray-800 to-gray-700 hover:from-gray-700 hover:to-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-md"
                                >
                                    {t.analyzeNew}
                                </button>
                            </div>

                            {/* 미리보기 이미지 */}
                            {previewUrl && (
                                <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
                                    <img
                                        src={previewUrl}
                                        alt="Analyzed"
                                        className="w-full max-h-48 object-contain bg-gray-950 rounded-lg"
                                    />
                                </div>
                            )}

                            {/* 탭 네비게이션 - ref 추가 */}
                            <div className="bg-gray-900 border border-gray-800 rounded-xl p-2 overflow-x-auto scrollbar-hide" ref={tabContainerRef}>
                                <div className="flex gap-2 min-w-max">
                                    {sections.map((section) => (
                                        <button
                                            key={section}
                                            ref={(el) => {
                                                if (el) tabRefs.current[section] = el;
                                            }}
                                            onClick={() => goToSection(section)}
                                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                                                activeSection === section
                                                    ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-white shadow-lg scale-105'
                                                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
                                            }`}
                                        >
                                            {sectionTitles[section]}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* 스와이프 가능한 컨텐츠 영역 */}
                            <div className="relative">
                                {/* 이전/다음 버튼 - 더 눈에 띄게 개선 */}
                                <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between pointer-events-none z-10 px-2">
                                    <button
                                        onClick={goToPrevSection}
                                        disabled={sections.indexOf(activeSection) === 0}
                                        className={`pointer-events-auto bg-cyan-500/90 hover:bg-cyan-600/90 text-white p-3 rounded-full transition-all shadow-xl backdrop-blur-sm hover:scale-110 ${
                                            sections.indexOf(activeSection) === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100'
                                        }`}
                                    >
                                        <ChevronLeft size={24} strokeWidth={3} />
                                    </button>
                                    <button
                                        onClick={goToNextSection}
                                        disabled={sections.indexOf(activeSection) === sections.length - 1}
                                        className={`pointer-events-auto bg-cyan-500/90 hover:bg-cyan-600/90 text-white p-3 rounded-full transition-all shadow-xl backdrop-blur-sm hover:scale-110 ${
                                            sections.indexOf(activeSection) === sections.length - 1 ? 'opacity-0 pointer-events-none' : 'opacity-100'
                                        }`}
                                    >
                                        <ChevronRight size={24} strokeWidth={3} />
                                    </button>
                                </div>

                                {/* 컨텐츠 */}
                                <div className="min-h-[300px]">
                                    {renderSectionContent()}
                                </div>

                                {/* 스와이프 인디케이터 */}
                                <div className="flex justify-center gap-2 mt-4">
                                    {sections.map((section) => (
                                        <button
                                            key={section}
                                            onClick={() => goToSection(section)}
                                            className={`h-2 rounded-full transition-all ${
                                                activeSection === section
                                                    ? 'w-8 bg-gradient-to-r from-cyan-500 to-teal-500'
                                                    : 'w-2 bg-gray-700 hover:bg-gray-600'
                                            }`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            {/* 스크롤바 숨기기 스타일 */}
            <style jsx global>{`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </>
    );
}