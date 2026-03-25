import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP Plugin
gsap.registerPlugin(ScrollTrigger);

interface Tool {
    name: string;
    icon: string;
    bg: string;
}

const tools: Tool[] = [
    { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', bg: 'bg-[#2496ED]/10' },
    { name: 'Kubernetes', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg', bg: 'bg-[#326CE5]/10' },
    { name: 'GitHub Actions', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/githubactions/githubactions-original.svg', bg: 'bg-[#2088FF]/10' },
    { name: 'Postman', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg', bg: 'bg-[#FF6C37]/10' },
    { name: 'VS Code', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg', bg: 'bg-[#007ACC]/10' }, // Center
    { name: 'Jupyter', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg', bg: 'bg-[#F37626]/10' },
    { name: 'AWS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg', bg: 'bg-[#FF9900]/10' },
    { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', bg: 'bg-[#4169E1]/10' },
    { name: 'Proxmox', icon: 'https://cdn.simpleicons.org/proxmox/E57000', bg: 'bg-[#E57000]/10' },
    { name: 'CUDA', icon: '/AppIcons/cuda-logo.svg', bg: 'bg-[#76B900]/10' },
    { name: 'SonarQube', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sonarqube/sonarqube-original.svg', bg: 'bg-[#4E9BCD]/10' },
];

export const ToolsDock: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const iconsRef = useRef<Array<HTMLDivElement | null>>([]);

    const headerText = "{ Developer Tools & Infrastructure }";
    const headerChars = headerText.split('');
    const centerIndex = 4; // Brave

    useLayoutEffect(() => {
        // GSAP Context to ensure cleanup
        const ctx = gsap.context(() => {

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 95%",
                    end: "bottom 30%",
                    scrub: 1.2,
                }
            });



            // 1. Animate Text (Split char stagger left → right)
            const chars = textRef.current?.children;
            if (chars) {
                tl.fromTo(chars,
                    { x: -40, opacity: 0, skewX: 8 },
                    { x: 0, opacity: 1, skewX: 0, duration: 1, stagger: { amount: 0.9, from: "start" }, ease: "power2.out" },
                    0
                );
            }

            // 2. Animate Icons
            const icons = iconsRef.current;
            icons.forEach((icon, index) => {
                if (!icon) return;
                const dist = Math.abs(index - centerIndex);

                tl.fromTo(icon,
                    { y: 100, opacity: 0, rotationX: 45, scale: 0.7 },
                    {
                        y: 0,
                        opacity: 1,
                        rotationX: 0,
                        scale: 1,
                        duration: 1.5,
                        ease: "power2.out"
                    },
                    dist * 0.15 + 0.2
                );
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="w-full flex flex-col items-center justify-center relative py-2 md:py-4">
            <div className="flex flex-col items-center gap-6 w-full max-w-6xl px-4">

                <h2 ref={textRef} className="text-[clamp(0.8rem,4vw,1.8rem)] font-medium text-gray-900 dark:text-gray-100 font-mono text-center leading-tight">
                    {headerChars.map((char, i) => (
                        <span key={i} className="inline-block" style={{ minWidth: char === ' ' ? '0.2em' : 'auto' }}>
                            {char === ' ' ? '\u00A0' : char}
                        </span>
                    ))}
                </h2>

                <div className="flex flex-wrap items-center justify-center gap-3 md:gap-5 px-4 py-4 w-full" style={{ perspective: '1000px' }}>
                    {tools.map((tool, index) => (
                        <div
                            key={tool.name}
                            ref={(el) => { iconsRef.current[index] = el; }}
                            className={`
                            relative group
                            w-14 h-14 md:w-16 md:h-16
                            rounded-2xl
                            flex items-center justify-center 
                            bg-white dark:bg-white/5
                            shadow-xl
                            cursor-pointer
                            ${index === centerIndex ? 'z-10' : 'z-0'}
                            border border-black/5 dark:border-white/10
                            hover:border-blue-500/50 transition-colors duration-300
                        `}
                        >
                            <img
                                src={tool.icon}
                                alt={tool.name}
                                className="w-[70%] h-[70%] object-contain transform transition-transform duration-300 group-hover:scale-110"
                            />

                            <div className="absolute -bottom-10 opacity-0 group-hover:opacity-100 transition-opacity text-xs font-semibold text-gray-500 dark:text-gray-300 pointer-events-none whitespace-nowrap bg-white dark:bg-gray-800 px-2 py-1 rounded shadow-sm border border-gray-100 dark:border-gray-700 z-50">
                                {tool.name}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};