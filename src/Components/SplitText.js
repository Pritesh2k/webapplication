import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const SplitText = ({
  text,
  splitType = "chars",
  from = {},
  to = {},
  delay = 0,
  duration = 0.6,
  ease = "power3.out",
  onLetterAnimationComplete
}) => {
  const textRef = useRef(null);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    if (hasAnimatedRef.current) return; // don't animate again
    if (!textRef.current) return;

    const chars = Array.from(textRef.current.querySelectorAll("span"));
    gsap.fromTo(chars, { ...from }, {
      ...to,
      delay: delay / 1000,
      duration,
      ease,
      stagger: 0.03,
      onComplete: () => {
        onLetterAnimationComplete?.();
        hasAnimatedRef.current = true;
      }
    });

  }, [from, to, delay, duration, ease, onLetterAnimationComplete]);

  return (
    <span ref={textRef}>
      {text.split("").map((char, i) => (
        <span key={i} style={{ display: "inline-block" }}>
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
};

export default SplitText;
