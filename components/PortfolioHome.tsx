import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Github, Eye, ArrowRight, FileText, ChevronDown, ChevronRight, Copy, Check } from 'lucide-react';

import { cn, triggerHaptic } from '../lib/utils';
import { ScrollReveal } from './ScrollReveal';
import { DynamicNavigation } from './DynamicNavigation';
import Timeline from './Timeline';
import RunStatsStacks from './RunStatsStacks';
import LabelIndicatorCarousel from './LabelIndicatorCarousel';
import { ToolsDock } from './ui/ToolsDock';

import { RainbowButton } from './RainbowButton';
import { NativeTypewriter } from './ui/NativeTypewriter';


import { NativeMagnetic } from './ui/NativeMagnetic';
import profilePic from '../XPFP.webp';
import { SKILLS } from './ArraySkills';
import { ProjectCard } from './ui/ProjectCard'; // Import new ProjectCard
import { SkillsMarquee } from './ui/SkillsMarquee';
import { GitHubStarsButton } from './ui/GitHubStarsButton';
import { SkillIcon } from './ui/SkillIcon';
import { WorkTimeline } from './ui/WorkTimeline';
import { VerifiedBadge } from './ui/NativeVerifiedBadge';
import { LocationIndicator } from './ui/LocationIndicator';
import { ScrollFillText } from './ui/ScrollFillText';

interface PortfolioHomeProps {
    onNavigate: (view: string, id?: string) => void;
    toggleTheme: () => void;
    isDark: boolean;
}

const SECTIONS = [
    { id: 'about', title: 'About' },
    { id: 'work', title: 'Work Experience' },
    { id: 'education', title: 'Education' },
    { id: 'certifications', title: 'Certifications' },
    { id: 'activities', title: 'Activities' },
    { id: 'skills', title: 'Tech Stack' },
    { id: 'articles', title: 'Research & Publications' },
    { id: 'projects', title: 'Projects' },
    { id: 'contact', title: 'Contact' },
];

const EXPERIENCE_DATA = [
    {
        role: "Open Source Contributor",
        company: "OpenAI (Codex Actions) & Meta (Detectron2)",
        date: "Dec 2025 - Present",
        logo: "/AppIcons/meta-logo.svg",
        desc: "Improving developer tooling, reliability, and CI/CD security in widely used open-source projects.",
        details: [
            "Improved Detectron2 debuggability by replacing bare assertions with typed exceptions and actionable error messages.",
            "Hardened Codex CI/CD against command injection and added opt-in sticky pull-request status comments.",
            "Prevented TOML corruption by replacing regex rewrites with idempotent marker-block removal and strict port validation."
        ]
    },
    {
        role: "Machine Learning Researcher",
        company: "Argonne National Laboratory",
        date: "Aug 2026 - Sep 2026",
        logo: undefined,
        desc: "Built and evaluated short-term energy-load forecasting pipelines in PyTorch.",
        details: [
            "Raised R² from 0.17 to 0.73 on a 5,500+ household energy dataset using grid and Bayesian hyperparameter search.",
            "Benchmarked activations, optimizers, and architectures on BuildingsBench, reducing RMSE by 45%."
        ]
    },
    {
        role: "Software Engineer Intern",
        company: "Uber",
        date: "May 2026 - Aug 2026",
        logo: "https://cdn.simpleicons.org/uber/09D3AC",
        desc: "Built an AI-assisted runbook discovery and ticket automation system on AWS.",
        details: [
            "Created an AWS Bedrock and Lambda agent that saved 100+ engineering hours each month in ticket research and analysis.",
            "Architected a serverless RAG pipeline over 25K+ internal pages, improving response accuracy by 75%.",
            "Automated 30+ test, build, and deployment workflows using AWS CDK and TypeScript."
        ]
    },
    {
        role: "Software Engineer",
        company: "Georim",
        date: "Aug 2025 - Apr 2026",
        logo: "/AppIcons/georim-logo.svg",
        desc: "Shipped cloud video infrastructure, monitoring, and performance improvements.",
        details: [
            "Built a CloudFront video-processing system with CI/CD and autoscaling, saving $1.3K+ monthly and cutting latency below 40ms.",
            "Improved frontend performance and moved media assets to Cloudflare R2 to reduce page-load and origin-storage costs.",
            "Implemented Prometheus and Grafana monitoring and migrated core services to AWS for 10× peak-load capacity."
        ]
    },
    {
        role: "Machine Learning Engineer Intern",
        company: "National Science Foundation",
        date: "May 2025 - Jul 2025",
        logo: "/AppIcons/nsf-logo.svg",
        desc: "Developed real-time Business Email Compromise detection with psycholinguistic signals.",
        details: [
            "Built a gradient-boosting detection pipeline that improved accuracy by 8.8% for social-engineering phishing threats.",
            "Co-authored a framework achieving 99.55% AUC-ROC with sub-10ms latency for real-time SIEM integration."
        ]
    },
    {
        role: "Founding Engineer",
        company: "Stealth Startup",
        date: "Jun 2025 - Present",
        logo: "/AppIcons/stealth-startup-logo.svg",
        desc: "Built end-to-end cloud systems for video delivery, reliability, and security at scale.",
        details: [
            "Built a CloudFront-based video processing pipeline with GitHub Actions to ECR and CloudWatch autoscaling, reducing latency to under 40ms.",
            "Optimized Prisma migrations and indexing to cut average API response time from 480ms to 50ms.",
            "Migrated core services to AWS to support 10x peak load and improved production security through review of 50+ pull requests."
        ]
    },
    {
        role: "Research Assistant",
        company: "Grambling State University",
        date: "Feb 2025 - Feb 2026",
        logo: "/AppIcons/gsu-seal.svg",
        desc: "Built distributed research infrastructure for cybersecurity machine learning workloads.",
        details: [
            "Engineered Proxmox + Docker + Kubernetes infrastructure supporting distributed GPU workloads across 10+ nodes.",
            "Fine-tuned a 500M parameter LLM using QLoRA on 100K+ security datasets with 6x RTX 4080 GPUs.",
            "Reached 0.89 F1 score on security-focused model evaluation."
        ]
    },
    {
        role: "Open Source Contributor",
        company: "Meta",
        date: "Dec 2025 - Present",
        logo: "/AppIcons/meta-logo.svg",
        desc: "Contributed to Detectron2 by improving reliability, dependency hygiene, and observability.",
        details: [
            "Submitted 10+ pull requests with 2 merged into Detectron2 core modules.",
            "Filed 21 dependency-related issues spanning security, deprecated APIs, and CI/CD improvements.",
            "Implemented logging across 6 modules to improve debugging and error traceability."
        ]
    },
    {
        role: "Machine Learning Researcher",
        company: "National Science Foundation",
        date: "Aug 2025 - Oct 2025",
        logo: "/AppIcons/nsf-logo.svg",
        desc: "Built an ML pipeline for Business Email Compromise detection with psycholinguistic features.",
        details: [
            "Built a gradient-boosting BEC detection pipeline combining ML models with psycholinguistic indicators, improving detection accuracy by 8.8%.",
            "Authored comparative research paper evaluating XGBoost, LightGBM, CatBoost, Random Forest, and stacking ensembles for BEC detection, identifying key linguistic signals."
        ]
    },
    {
        role: "Product Manager",
        company: "Alliance4AI",
        date: "Dec 2024 - Apr 2025",
        logo: "/AppIcons/alliance4ai-logo.svg",
        desc: "Led product development for website redesign across a cross-functional team.",
        details: [
            "Led product development for website redesign across a 6-person cross-functional team over 9 weeks.",
            "Conducted competitive analysis of 10+ educational apps to guide feature improvements and user engagement strategy."
        ]
    },
    {
        role: "Software Engineering Intern",
        company: "Ideation Axis",
        date: "Jan 2024 - Jul 2024",
        logo: "/AppIcons/ideation-axis-logo.svg",
        desc: "Built MERN stack web apps and deployed microservices on AWS for clients at scale.",
        details: [
            "Built MERN stack web apps for 20+ clients, integrating Stripe API for $1.2M+ in transactions.",
            "Deployed 5 microservices on AWS EKS using RabbitMQ, Docker, Kubernetes, and JWT gateway, achieving 99.9% uptime and fully decoupled architecture."
        ]
    }
];

const ACTIVITIES_DATA = [
    {
        title: "Vice President",
        org: "Association for Computing Machinery (Grambling Chapter)",
        logo: "https://cdn.simpleicons.org/acm/0085CA",
        bullets: ["Led workshops, hackathons, and collaboration events to improve technical skills among members."]
    },
    {
        title: "Peer Reviewer",
        org: "ICANN 2026",
        logo: "/AppIcons/gsu-seal.svg",
        bullets: ["Reviewed four machine-learning papers, evaluating methodology, validity, and technical feedback."]
    },
    {
        title: "Data for Good Hackathon",
        org: "JPMorgan Chase & Co.",
        logo: "https://cdn.simpleicons.org/jpmorganchase/0066B3",
        bullets: ["Built a crime-intelligence pipeline across 80K+ Chicago and Philadelphia incidents, using XGBoost and transfer learning to forecast Delaware risk."]
    },
    {
        title: "Uber Career Prep Fellow",
        org: "Uber",
        logo: "https://cdn.simpleicons.org/uber/09D3AC",
        bullets: ["Selected for highly competitive SWE fellowship (top 1% of applicants) with mentorship, technical interview prep, and software engineering career development."]
    },
    {
        title: "HackMIT",
        org: "MIT",
        logo: "/AppIcons/mit-logo.svg",
        bullets: ["Built a prompt injection and data poisoning defense layer for RAG pipelines using entropy-based anomaly detection, embedding scoring, and uncertainty-gated retrieval filtering to block malicious context before LLM inference."]
    },
    {
        title: "Golden Pitch",
        org: "Grambling State University",
        logo: "/AppIcons/gsu-seal.svg",
        bullets: ["Pitched \"Goalie,\" an AI-powered subscription tracking app at Grambling's entrepreneurship competition."]
    },
    {
        title: "Bain & Company Kickstart Fellow",
        org: "Bain & Company",
        logo: "/AppIcons/bain-logo.svg",
        bullets: ["Selected for 2025 program focused on consulting exposure and case interview preparation."]
    },
    {
        title: "Goldman Sachs Virtual Insight Series",
        org: "Goldman Sachs",
        logo: "https://cdn.simpleicons.org/goldmansachs/1D62D7",
        bullets: ["Participated in sessions on financial services, markets, and early-career development."]
    },
    {
        title: "Notion Hackathon",
        org: "Grambling State University",
        logo: "/AppIcons/gsu-seal.svg",
        bullets: ["Built a Notion-based interactive dashboard for software engineers to track project milestones."]
    },
    {
        title: "Emerging Leaders for College Students Program",
        org: "Microsoft",
        logo: "/AppIcons/microsoft-logo.svg",
        bullets: ["Selected for Microsoft's Emerging Leaders program focused on technical and professional development."]
    },
    {
        title: "NVIDIA Summer Bridge Series",
        org: "NVIDIA",
        logo: "https://cdn.simpleicons.org/nvidia/76B900",
        bullets: ["Participated in NVIDIA's Summer Bridge Series covering GPU computing, AI infrastructure, and career development."]
    },
    {
        title: "REACH Participant",
        org: "Oracle",
        logo: "/AppIcons/oracle-logo.svg",
        bullets: ["Selected for Oracle's REACH program for underrepresented students in technology."]
    },
    {
        title: "Elevate to Innovate Externship",
        org: "Accenture",
        logo: "https://cdn.simpleicons.org/accenture/A100FF",
        bullets: ["Completed Accenture's Elevate to Innovate externship program focused on technology consulting and innovation."]
    }
];

const RESEARCH_DATA = [
    {
        type: "Preprint",
        year: "May 2026",
        title: "VLM: Variance Landscape Mapping for Heteroskedastic Reward Signals in Reinforcement Learning",
        summary: "A lightweight framework that separates aleatoric from epistemic uncertainty to make reinforcement-learning exploration more reliable under uneven reward noise.",
        abstract: "VLM estimates per-action reward variance online with Welford accumulators, applies a corrected exploration bonus, and uses an exploitation gate once variance stabilizes. It is evaluated across synthetic bandits, gridworlds, DQN, and real-world click-log data.",
        href: "https://www.researchgate.net/publication/403514064_VLM_Variance_Landscape_Mapping_for_Heteroskedastic_Reward_Signals_in_Reinforcement_Learning"
    },
    {
        type: "Research",
        year: "Apr 2026",
        title: "HELIX: A Multi-Method Framework for Heteroskedasticity Detection",
        summary: "A multi-method approach to detecting heteroskedasticity that addresses limitations of standard linear-regression diagnostics.",
        abstract: "HELIX investigates heteroskedasticity detection beyond a single global test, with methods designed to remain useful when variance relationships are nonlinear or sample sizes are limited.",
        href: "https://www.researchgate.net/publication/403504069_HELIX_A_Multi-Method_Framework_for_Heteroskedasticity_Detection"
    },
    {
        type: "Conference Paper",
        year: "Mar 2026",
        title: "Explain, Explain, Explain: Uncertainty-Explanation Alignment for EEG Models Under Artefact and Explainer Perturbations",
        summary: "A safety-focused framework for testing when AI explanations remain trustworthy under noisy biosignal conditions.",
        abstract: "The work treats explanations as safety-critical outputs, auditing whether predictive uncertainty aligns with perturbation-based attribution methods and proposing an abstain-to-explain control for unreliable cases.",
        href: "https://www.researchgate.net/publication/404395096_Explain_Explain_Explain_Uncertainty-Explanation_Alignment_for_EEG_Models_Under_Artefact_and_Explainer_Perturbations"
    },
    {
        type: "Research",
        year: "Nov 2025",
        title: "Machine Learning-Based Detection of Business Email Compromise: A Comparative Analysis of Gradient Boosting Techniques",
        summary: "Comparative study of gradient-boosting methods for Business Email Compromise detection using psycholinguistic features.",
        abstract: "The framework evaluates XGBoost, LightGBM, CatBoost, Random Forest, and stacking ensembles for content-centric BEC detection, with real-time SIEM deployment as a target use case.",
        href: "https://www.researchgate.net/publication/398019660_Machine_Learning-Based_Detection_of_Business_Email_Compromise_A_Comparative_Analysis_of_Gradient_Boosting_Techniques"
    }
];

export const PortfolioHome: React.FC<PortfolioHomeProps> = ({ onNavigate, toggleTheme, isDark }) => {
    const triggerRef = useRef<HTMLHeadingElement>(null);
    const [activeSection, setActiveSection] = useState<string | null>('about');
    const [hoveredProject, setHoveredProject] = useState<number | null>(null);
    const [expandedPaper, setExpandedPaper] = useState<number | null>(null);
    const [expandedActivity, setExpandedActivity] = useState<number | null>(null);

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

        SECTIONS.forEach(({ id }) => {
            const element = document.getElementById(id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, []);

    const scrollToSection = (id: string) => {
        triggerHaptic(5);
        const element = document.getElementById(id);
        if (element) {
            const offset = 120;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;
            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            setActiveSection(id);
        }
    };

    const handleNavWithHaptic = (view: string) => {
        triggerHaptic(10);
        onNavigate(view);
    };

    // Safe safe skills to prevent crash if import fails or undefined
    const safeSkills = Array.isArray(SKILLS) ? SKILLS : [];

    return (
        <>
            <DynamicNavigation
                triggerRef={triggerRef}
                toggleTheme={toggleTheme}
                isDark={isDark}
                sections={SECTIONS}
                activeSectionId={activeSection}
                onSectionClick={scrollToSection}
                onNavigate={onNavigate}
                currentView="home"
                enableIsland={true}
                shouldHideDock={activeSection === 'contact'}
            />

            {/* Timeline Sidebar (Desktop Only) */}
            <Timeline
                sections={SECTIONS}
                activeId={activeSection}
                onSectionClick={scrollToSection}
            />

            {/* --- BACKGROUND EFFECTS: Blue God Rays & Lighting (Extremely Subtle) --- */}
            <div className="absolute top-0 left-0 w-full h-[400px] z-0 overflow-hidden pointer-events-none select-none">
                {/* Main Blue Glow at Top Center - Reduced intensity significantly */}
                <div className="absolute -top-[350px] left-1/2 -translate-x-1/2 w-[80vw] md:w-[600px] h-[400px] bg-blue-500/5 dark:bg-blue-600/5 blur-[60px] rounded-[100%] mix-blend-screen opacity-20" />

                {/* God Rays / Conic Light Effect - Barely visible hint */}
                <div className="absolute -top-[250px] left-1/2 -translate-x-1/2 w-[100vw] h-[500px] bg-[conic-gradient(from_0deg_at_50%_-10%,transparent_45%,rgba(59,130,246,0.02)_49%,rgba(59,130,246,0.02)_51%,transparent_55%)] opacity-10 blur-3xl dark:opacity-5" />

                {/* Subtle Highlight Beam - Top line only */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[150px] bg-gradient-to-b from-blue-50/10 to-transparent dark:from-blue-500/5 dark:to-transparent blur-[40px] opacity-20 pointer-events-none" />
            </div>

            <main className="max-w-4xl mx-auto px-6 pt-12 md:pt-40 pb-6 relative z-10">

                {/* --- HERO / ABOUT SECTION --- */}
                <section id="about" className="mb-16 scroll-mt-32">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-8 md:gap-10">

                        {/* Profile Picture - Top on mobile, Right on desktop */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            drag
                            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                            dragElastic={0.2}
                            whileHover={{ scale: 1.05, cursor: "grab" }}
                            whileDrag={{ cursor: "grabbing", scale: 1.1 }}
                            className="relative shrink-0 w-24 md:w-[180px] md:order-last z-20 touch-none"
                        >
                            <div className="aspect-square w-full rounded-2xl border border-gray-200 dark:border-white/10 p-1 bg-white dark:bg-[#111] shadow-xl overflow-hidden pointer-events-none select-none">
                                <img
                                    src={profilePic}
                                    alt="Profile"
                                    className="w-full h-full rounded-xl object-cover pointer-events-none"
                                />
                                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-black dark:bg-white rounded-full flex items-center justify-center text-white dark:text-black font-serif text-[10px] border-2 border-white dark:border-black shadow-lg">
                                    S
                                </div>
                            </div>
                        </motion.div>

                        {/* Text Content */}
                        <div className="flex-1 flex flex-col justify-between self-stretch">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="flex flex-col h-full"
                            >
                                <div>
                                    <h1 ref={triggerRef} className="text-3xl md:text-4xl font-serif font-medium text-gray-900 dark:text-white mb-2 leading-tight text-balance flex flex-wrap items-center gap-2">
                                        Hi, I'm Baning Philip Amponsah
                                        <img src="/Twitter_Verified_Badge.svg.png" alt="Verified" className="w-[22px] h-[22px] md:w-[26px] md:h-[26px] mt-1.5 object-contain" />
                                    </h1>

                                    {/* Typewriter Role Text */}
                                    <div className="mb-2 h-10 md:h-12 flex items-center">
                                        <NativeTypewriter
                                            content={[
                                                "Founding Engineer",
                                                "Machine Learning Researcher",
                                                "Open Source Contributor",
                                                "Full Stack Developer",
                                                "Product Builder"
                                            ]}
                                            speed="medium"
                                            loop={true}
                                            className="text-lg md:text-2xl font-bold text-gray-400 dark:text-gray-500"
                                        />
                                    </div>

                                    <div className="prose dark:prose-invert prose-gray max-w-lg mb-6">
                                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm md:text-base text-pretty">
                                            I'm a Junior at Grambling State University studying Computer Science and Cybersecurity <LocationIndicator />. I build at the intersection of machine learning, cybersecurity, and systems engineering, with experience ranging from fine-tuning large language models to shipping production infrastructure. I've published two research papers, competed at HackMIT, and currently serve as a Founding Engineer, Open Source Contributor at Meta, and Research Assistant at Grambling State. I also bring production RAG experience from Uber, energy forecasting research from Argonne National Laboratory, and four ResearchGate publications.
                                        </p>
                                    </div>
                                </div>

                                {/* --- Affiliations Snippet --- */}
                                <div className="mt-4">
                                    <p className="text-[10px] uppercase tracking-widest text-gray-400 dark:text-gray-500 font-mono mb-3">Programs &amp; Fellowships</p>
                                    <div className="flex flex-wrap gap-2">
                                        {[
                                            { name: "Microsoft", logo: "/AppIcons/microsoft-logo.svg" },
                                            { name: "NVIDIA", logo: "https://cdn.simpleicons.org/nvidia/76B900" },
                                            { name: "Oracle", logo: "/AppIcons/oracle-logo.svg" },
                                            { name: "Accenture", logo: "https://cdn.simpleicons.org/accenture/A100FF" },
                                            { name: "Uber", logo: "https://cdn.simpleicons.org/uber/09D3AC" },
                                            { name: "Goldman Sachs", logo: "https://cdn.simpleicons.org/goldmansachs/1D62D7" },
                                            { name: "Bain & Co.", logo: "/AppIcons/bain-logo.svg" },
                                            
                                        ].map((item) => (
                                            <div key={item.name} className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 text-xs text-gray-600 dark:text-gray-300">
                                                {item.logo ? (
                                                    <img src={item.logo} alt={item.name} className="w-3.5 h-3.5 object-contain" />
                                                ) : (
                                                    <span className="w-3.5 h-3.5 rounded-full bg-gray-200 dark:bg-white/20 flex items-center justify-center text-[8px] font-bold text-gray-500 dark:text-gray-300">{item.name[0]}</span>
                                                )}
                                                {item.name}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>



                {/* --- WORK EXPERIENCE --- */}
                <section id="work" className="mb-16 scroll-mt-32">
                    <h2 className="text-2xl font-serif text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                        Work Experience
                        <div className="h-[1px] flex-1 bg-gray-200 dark:bg-white/10" />
                    </h2>
                    <div className="flex flex-col">
                        <WorkTimeline items={EXPERIENCE_DATA} />
                    </div>
                </section>

                {/* --- EDUCATION --- */}
                <section id="education" className="mb-16 scroll-mt-32">
                    <h2 className="text-2xl font-serif text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                        Education
                        <div className="h-[1px] flex-1 bg-gray-200 dark:bg-white/10" />
                    </h2>
                    <motion.div
                        className="flex gap-4 p-5 rounded-xl border border-gray-100 dark:border-white/10 bg-gray-50/50 dark:bg-white/[0.03]"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4 }}
                    >
                        <div className="shrink-0 w-12 h-12 rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 flex items-center justify-center overflow-hidden">
                            <img src="/AppIcons/gsu-seal.svg" alt="Grambling State University" className="w-full h-full object-contain p-1.5 opacity-90" />
                        </div>
                        <div className="flex-1">
                            <div className="flex flex-wrap items-start justify-between gap-2">
                                <div>
                                    <h3 className="text-base font-bold text-gray-900 dark:text-white leading-tight">Grambling State University</h3>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Grambling, LA</p>
                                </div>
                            </div>
                            <p className="text-sm text-gray-700 dark:text-gray-300 mt-2 leading-relaxed">
                                Bachelor of Science in Computer Science &amp; Cybersecurity
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Expected May 2028 · Dean’s List (3×) · Academic Achievement Scholar · Super1 Endowed Scholar</p>
                        </div>
                    </motion.div>
                </section>

                {/* --- CERTIFICATIONS --- */}
                <section id="certifications" className="mb-16 scroll-mt-32">
                    <h2 className="text-2xl font-serif text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                        Certifications
                        <div className="h-[1px] flex-1 bg-gray-200 dark:bg-white/10" />
                    </h2>
                    <div className="flex flex-wrap gap-3">
                        {[
                            { name: 'CompTIA Security+', abbr: 'SEC+', color: 'red', done: true },
                            { name: 'Microsoft Azure Fundamentals', abbr: 'AZ-900', color: 'blue', done: true },
                            { name: 'ISO/IEC 27001', abbr: 'ISO 27001', color: 'gray', done: true },
                            { name: 'AWS Cloud Practitioner', abbr: 'AWS CLF-02', color: 'orange', done: true },
                            { name: 'AWS Solutions Architect Associate', abbr: 'AWS SAA-C03', color: 'orange', done: false },
                        ].map((cert, i) => (
                            <motion.div
                                key={i}
                                className="flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-100 dark:border-white/10 bg-gray-50/50 dark:bg-white/[0.03]"
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.35, delay: i * 0.07 }}
                            >
                                <div className={`w-2 h-2 rounded-full shrink-0 ${
                                    cert.done
                                        ? cert.color === 'red' ? 'bg-red-500'
                                        : cert.color === 'blue' ? 'bg-blue-500'
                                        : cert.color === 'orange' ? 'bg-orange-500'
                                        : 'bg-gray-400'
                                        : 'bg-amber-400 animate-pulse'
                                }`} />
                                <div>
                                    <p className="text-sm font-semibold text-gray-900 dark:text-white leading-tight">{cert.abbr}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">{cert.name}</p>
                                </div>
                                {!cert.done && (
                                    <span className="ml-auto text-[10px] font-medium text-amber-500 bg-amber-50 dark:bg-amber-500/10 px-2 py-0.5 rounded-full">In Progress</span>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* --- ACTIVITIES --- */}
                <section id="activities" className="mb-16 scroll-mt-32">
                    <h2 className="text-2xl font-serif text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                        Activities
                        <div className="h-[1px] flex-1 bg-gray-200 dark:bg-white/10" />
                    </h2>
                    <div className="flex flex-col gap-3">
                        {ACTIVITIES_DATA.map((item, i) => (
                            <motion.div
                                key={i}
                                className="rounded-xl border border-gray-100 dark:border-white/10 bg-gray-50/50 dark:bg-white/[0.03] overflow-hidden cursor-pointer"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: i * 0.06 }}
                                onMouseEnter={() => setExpandedActivity(i)}
                                onMouseLeave={() => setExpandedActivity(null)}
                            >
                                <div className="flex gap-4 p-4 items-center">
                                    <div className="shrink-0 w-10 h-10 rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 flex items-center justify-center overflow-hidden">
                                        {item.logo ? (
                                            <img src={item.logo} alt={item.org} className="w-full h-full object-contain p-1.5 opacity-90" />
                                        ) : (
                                            <span className="text-sm font-bold text-gray-400 dark:text-gray-500">{item.org.charAt(0)}</span>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-base font-bold text-gray-900 dark:text-white leading-tight">{item.title}</h3>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">{item.org}</p>
                                    </div>
                                </div>
                                <AnimatePresence>
                                    {expandedActivity === i && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-4 pb-4 border-t border-gray-100 dark:border-white/10 pt-3">
                                                <ul className="space-y-1.5">
                                                    {item.bullets.map((b, j) => (
                                                        <li key={j} className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed flex gap-2">
                                                            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 dark:bg-blue-500 mt-1.5 shrink-0" />
                                                            <span>{b}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* --- SKILLS --- */}
                <section id="skills" className="mb-4 scroll-mt-32">
                    <div className="mb-6">
                        <h2 className="text-2xl font-serif text-gray-900 dark:text-white mb-2 flex items-center gap-3">
                            Tech Stack
                            <div className="h-[1px] flex-1 bg-gray-200 dark:bg-white/10" />
                        </h2>
                        <p className="text-xs text-gray-500 dark:text-gray-400 font-mono tracking-wide">
                            The arsenal for building digital experiences.
                        </p>
                    </div>
                    <div className="w-full -mx-6 md:-mx-0 overflow-hidden mb-12">
                        <SkillsMarquee skills={safeSkills} />
                    </div>

                    {/* Integrated Tools Section */}
                    <div className="mt-0">
                        <ToolsDock />
                    </div>
                </section>

                {/* --- RESEARCH & PUBLICATIONS --- */}
                <section id="articles" className="mb-16 scroll-mt-32">
                    <h2 className="text-2xl font-serif text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                        Research & Publications
                        <div className="h-[1px] flex-1 bg-gray-200 dark:bg-white/10" />
                    </h2>
                    <div className="flex flex-col gap-4">
                        {/* Paper 1 — BEC Detection */}
                        <div
                            className="rounded-xl border border-gray-100 dark:border-white/10 bg-gray-50/50 dark:bg-white/[0.03] overflow-hidden cursor-pointer"
                            onClick={() => setExpandedPaper(expandedPaper === 0 ? null : 0)}
                        >
                            <div className="p-5">
                                <div className="flex items-center justify-between gap-2 mb-2">
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs font-medium text-blue-500 bg-blue-50 dark:bg-blue-500/10 px-2 py-0.5 rounded-full">Research Publication</span>
                                        <span className="text-xs text-gray-400">Oct 2025</span>
                                    </div>
                                    <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${expandedPaper === 0 ? 'rotate-180' : ''}`} />
                                </div>
                                <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1">Machine Learning-Based Detection of Business Email Compromise</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Comparative study of XGBoost, LightGBM, CatBoost, Random Forest, and stacking ensembles for BEC detection with psycholinguistic features.</p>
                            </div>
                            <AnimatePresence>
                                {expandedPaper === 0 && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-5 pb-5 border-t border-gray-100 dark:border-white/10 pt-4">
                                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Abstract</p>
                                            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                                                Business Email Compromise (BEC) attacks constitute one of the most financially damaging cyber threats, resulting in global losses exceeding 2.7 billion USD annually according to the FBI Internet Crime Complaint Center. Unlike conventional phishing attacks that deploy malicious payloads or URLs, BEC employs sophisticated social engineering via carefully crafted language, posing substantial challenges to traditional signature-based detection systems. This work develops a robust machine learning framework for automated BEC detection, incorporating 58 specialized features extracted from email content, metadata, and behavioral attributes. We provide a formal mathematical formulation of the feature extraction process and evaluate five gradient boosting algorithms — XGBoost, LightGBM, CatBoost, Random Forest, and a stacking ensemble — on the Kaggle Fraud Email Dataset (9,239 samples). The dataset undergoes an 80/20 stratified split to preserve class distribution. CatBoost attains the highest performance, with 97.29% accuracy, 97.29% F1-score, and 99.55% AUC-ROC. We employ McNemar's test to confirm statistical significance (χ² = 7.52, p &lt; 0.01) and utilize SHAP (SHapley Additive exPlanations) to isolate linguistic metrics — specifically text entropy and readability — as primary discriminators. Furthermore, we present a computational complexity analysis demonstrating that our pipeline operates with O(L) linear complexity relative to email length, achieving sub-10ms inference latency suitable for real-time SIEM integration. The framework outperforms existing benchmarks by 8.8% in F1-score, establishing a new baseline for content-centric threat detection.
                                            </p>
                                            <a
                                                href="https://www.researchgate.net/publication/398019660_Machine_Learning-Based_Detection_of_Business_Email_Compromise_A_Comparative_Analysis_of_Gradient_Boosting_Techniques"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={(e) => e.stopPropagation()}
                                                className="inline-flex items-center gap-1.5 mt-4 text-xs font-medium text-blue-500 hover:text-blue-600 transition-colors"
                                            >
                                                <FileText className="w-3.5 h-3.5" />
                                                View Publication
                                                <ArrowUpRight className="w-3 h-3" />
                                            </a>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Paper 2 — Biosignal Uncertainty */}
                        <div
                            className="rounded-xl border border-gray-100 dark:border-white/10 bg-gray-50/50 dark:bg-white/[0.03] overflow-hidden cursor-pointer"
                            onClick={() => setExpandedPaper(expandedPaper === 1 ? null : 1)}
                        >
                            <div className="p-5">
                                <div className="flex items-center justify-between gap-2 mb-2">
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs font-medium text-amber-500 bg-amber-50 dark:bg-amber-500/10 px-2 py-0.5 rounded-full">Research in Progress</span>
                                        <span className="text-xs text-gray-400">2026</span>
                                    </div>
                                    <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${expandedPaper === 1 ? 'rotate-180' : ''}`} />
                                </div>
                                <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1">Explain, Explain, Explain: Uncertainty–Explanation Alignment for EEG Models Under Artifact and Explainer Perturbations</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Introduces a recalibration framework that gates model attributions on predictive uncertainty to reduce misleading explanations under noisy real-world signals.</p>
                            </div>
                            <AnimatePresence>
                                {expandedPaper === 1 && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-5 pb-5 border-t border-gray-100 dark:border-white/10 pt-4">
                                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Abstract</p>
                                            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                                                Perturbation-based attribution methods are widely adopted to make AI predictions transparent, yet no standard mechanism exists to verify whether a given explanation is valid — that is, whether the model's predictive basis was reliable at the moment the explanation was generated. We argue that explanations should be treated as safety-critical outputs subject to an explicit validity condition: an attribution map is trustworthy only when the model is sufficiently certain under the very perturbations the explainer applies. We formalise this as a transparency audit protocol and instantiate it on EEG-based brain–computer interfaces, a domain where physiological artefacts (sensor dropout, ocular and muscle interference, line noise, bandpass mismatch) provide a controlled, interpretable test bed for studying explanation failures under distributional shift. Our audit introduces three measurable transparency diagnostics — uncertainty–faithfulness alignment (ρ<sub>align</sub>), a monotonicity score (M), and a misalignment rate that quantifies the fraction of trials where the model is uncertain yet the attribution is sharply concentrated — and proposes abstain-to-explain, a transparency control that withholds attribution maps when predictive entropy exceeds a calibrated threshold. Experiments on the BCI Competition IV 2a dataset with two CNN architectures and four uncertainty quantification methods demonstrate that deep ensembles produce the most audit-compliant explanations, and that the abstain-to-explain policy eliminates the majority of sharp-but-wrong attributions. This work is not optimised for decoding accuracy; we intentionally use conservative preprocessing to preserve artefacts for transparency auditing. The protocol generalises to any perturbation-based explainer and is positioned as a step toward accountable explanation pipelines in modern AI systems, including future applications to LLMs and agentic architectures.
                                            </p>
                                            <p className="inline-flex items-center gap-1.5 mt-4 text-xs font-medium text-amber-500">
                                                <FileText className="w-3.5 h-3.5" />
                                                Yet to be published
                                            </p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                        {RESEARCH_DATA.slice(0, 2).map((paper) => (
                            <a key={paper.href} href={paper.href} target="_blank" rel="noopener noreferrer" className="group rounded-xl border border-gray-100 dark:border-white/10 bg-gray-50/50 dark:bg-white/[0.03] p-5 hover:border-blue-300 dark:hover:border-blue-500/40 transition-colors">
                                <div className="flex items-center justify-between gap-2 mb-2">
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs font-medium text-blue-500 bg-blue-50 dark:bg-blue-500/10 px-2 py-0.5 rounded-full">{paper.type}</span>
                                        <span className="text-xs text-gray-400">{paper.year}</span>
                                    </div>
                                    <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
                                </div>
                                <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1">{paper.title}</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{paper.summary}</p>
                            </a>
                        ))}
                    </div>
                </section>

                {/* --- PROJECTS --- */}
                <section id="projects" className="mb-16 scroll-mt-32">
                    <h2 className="text-2xl font-serif text-gray-900 dark:text-white mb-8 flex items-center gap-3">
                        Projects
                        <div className="h-[1px] flex-1 bg-gray-200 dark:bg-white/10" />
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <ProjectCard
                            index={0}
                            title="Lexin Compiler"
                            description="A statically-typed, C-superset language with a full compiler pipeline that targets C99."
                            tags={["Rust", "Compiler", "C99", "Systems Programming"]}
                            imageUrl="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80"
                            githubUrl="https://github.com/Alanperry1/lexin-compiler"
                            stars={0}
                            isDimmed={hoveredProject !== null && hoveredProject !== 0}
                            onHover={() => setHoveredProject(0)}
                            onLeave={() => setHoveredProject(null)}
                        />
                        <ProjectCard
                            index={1}
                            title="Neural Pricer"
                            description="Neural network pipeline for pricing American-style equity options using deep learning."
                            tags={["Python", "PyTorch", "Options Pricing", "Finance"]}
                            imageUrl="https://images.unsplash.com/photo-1640340434855-6084b1f4901c?w=800&q=80"
                            githubUrl="https://github.com/Alanperry1/Neural-Pricer"
                            stars={0}
                            isDimmed={hoveredProject !== null && hoveredProject !== 1}
                            onHover={() => setHoveredProject(1)}
                            onLeave={() => setHoveredProject(null)}
                        />
                        <ProjectCard
                            index={2}
                            title="SecureRAG"
                            description="Prompt injection & data poisoning detection layer for RAG pipelines with entropy-based anomaly scoring, confidence gating, and FastAPI serving."
                            tags={["Python", "FastAPI", "LangChain", "FAISS"]}
                            imageUrl="https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&q=80"
                            githubUrl="https://github.com/Alanperry1/SecureRAG"
                            stars={35}
                            isDimmed={hoveredProject !== null && hoveredProject !== 2}
                            onHover={() => setHoveredProject(2)}
                            onLeave={() => setHoveredProject(null)}
                        />
                        <ProjectCard
                            index={3}
                            title="Distributed Key-Value Store"
                            description="Dynamo-inspired distributed KV store in Rust with consistent hashing, tunable quorum replication, vector-clock versioning, and SWIM gossip-based failure detection."
                            tags={["Rust", "Tokio", "gRPC", "Protocol Buffers"]}
                            imageUrl="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80"
                            githubUrl="https://github.com/Alanperry1/rkv"
                            stars={48}
                            isDimmed={hoveredProject !== null && hoveredProject !== 3}
                            onHover={() => setHoveredProject(3)}
                            onLeave={() => setHoveredProject(null)}
                        />
                        <ProjectCard
                            index={4}
                            title="FeedFlow"
                            description="AI-powered customer feedback analytics built entirely on Cloudflare's Developer Platform with sentiment analysis and similarity clustering."
                            tags={["Cloudflare Workers", "D1", "TypeScript"]}
                            imageUrl="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80"
                            githubUrl="https://github.com/Alanperry1/feedflow"
                            stars={95}
                            isDimmed={hoveredProject !== null && hoveredProject !== 4}
                            onHover={() => setHoveredProject(4)}
                            onLeave={() => setHoveredProject(null)}
                        />
                        <ProjectCard
                            index={5}
                            title="ReqSim"
                            description="Lightweight Python package for benchmarking and load testing APIs using async HTTP requests — instant performance insights without heavy tools."
                            tags={["Python", "asyncio", "httpx", "MIT"]}
                            imageUrl="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"
                            githubUrl="https://github.com/Alanperry1/ReqSim"
                            stars={18}
                            isDimmed={hoveredProject !== null && hoveredProject !== 5}
                            onHover={() => setHoveredProject(5)}
                            onLeave={() => setHoveredProject(null)}
                        />
                        <ProjectCard
                            index={6}
                            title="AstroML Gamma Classifier"
                            description="Classifies cosmic particle events from the MAGIC Gamma Telescope into gamma rays or hadrons using KNN, Naïve Bayes, Logistic Regression, and SVM."
                            tags={["Python", "scikit-learn", "Jupyter"]}
                            imageUrl="https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&q=80"
                            githubUrl="https://github.com/Alanperry1/AstroML-Gamma-vs-Hadron-Classifier"
                            stars={12}
                            isDimmed={hoveredProject !== null && hoveredProject !== 6}
                            onHover={() => setHoveredProject(6)}
                            onLeave={() => setHoveredProject(null)}
                        />
                        <ProjectCard
                            index={7}
                            title="RAG Pipeline"
                            description="RAG system using LangChain with document parsing, FAISS vector storage, and semantic retrieval to generate context-aware LLM responses."
                            tags={["LangChain", "FAISS", "OpenAI API", "Python"]}
                            imageUrl="https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80"
                            githubUrl="https://github.com/Alanperry1/RAG-Pipeline"
                            stars={22}
                            isDimmed={hoveredProject !== null && hoveredProject !== 7}
                            onHover={() => setHoveredProject(7)}
                            onLeave={() => setHoveredProject(null)}
                        />
                        <ProjectCard
                            index={8}
                            title="Stochastic Portfolio Valuation"
                            description="Financial modeling tool using stochastic simulations to estimate portfolio value trajectories, visualize uncertainty, and analyze risk over time."
                            tags={["Python", "NumPy", "Matplotlib", "Monte Carlo"]}
                            imageUrl="https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=800&q=80"
                            githubUrl="https://github.com/Alanperry1/Stochastic-Portfolio-Valuation-Model"
                            stars={14}
                            isDimmed={hoveredProject !== null && hoveredProject !== 8}
                            onHover={() => setHoveredProject(8)}
                            onLeave={() => setHoveredProject(null)}
                        />
                        <ProjectCard
                            index={9}
                            title="Forex Trading Bot"
                            description="Autonomous forex bot with a 3-layer AI consensus engine (Claude, RandomForest, PPO RL) trading 10 pairs on OANDA with live risk management and dashboard."
                            tags={["Python", "NumPy", "Pandas", "Chart.js"]}
                            imageUrl="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80"
                            githubUrl="https://github.com/Alanperry1/forex-bot"
                            stars={26}
                            isDimmed={hoveredProject !== null && hoveredProject !== 9}
                            onHover={() => setHoveredProject(9)}
                            onLeave={() => setHoveredProject(null)}
                        />
                    </div>
                </section>

                {/* --- PHILOSOPHY REVEAL (Moved here) --- */}
                <div className="mb-16">
                    <ScrollFillText />
                </div>

                {/* --- CONTACT --- */}
                <section id="contact" className="mb-0 scroll-mt-32 pb-0">
                    <div className="flex flex-col items-center text-center">

                        {/* Socials Label - Moved above */}
                        <div className="mb-6">
                            <span className="px-3 py-1.5 rounded-full border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-[10px] font-bold tracking-widest text-gray-500 dark:text-gray-400 uppercase">
                                Socials
                            </span>
                        </div>

                        {/* Heading */}
                        <h2 className="text-4xl md:text-5xl font-serif text-gray-900 dark:text-white mb-6">
                            Let's build secure and intelligent systems
                        </h2>

                        {/* Single Line Handwritten Text */}
                        <p className="font-handwriting text-2xl md:text-3xl text-gray-600 dark:text-gray-300 mb-12  origin-center">
                            Reach out via LinkedIn, GitHub, or email
                        </p>

                        {/* Social Dock */}
                        <div className="relative z-10 mb-8">
                            <SocialDock />
                        </div>

                        {/* Footer Credit */}
                        <div className="mt-0 mb-0 w-full">
                            {/* Quote */}
                            <div className="mb-8 text-center">
                                <p className="font-serif italic text-sm md:text-base text-gray-400 dark:text-gray-500">
                                    "The details are not the details. They make the design."
                                </p>
                            </div>

                            {/* Split Layout */}
                            <div className="flex flex-col md:flex-row items-center justify-between gap-4 w-full border-t border-gray-100 dark:border-white/5 pt-6">
                            </div>
                        </div>
                    </div>
                </section>

            </main>
        </>
    );
};

// --- Sub Components ---

const ResearchGateIcon = ({ className }: { className?: string }) => (
    <img src="/AppIcons/researchgate.svg" alt="ResearchGate" className={className} />
);

const LinkedInIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className={className}>
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
);

const GmailIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className={className}>
        <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.22 24 3.434 24 5.457z" />
    </svg>
);

const SocialDock = () => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [copied, setCopied] = useState(false);

    const socialLinks = [
        { icon: ResearchGateIcon, label: "Research", href: "https://www.researchgate.net/profile/Philip-Baning" },
        { icon: LinkedInIcon, label: "LinkedIn", href: "https://linkedin.com/in/pbaning" },
        { icon: GmailIcon, label: "Email", href: "mailto:baningphilip1@gmail.com" },
        { icon: Github, label: "GitHub", href: "https://github.com/Alanperry1" }
    ];

    const handleCopy = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        navigator.clipboard.writeText('baningphilip1@gmail.com');
        setCopied(true);
        triggerHaptic(15);
        setTimeout(() => setCopied(false), 2000);
    };

    const getWidth = (index: number) => {
        const baseWidth = 56;
        if (hoveredIndex === null) return baseWidth;
        const distance = Math.abs(hoveredIndex - index);
        if (distance === 0) return 68;
        if (distance === 1) return 60;
        return baseWidth;
    };
    return (
        <div className="flex justify-center items-end h-[70px] pb-2">
            <ul className="flex items-end gap-2 list-none m-0 p-0">
                {socialLinks.map((link, index) => (
                    <li
                        key={link.label}
                        className="relative flex items-center justify-center transition-all duration-300"
                        style={{ width: `${getWidth(index)}px` }}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        onClick={() => triggerHaptic(10)}
                    >
                        <AnimatePresence>
                            {hoveredIndex === index && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.8, x: "-50%" }}
                                    animate={{ opacity: 1, y: 0, scale: 1, x: "-50%" }}
                                    exit={{ opacity: 0, y: 5, scale: 0.9, x: "-50%" }}
                                    transition={{ duration: 0.15 }}
                                    className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-black dark:bg-white text-white dark:text-black text-[10px] font-medium rounded-md whitespace-nowrap z-20 shadow-lg hidden md:block cursor-pointer pointer-events-auto"
                                    onClick={(e) => {
                                        if (link.label === 'Email') {
                                            handleCopy(e);
                                        }
                                    }}
                                >
                                    {link.label === 'Email' ? (
                                        <div className="flex items-center gap-2 group/tooltip">
                                            <span>baningphilip1@gmail.com</span>
                                            <div className="p-1 rounded-md bg-white/10 dark:bg-black/10 hover:bg-white/20 dark:hover:bg-black/20 transition-colors">
                                                {copied ? (
                                                    <Check className="w-3 h-3 text-green-400 dark:text-green-600" />
                                                ) : (
                                                    <Copy className="w-3 h-3 text-gray-400 group-hover/tooltip:text-white dark:group-hover/tooltip:text-black transition-colors" />
                                                )}
                                            </div>
                                        </div>
                                    ) : (
                                        link.label
                                    )}
                                    <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[1px] border-4 border-transparent border-t-black dark:border-t-white" />
                                    {/* Invisible bridge to prevent mouseleave when moving to tooltip */}
                                    <div className="absolute top-full left-0 w-full h-4 bg-transparent" />
                                </motion.div>
                            )}
                        </AnimatePresence>
                        <a
                            href={link.href}
                            target={link.label === 'Email' ? undefined : "_blank"}
                            rel={link.label === 'Email' ? undefined : "noopener noreferrer"}
                            className="w-full aspect-square p-1 flex items-center justify-center"
                        >
                            <div className="w-full h-full rounded-xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 flex items-center justify-center shadow-sm hover:border-gray-300 dark:hover:border-white/20 transition-all active:scale-95">
                                <link.icon className="w-1/2 h-1/2 text-gray-700 dark:text-gray-200" />
                            </div>
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};
