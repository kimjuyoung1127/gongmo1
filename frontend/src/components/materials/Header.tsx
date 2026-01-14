'use client';

import { useState } from 'react';
import { ArrowLeft, Menu, X, Home, FileText, Wrench, User } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useLang } from '@/contexts/DictionaryContext';
import { LanguageSelector } from '@/components/molecules/LanguageSelector';
import Link from 'next/link';

interface HeaderProps {
    title?: string;
    subtitle?: string;
    showBack?: boolean;
    rightElement?: React.ReactNode;
}

export const Header = ({ title = 'LinkON', subtitle, showBack = false, rightElement }: HeaderProps) => {
    const router = useRouter();
    const pathname = usePathname();
    const { isAuthenticated, user, logout } = useAuth();
    const lang = useLang();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navItems = [
        { label: 'Home', href: `/${lang}`, icon: Home },
        { label: 'Community', href: `/${lang}/community`, icon: FileText },
        { label: 'Tools', href: `/${lang}/tools`, icon: Wrench },
        { label: 'My Page', href: `/${lang}/mypage`, icon: User },
    ];

    const handleLogin = () => {
        setIsMenuOpen(false);
        router.push(`/${lang}/login`);
    };

    const handleLogout = () => {
        setIsMenuOpen(false);
        logout();
    };

    return (
        <>
            <header className="fixed top-0 left-0 right-0 bg-gray-900 border-b border-gray-800 z-50 px-4 py-3">
                <div className="flex items-center justify-between max-w-7xl mx-auto">
                    <div className="flex items-center gap-8">
                        <div className="flex items-center gap-3">
                            {showBack && (
                                <button
                                    onClick={() => router.back()}
                                    className="p-1 text-white hover:bg-gray-800 rounded-full transition-colors"
                                >
                                    <ArrowLeft size={24} />
                                </button>
                            )}
                            <div>
                                <h1 className="text-lg font-bold text-white cursor-pointer" onClick={() => router.push(`/${lang}`)}>{title}</h1>
                                {subtitle && <p className="text-xs text-blue-400 font-medium">{subtitle}</p>}
                            </div>
                        </div>

                        {/* Desktop Navigation Links */}
                        <nav className="hidden md:flex items-center gap-6">
                            {navItems.map((item) => {
                                const isActive = pathname === item.href || (item.href !== `/${lang}` && pathname.startsWith(item.href));
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={`text-sm font-medium transition-colors hover:text-blue-500 ${isActive ? 'text-blue-500' : 'text-gray-400'
                                            }`}
                                    >
                                        {item.label}
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>

                    {/* Desktop Right Side View */}
                    <div className="hidden md:flex items-center gap-4">
                        <LanguageSelector className="scale-90" />
                        {isAuthenticated ? (
                            <div className="flex items-center gap-3">
                                <Link
                                    href={`/${lang}/mypage`}
                                    className="text-sm text-gray-300 hover:text-white transition-colors"
                                >
                                    {user?.nickname}
                                </Link>
                                <button onClick={logout} className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <button onClick={() => router.push(`/${lang}/login`)} className="text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 px-4 py-1.5 rounded-full transition-colors">
                                Login
                            </button>
                        )}
                        {rightElement}
                    </div>

                    {/* Mobile Hamburger */}
                    <div className="md:hidden flex items-center">
                        {rightElement}
                        <button
                            onClick={() => setIsMenuOpen(true)}
                            className="p-1 text-white hover:bg-gray-800 rounded-lg ml-2"
                        >
                            <Menu size={24} />
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div className="fixed inset-0 z-[60] md:hidden">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={() => setIsMenuOpen(false)}
                    />

                    {/* Menu Content */}
                    <div className="absolute right-0 top-0 bottom-0 w-64 bg-gray-900 border-l border-gray-800 shadow-xl p-5 transform transition-transform duration-300 ease-in-out">
                        <div className="flex justify-between items-center mb-8">
                            <span className="text-lg font-bold text-white">Menu</span>
                            <button
                                onClick={() => setIsMenuOpen(false)}
                                className="text-gray-400 hover:text-white"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <div className="space-y-6">
                            {/* Auth Section */}
                            <div className="flex flex-col gap-3">
                                {isAuthenticated ? (
                                    <>
                                        <Link
                                            href={`/${lang}/mypage`}
                                            onClick={() => setIsMenuOpen(false)}
                                            className="flex items-center gap-3 bg-gray-800 rounded-lg p-3"
                                        >
                                            {user?.avatarUrl && (
                                                <img src={user.avatarUrl} alt="" className="w-8 h-8 rounded-full bg-gray-700" />
                                            )}
                                            <span className="text-white font-medium">{user?.nickname || 'User'}</span>
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full py-2.5 text-center text-white bg-red-600/20 hover:bg-red-600/30 border border-red-600/50 rounded-lg transition-colors font-medium"
                                        >
                                            Logout
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        onClick={() => {
                                            setIsMenuOpen(false);
                                            router.push(`/${lang}/login`);
                                        }}
                                        className="w-full py-2.5 text-center text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors font-bold"
                                    >
                                        Login
                                    </button>
                                )}
                            </div>

                            <div className="h-px bg-gray-800" />

                            {/* Language Section */}
                            <div>
                                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Language</h3>
                                <div className="bg-gray-800 rounded-lg p-2">
                                    <LanguageSelector className="w-full" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Header;
