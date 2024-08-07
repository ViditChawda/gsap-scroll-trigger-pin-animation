import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const StackedCarousel = () => {
    const containerRef = useRef(null);
    const sectionRef = useRef(null);
    const totalCards = 5;

    useEffect(() => {
        const container = containerRef.current;
        const section = sectionRef.current;
        if (!container || !section) return;

        // Set up GSAP ScrollTrigger
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: "top top", // Start when the section hits the top of the viewport
                end: `+=${(totalCards - 1) * 500}`, // Increase this value to slow down the animation
                scrub: true, // Smoothly scrub the animation with the scroll
                pin: true, // Pin the section during the animation
            },
        });

        // Initial setup for cards to appear stacked
        gsap.set(container.children, {
            rotate: (index) => index * -1.2, // Initial rotation angle for stacking
            zIndex: (index) => totalCards - index, // Set z-index to stack cards
            transformOrigin: "center center", // Ensure rotation happens around the center
        });

        // Animate each card
        for (let i = 0; i < totalCards - 1; i++) {
            const currentCard = container.children[i];
            const nextCard = container.children[i + 1];

            // Rotate the next card to align with the viewport first
            tl.to(
                nextCard,
                {
                    rotate: 0, // Align the next card parallel to the screen
                    duration: 1.5, // Adjust duration for smooth rotation
                    ease: "power2.inOut",
                },
                i // Start this animation at the current index
            );

            // Move the current card out of view once the next card is parallel
            tl.to(
                currentCard,
                {
                    x: i % 2 === 0 ? "120%" : "-120%", // Limit movement to avoid overflow
                    y: 0, // Align the card to the center vertically
                    rotate: 0, // Align the card parallel to the screen
                    duration: 1.5, // Adjust duration for smooth movement
                    ease: "power2.inOut",
                },
                i + 1.5 // Start this animation after the next card has rotated
            );
        }

        // Ensure the last card stays in place
        gsap.set(container.children[totalCards - 1], {
            x: 0,
            y: 0,
            rotate: 0,
        });

        return () => {
            // Clean up ScrollTrigger instances
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, [totalCards]);

    return (
        <div
            ref={sectionRef}
            className="h-screen flex items-center justify-center flex-col overflow-hidden bg-gray-800"
        >
            <div ref={containerRef} className="relative w-[80%] h-[300px] mt-20">
                {[...Array(totalCards)].map((_, index) => (
                    <div
                        key={index}
                        className={`absolute top-0 left-0 w-full h-full border rounded-[24px] bg-white flex flex-col shadow-lg ${index === totalCards - 1 ? "z-10" : ""
                            }`}
                    >
                        <div className="border-b h-10 w-full flex items-center justify-start gap-2 px-6 py-2">
                            <div className="border rounded-full h-3 w-3"></div>
                            <div className="border rounded-full h-3 w-3"></div>
                            <div className="border rounded-full h-3 w-3"></div>
                        </div>
                        <div className="text-black px-6 mt-12 flex h-full flex-col gap-2">
                            <div className="text-2xl font-bold">
                                Placeholder Name{" "}
                                <span className="font-normal text-sm text-gray-500">
                                    {"(Title)"}
                                </span>
                            </div>
                            <div className="text-sm text-gray-500 flex flex-row gap-2">
                                Project: <span className="underline">Placeholder Project</span>
                            </div>
                            <div className="text-sm text-gray-500 font-bold">
                                This is placeholder text for the testimonials. It provides an example of how the layout will appear with content.
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StackedCarousel;
