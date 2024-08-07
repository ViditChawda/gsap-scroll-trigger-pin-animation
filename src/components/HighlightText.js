import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HighlightTextOnScroll = () => {
    const textRef = useRef(null);

    useEffect(() => {
        const text = textRef.current;
        const characters = text.innerText.split("");
        text.innerHTML = ""; // Clear the text content

        // Wrap each character in a span
        characters.forEach((char) => {
            const span = document.createElement("span");
            span.innerText = char;
            span.classList.add("text-gray-600"); // Initial dim color
            text.appendChild(span);
        });

        const spans = text.querySelectorAll("span");

        gsap.fromTo(
            spans,
            { color: "#454545" }, // Initial color (grey)
            {
                color: "#ffffff", // Target color (white)
                duration: 0.3, // Increased duration for slower animation
                stagger: 0.1, // Increased stagger for smoother appearance
                ease: "power1.out", // Smooth easing function
                scrollTrigger: {
                    trigger: text,
                    start: "top 80%", // Start the animation when the top of the element is 75% from the top of the viewport
                    end: "bottom 70%", // End the animation when the bottom of the element is 25% from the top of the viewport
                    scrub: true, // This makes the animation tied to the scroll speed
                    onUpdate: (self) => {
                        const progress = self.progress;
                        gsap.to(spans, {
                            color: (i) =>
                                progress > i / spans.length ? "#ffffff" : "#454545",
                            duration: 0.1, // Slightly longer duration for smoother transition
                            ease: "power1.out", // Smooth easing function
                        });
                    },
                },
            }
        );
    }, []);

    return (
        <div className="p-8 bg-gray-900 h-[100vh] flex items-center justify-center">
            {/* Adjust height as needed */}
            <p ref={textRef} className="text-gray-500 text-center text-6xl font-semibold">
                Lorem ipsum dolor sit amet, <br />
                consectetur adipiscing elit. <br />
                Vivamus lacinia odio vitae vestibulum.
            </p>
        </div>
    );
};

export default HighlightTextOnScroll;
