import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CarSVG from "./CarSVG";
import "./HeroSection.css";

gsap.registerPlugin(ScrollTrigger);

const HEADLINE = "WELCOME ITZFIZZ";
const STATS = [
    { id: "box1", value: "58%", label: "Increase in pick up point use", variant: "yellow", top: "5%", right: "30%" },
    { id: "box2", value: "23%", label: "Decreased in customer phone calls", variant: "blue", bottom: "5%", right: "35%" },
    { id: "box3", value: "27%", label: "Increase in pick up point use", variant: "dark", top: "5%", right: "10%" },
    { id: "box4", value: "40%", label: "Decreased in customer phone calls", variant: "orange", bottom: "5%", right: "12.5%" },
];

const HeroSection = () => {
    const sectionRef = useRef(null);
    const carRef = useRef(null);
    const trailRef = useRef(null);
    const lettersRef = useRef([]);
    const valueAddRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const car = carRef.current;
            const trail = trailRef.current;
            const letters = lettersRef.current.filter(Boolean);
            const valueAdd = valueAddRef.current;

            if (!car || !trail || !valueAdd || letters.length === 0) return;

            // Measure letter positions
            const valueRect = valueAdd.getBoundingClientRect();
            const letterOffsets = letters.map((letter) => letter.offsetLeft);

            const roadWidth = window.innerWidth;
            const carWidth = 200;
            const endX = roadWidth - carWidth;

            // ===== Intro animations (on page load) =====
            const introTl = gsap.timeline({ defaults: { ease: "power3.out" } });

            // Fade in the entire track
            introTl.from(".hero-track", {
                opacity: 0,
                duration: 0.8,
            });

            // Stagger in scroll indicator
            introTl.from(
                ".scroll-indicator",
                {
                    opacity: 0,
                    y: 20,
                    duration: 0.6,
                },
                "-=0.3"
            );

            // ===== Scroll-based car animation =====
            gsap.to(car, {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: 1.5,
                },
                x: endX,
                ease: "none",
                onUpdate: function () {
                    const carX = gsap.getProperty(car, "x") + carWidth / 2;

                    // Reveal letters as car passes
                    letters.forEach((letter, i) => {
                        const letterX = valueRect.left + letterOffsets[i];
                        if (carX >= letterX) {
                            gsap.to(letter, { opacity: 1, duration: 0.2, overwrite: true });
                        } else {
                            gsap.to(letter, { opacity: 0, duration: 0.1, overwrite: true });
                        }
                    });

                    // Trail follows car
                    gsap.set(trail, { width: carX });
                },
            });

            // ===== Stat box scroll-triggered fade-ins =====
            STATS.forEach((stat, i) => {
                gsap.to(`#${stat.id}`, {
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: `top+=${400 + i * 200} top`,
                        end: `top+=${600 + i * 200} top`,
                        scrub: true,
                    },
                    opacity: 1,
                    y: 0,
                });

                // Initial offset for stat boxes
                gsap.set(`#${stat.id}`, { y: 30 });
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="hero-section" ref={sectionRef}>
            <div className="hero-track">
                {/* Ambient particles */}
                {[...Array(6)].map((_, i) => (
                    <div
                        key={i}
                        className="particle"
                        style={{
                            width: `${Math.random() * 200 + 50}px`,
                            height: `${Math.random() * 200 + 50}px`,
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            opacity: Math.random() * 0.05 + 0.02,
                        }}
                    />
                ))}

                {/* Road with car and trail */}
                <div className="road" id="road">
                    <div ref={carRef} className="car" id="car">
                        <CarSVG />
                    </div>
                    <div className="trail" ref={trailRef} id="trail" />

                    {/* Headline letters */}
                    <div className="value-add" ref={valueAddRef} id="valueText">
                        {HEADLINE.split("").map((char, i) => (
                            <span
                                key={i}
                                className="value-letter"
                                ref={(el) => (lettersRef.current[i] = el)}
                            >
                                {char === " " ? "\u00A0" : char}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Stat boxes */}
                {STATS.map((stat) => (
                    <div
                        key={stat.id}
                        id={stat.id}
                        className={`stat-box stat-box--${stat.variant}`}
                        style={{
                            top: stat.top,
                            bottom: stat.bottom,
                            right: stat.right,
                        }}
                    >
                        <span className="stat-number">{stat.value}</span>
                        <span className="stat-label">{stat.label}</span>
                    </div>
                ))}

                {/* Scroll indicator */}
                <div className="scroll-indicator">
                    <div className="scroll-indicator__mouse">
                        <div className="scroll-indicator__wheel" />
                    </div>
                    <span className="scroll-indicator__text">Scroll</span>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
