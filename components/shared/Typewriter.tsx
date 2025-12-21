"use client";

import { useState, useEffect } from "react";
import { LazyMotion, domAnimation, m } from "framer-motion";

interface TypewriterProps {
    words: string[];
    typingSpeed?: number;
    deletingSpeed?: number;
    pauseDuration?: number;
}

const Typewriter = ({
    words,
    typingSpeed = 100,
    deletingSpeed = 50,
    pauseDuration = 2000,
}: TypewriterProps) => {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [currentText, setCurrentText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const word = words[currentWordIndex];

        const timeout = setTimeout(
            () => {
                if (!isDeleting) {
                    // Typing
                    if (currentText.length < word.length) {
                        setCurrentText(word.slice(0, currentText.length + 1));
                    } else {
                        // Pause before deleting
                        setTimeout(() => setIsDeleting(true), pauseDuration);
                    }
                } else {
                    // Deleting
                    if (currentText.length > 0) {
                        setCurrentText(currentText.slice(0, -1));
                    } else {
                        setIsDeleting(false);
                        setCurrentWordIndex((prev) => (prev + 1) % words.length);
                    }
                }
            },
            isDeleting ? deletingSpeed : typingSpeed
        );

        return () => clearTimeout(timeout);
    }, [
        currentText,
        isDeleting,
        currentWordIndex,
        words,
        typingSpeed,
        deletingSpeed,
        pauseDuration,
    ]);

    return (
        <LazyMotion features={domAnimation}>
            <m.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-gradient inline"
            >
                {currentText}
                <m.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                    className="ml-1 inline-block w-[3px] h-[1em] bg-current align-middle"
                />
            </m.span>
        </LazyMotion>
    );
};

export default Typewriter;
