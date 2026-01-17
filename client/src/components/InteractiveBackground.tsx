import { useEffect, useRef, useState } from 'react';

export default function InteractiveBackground() {
    const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
    const rafRef = useRef<number>();
    const targetPosition = useRef({ x: 50, y: 50 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Calculate percentage position for responsive sizing
            const x = (e.clientX / window.innerWidth) * 100;
            const y = (e.clientY / window.innerHeight) * 100;
            targetPosition.current = { x, y };
        };

        // Smooth animation loop 
        const animate = () => {
            setMousePosition((prev) => {
                const dx = targetPosition.current.x - prev.x;
                const dy = targetPosition.current.y - prev.y;

                // Ease factor for smooth following (lower = more delay)
                const ease = 0.1;

                return {
                    x: prev.x + dx * ease,
                    y: prev.y + dy * ease,
                };
            });

            rafRef.current = requestAnimationFrame(animate);
        };

        window.addEventListener('mousemove', handleMouseMove);
        rafRef.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }
        };
    }, []);

    return (
        <div
            className="interactive-bg"
            style={{
                maskImage: `radial-gradient(circle 300px at ${mousePosition.x}% ${mousePosition.y}%, transparent 0%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0.8) 100%)`,
                WebkitMaskImage: `radial-gradient(circle 300px at ${mousePosition.x}% ${mousePosition.y}%, transparent 0%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0.8) 100%)`,
            }}
        />
    );
}
