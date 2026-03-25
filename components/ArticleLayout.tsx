
import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Timeline from './Timeline';
import { DynamicNavigation } from './DynamicNavigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import BackIcon from './icons/BackIcon';

export interface ArticleSection {
    id: string;
    title: string;
}

interface ArticleLayoutProps {
    onNavigate: (view: string, id?: string) => void;
    toggleTheme: () => void;
    isDark: boolean;
    sections: ArticleSection[];
    title: string;
    date: string;
    category?: string;
    children: React.ReactNode;
    prevArticle?: { title: string; id: string };
    nextArticle?: { title: string; id: string };
}

export const ArticleLayout: React.FC<ArticleLayoutProps> = ({
    onNavigate,
    toggleTheme,
    isDark,
    sections,
    title,
    date,
    category = "Development",
    children,
    prevArticle,
    nextArticle
}) => {
    const triggerRef = useRef<HTMLHeadingElement>(null);
    const [activeSection, setActiveSection] = useState<string | null>(sections[0]?.id || null);

    // Scroll Spy Logic
    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '-40% 0px -40% 0px',
            threshold: 0
        };

        const handleIntersect = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(handleIntersect, observerOptions);

        sections.forEach(({ id }) => {
            const element = document.getElementById(id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, [sections]);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            // Offset for the fixed header
            const y = element.getBoundingClientRect().top + window.scrollY - 140;
            window.scrollTo({ top: y, behavior: 'smooth' });
            setActiveSection(id);
        }
    };

    return (
        <>
            <DynamicNavigation
                triggerRef={triggerRef}
                toggleTheme={toggleTheme}
                isDark={isDark}
                sections={sections}
                activeSectionId={activeSection}
                onSectionClick={scrollToSection}
                onNavigate={onNavigate}
                currentView="blog-post"
                enableIsland={true}
            />

            <Timeline
                sections={sections}
                activeId={activeSection}
                onSectionClick={scrollToSection}
            />

            <main className="px-6 md:px-0 pt-12 md:pt-20 relative z-10 max-w-4xl mx-auto">
                {/* Top Navigation Bar */}
                <div className="max-w-2xl mx-auto mb-6 flex items-center justify-between pointer-events-none mix-blend-difference filter invert dark:invert-0">
                    <button
                        onClick={() => onNavigate('blogs')}
                        className="pointer-events-auto flex items-center gap-2 p-1.5 pr-3 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors group"
                        title="Go Back"
                    >
                        <div className="p-1">
                            <BackIcon size={20} />
                        </div>
                        <span className="text-xs font-medium">Back</span>
                    </button>
                </div>

                {/* Helper Header Component to keep code clean */}
                <header id={sections[0]?.id || 'top'} className="max-w-2xl mx-auto mb-20 text-center md:text-left">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ type: "spring", stiffness: 200, damping: 20, mass: 1 }}
                    >
                        <div className="flex items-center justify-center md:justify-start gap-3 mb-6">
                            <span className="bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-white/80 px-3 py-1 rounded-full text-xs font-medium border border-gray-200 dark:border-white/5">
                                {category}
                            </span>
                            <span className="text-gray-500 text-xs font-mono uppercase">{date}</span>
                        </div>

                        <h1
                            ref={triggerRef}
                            className="text-5xl md:text-7xl font-serif leading-[1.1] mb-8 bg-clip-text text-transparent bg-gradient-to-b from-gray-900 to-gray-600 dark:from-white dark:to-white/60"
                        >
                            {title}
                        </h1>
                    </motion.div>
                </header>

                {/* Article Content */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 1 }}
                    className="prose prose-lg max-w-2xl mx-auto pb-8 dark:prose-invert"
                >
                    {children}
                </motion.div>

                {/* Navigation & Visitor Counter */}
                <div className="max-w-4xl mx-auto mt-0 border-t border-gray-200 dark:border-white/10 pt-12 pb-8 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">

                    {/* Previous Button (Left) */}
                    <div className="w-full md:w-auto order-2 md:order-1 flex justify-center md:justify-end">
                        {prevArticle ? (
                            <button
                                onClick={() => onNavigate('blog-post', prevArticle.id)}
                                className="group flex flex-col items-center md:items-end gap-1 text-center md:text-right"
                            >
                                <span className="text-xs font-mono text-gray-400 uppercase tracking-widest">Previous</span>
                                <div className="flex items-center gap-2 text-base font-serif font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                    <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
                                    {prevArticle.title}
                                </div>
                            </button>
                        ) : <div className="hidden md:block w-40" />}
                    </div>

                    {/* Visitor Counter (Center) */}
                    <div className="order-1 md:order-2 shrink-0">
                    </div>

                    {/* Next Button (Right) */}
                    <div className="w-full md:w-auto order-3 flex justify-center md:justify-start">
                        {nextArticle ? (
                            <button
                                onClick={() => onNavigate('blog-post', nextArticle.id)}
                                className="group flex flex-col items-center md:items-start gap-1 text-center md:text-left"
                            >
                                <span className="text-xs font-mono text-gray-400 uppercase tracking-widest">Next</span>
                                <div className="flex items-center gap-2 text-base font-serif font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                    {nextArticle.title}
                                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                                </div>
                            </button>
                        ) : <div className="hidden md:block w-40" />}
                    </div>

                </div>
            </main>
        </>
    );
};
