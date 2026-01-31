import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";
import "./IntroLoader.css";

function IntroLoader({ onComplete }) {
    const [currentLine, setCurrentLine] = useState(0);
    const [isVisible, setIsVisible] = useState(true);
    const containerRef = useRef(null);
    const textRefs = useRef([]);

    const lines = [
        "To the most beautiful part of my world",
        "Today is all about you",
        "Happy Birthday Mili ❤️",
    ];

    useEffect(() => {
        // Animate lines one by one
        const animateLines = async () => {
            for (let i = 0; i < lines.length; i++) {
                setCurrentLine(i);

                // Wait for line to appear and stay
                await new Promise((resolve) => setTimeout(resolve, 2500));
            }

            // After all lines, fade out the loader
            await new Promise((resolve) => setTimeout(resolve, 1000));

            gsap.to(containerRef.current, {
                opacity: 0,
                duration: 1,
                ease: "power2.inOut",
                onComplete: () => {
                    setIsVisible(false);
                    if (onComplete) onComplete();
                },
            });
        };

        animateLines();
    }, [onComplete]);

    useEffect(() => {
        // Animate current line when it changes
        if (textRefs.current[currentLine]) {
            gsap.fromTo(
                textRefs.current[currentLine],
                { opacity: 0, y: 30, scale: 0.9 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 1,
                    ease: "power3.out",
                }
            );

            // Fade out previous line
            if (currentLine > 0 && textRefs.current[currentLine - 1]) {
                gsap.to(textRefs.current[currentLine - 1], {
                    opacity: 0,
                    y: -20,
                    duration: 0.5,
                    ease: "power2.in",
                });
            }
        }
    }, [currentLine]);

    if (!isVisible) return null;

    return (
        <div ref={containerRef} className="intro-loader">
            {/* Floating hearts background */}
            <div className="intro-hearts">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="intro-heart"
                        style={{
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 5}s`,
                            animationDuration: `${6 + Math.random() * 4}s`,
                            fontSize: `${12 + Math.random() * 16}px`,
                            opacity: 0.3 + Math.random() * 0.4,
                        }}
                    >
                        💗
                    </div>
                ))}
            </div>

            {/* Soft particles */}
            <div className="intro-particles">
                {[...Array(30)].map((_, i) => (
                    <div
                        key={i}
                        className="intro-particle"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            animationDuration: `${3 + Math.random() * 2}s`,
                        }}
                    />
                ))}
            </div>

            {/* Text container */}
            <div className="intro-text-container">
                {lines.map((line, index) => (
                    <p
                        key={index}
                        ref={(el) => (textRefs.current[index] = el)}
                        className={`intro-line ${index === currentLine ? "active" : ""}`}
                        style={{ display: index === currentLine ? "block" : "none" }}
                    >
                        {line}
                    </p>
                ))}
            </div>
        </div>
    );
}

export default IntroLoader;
