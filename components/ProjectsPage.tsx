import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { DynamicNavigation } from './DynamicNavigation';
import { PixelCard } from './PixelCard';

interface ProjectsPageProps {
    onNavigate: (view: string) => void;
    toggleTheme: () => void;
    isDark: boolean;
}

const PROJECTS = [
    {
        title: "SecureRAG",
        desc: "Prompt injection & data poisoning detection layer for RAG pipelines with entropy-based anomaly scoring, embedding confidence gating, and FastAPI serving to block malicious context before LLM inference.",
        tags: ["Python", "FastAPI", "LangChain", "FAISS"],
        image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&q=80",
        github: "https://github.com/Alanperry1/SecureRAG"
    },
    {
        title: "Distributed Key-Value Store",
        desc: "Dynamo-inspired distributed KV store in Rust with consistent hashing, tunable quorum replication, vector-clock versioning, and SWIM gossip-based failure detection.",
        tags: ["Rust", "Tokio", "gRPC", "Protocol Buffers"],
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
        github: "https://github.com/Alanperry1/rkv"
    },
    {
        title: "FeedFlow",
        desc: "AI-powered customer feedback analytics built entirely on Cloudflare's Developer Platform with sentiment analysis, multi-factor priority scoring, and similarity clustering.",
        tags: ["Cloudflare Workers", "D1", "TypeScript", "React"],
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
        github: "https://github.com/Alanperry1/feedflow"
    },
    {
        title: "ReqSim",
        desc: "Lightweight Python package for benchmarking and load testing APIs using async HTTP requests — instant performance insights without heavy tools like JMeter.",
        tags: ["Python", "asyncio", "httpx", "MIT License"],
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
        github: "https://github.com/Alanperry1/ReqSim"
    },
    {
        title: "AstroML Gamma Classifier",
        desc: "Classifies cosmic particle events from the MAGIC Gamma Telescope into gamma rays or hadrons using KNN, Naïve Bayes, Logistic Regression, and SVM.",
        tags: ["Python", "scikit-learn", "Jupyter", "ML"],
        image: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&q=80",
        github: "https://github.com/Alanperry1/AstroML-Gamma-vs-Hadron-Classifier"
    },
    {
        title: "Refraction — Eye Prescription System",
        desc: "Comprehensive eye prescription management dashboard for optometrists to create, view, edit, and share patient records, with Mailjet and Perplexity AI integration.",
        tags: ["TypeScript", "React", "Node.js", "PostgreSQL"],
        image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
        github: "https://github.com/Alanperry1/Refraction-Team"
    },
    {
        title: "Stochastic Portfolio Valuation",
        desc: "Python financial modeling tool using stochastic simulations to estimate portfolio value trajectories, visualize uncertainty, and analyze risk over time.",
        tags: ["Python", "NumPy", "Matplotlib", "Monte Carlo"],
        image: "https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=800&q=80",
        github: "https://github.com/Alanperry1/Stochastic-Portfolio-Valuation-Model"
    },
    {
        title: "Forex Trading Bot",
        desc: "Trading system that analyzed 1.5GB of forex data to identify 1.5K+ profitable setups and achieve 26% ROI using pattern recognition and backtesting.",
        tags: ["Python", "NumPy", "Pandas", "Chart.js"],
        image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",
        github: "https://github.com/Alanperry1/forex-bot"
    }
];

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ onNavigate, toggleTheme, isDark }) => {
    const triggerRef = useRef<HTMLDivElement>(null);

    return (
        <>
            <DynamicNavigation
                triggerRef={triggerRef}
                toggleTheme={toggleTheme}
                isDark={isDark}
                onNavigate={onNavigate}
                currentView="projects"
                enableIsland={false}
            />

            <main className="px-6 pt-32 md:pt-48 pb-4 relative z-10 max-w-5xl mx-auto min-h-screen">

                {/* Header */}
                <div ref={triggerRef} className="mb-20">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-5xl md:text-8xl font-serif text-gray-900 dark:text-white mb-6"
                    >
                        Selected Work
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl font-light"
                    >
                        A collection of software, cloud, and machine learning projects focused on scalability, security, and applied AI.
                    </motion.p>
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16 mb-8">
                    {PROJECTS.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 + (index * 0.1) }}
                            className="group cursor-pointer"
                        >
                            <div className="relative aspect-[4/3] mb-6 overflow-hidden rounded-2xl bg-gray-100 dark:bg-[#111]">
                                <PixelCard
                                    image={project.image}
                                    title={project.title}
                                    desc={project.desc}
                                    tags={project.tags}
                                    className="w-full h-full"
                                />

                                <div className="absolute top-4 right-4 bg-white/90 dark:bg-black/80 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 z-30 pointer-events-none">
                                    <ArrowUpRight className="w-5 h-5 text-black dark:text-white" />
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <div className="flex justify-between items-baseline">
                                    <h3 className="text-2xl font-serif font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                        {project.title}
                                    </h3>
                                    <div className="flex gap-2">
                                        {project.tags.slice(0, 2).map(tag => (
                                            <span key={tag} className="text-[10px] uppercase font-bold tracking-widest text-gray-400 border border-gray-200 dark:border-white/10 px-2 py-1 rounded-md">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed line-clamp-2">
                                    {project.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>


            </main>
        </>
    );
};