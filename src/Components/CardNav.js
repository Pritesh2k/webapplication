import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
// use your own icon import if react-icons is not available
import { GoArrowUpRight } from "react-icons/go";
import "./CardNav.css"; // Ensure you have the appropriate CSS for styling

import SplitText from "./SplitText";

const CardNav = ({
    logo,
    logoAlt = "Logo",
    items,
    className = "",
    ease = "power3.out",
    baseColor = "#fff",
    menuColor,
    buttonBgColor,
    buttonTextColor,
}) => {
    const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const navRef = useRef(null);
    const cardsRef = useRef([]);
    const tlRef = useRef(null);
    const hasAnimatedRef = useRef(false);

    const calculateHeight = () => {
        const navEl = navRef.current;
        if (!navEl) return 60;

        const contentEl = navEl.querySelector(".card-nav-content");
        if (!contentEl) return 60;

        // Measure actual content height
        const contentHeight = contentEl.scrollHeight;

        // 60 = height of top bar
        return 60 + contentHeight + 16; // padding bottom
    };



    const createTimeline = () => {
        const navEl = navRef.current;
        if (!navEl) return null;

        gsap.set(navEl, { height: 60, overflow: "hidden" });
        gsap.set(cardsRef.current, { y: 40, opacity: 0 });

        const tl = gsap.timeline({ paused: true });

        // smoother height expansion
        tl.to(navEl, {
            height: calculateHeight,
            duration: 0.25,
            ease: "power3.Out",  // smoother
        });

        // cards slide upward + fade in more gradually
        tl.fromTo(
            cardsRef.current,
            { y: 40, opacity: 0, scale: 0.96 },
            {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.25,
                ease: "expo.out",
                // stagger: 0.1,
            },
            "-=0.2" // start slightly before nav finishes
        );

        return tl;
    };


    useLayoutEffect(() => {
        const tl = createTimeline();
        tlRef.current = tl;

        return () => {
            tl?.kill();
            tlRef.current = null;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ease, items]);

    useLayoutEffect(() => {
        const handleResize = () => {
            if (!tlRef.current) return;

            if (isExpanded) {
                const newHeight = calculateHeight();
                gsap.set(navRef.current, { height: newHeight });

                tlRef.current.kill();
                const newTl = createTimeline();
                if (newTl) {
                    newTl.progress(1);
                    tlRef.current = newTl;
                }
            } else {
                tlRef.current.kill();
                const newTl = createTimeline();
                if (newTl) {
                    tlRef.current = newTl;
                }
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isExpanded]);

    const toggleMenu = () => {
        const tl = tlRef.current;
        if (!tl) return;
        if (!isExpanded) {
            setIsHamburgerOpen(true);
            setIsExpanded(true);
            tl.play(0);
        } else {
            setIsHamburgerOpen(false);
            tl.eventCallback("onReverseComplete", () => setIsExpanded(false));
            tl.reverse();
        }
    };

    const setCardRef = (i) => (el) => {
        if (el) cardsRef.current[i] = el;
    };

    const handleAnimationComplete = () => {
        console.log('All letters have animated!');
    };


    return (
        <div className={`card-nav-container ${className}`}>
            <nav
                ref={navRef}
                className={`card-nav ${isExpanded ? "open" : ""}`}
                style={{ backgroundColor: baseColor }}
            >
                <div className="card-nav-top">
                    <div
                        className={`hamburger-menu ${isHamburgerOpen ? "open" : ""}`}
                        onClick={toggleMenu}
                        role="button"
                        aria-label={isExpanded ? "Close menu" : "Open menu"}
                        tabIndex={0}
                        style={{ color: menuColor || "#000" }}
                    >
                        <div className="hamburger-line" />
                        <div className="hamburger-line" />
                    </div>

                    <SplitText
                        text="Welcome To My Site"
                        delay={100}
                        duration={0.6}
                        ease="power3.out"
                        splitType="chars"
                        from={{ opacity: 0, y: 40, fontWeight: 400, textTransform: "none", fontSize: "1rem" }}
                        to={{ opacity: 1, y: 0, color: "#000000", fontWeight: 700, textTransform: "uppercase", fontSize: "1.875rem" }} // 1.875rem = text-3xl
                        onLetterAnimationComplete={handleAnimationComplete}
                    />



                    <button
                        type="button"
                        className="card-nav-cta-button"
                        style={{ backgroundColor: buttonBgColor, color: buttonTextColor }}
                    >
                        Get Started
                    </button>
                </div>

                <div className="card-nav-content" aria-hidden={!isExpanded}>
                    {(items || []).slice(0, 3).map((item, idx) => (
                        <div
                            key={`${item.label}-${idx}`}
                            className="nav-card"
                            ref={setCardRef(idx)}
                            style={{ backgroundColor: item.bgColor, color: item.textColor }}
                        >
                            <div className="nav-card-label">{item.label}</div>
                            <div className="nav-card-links">
                                {item.links?.map((lnk, i) => (
                                    <a
                                        key={`${lnk.label}-${i}`}
                                        className="nav-card-link"
                                        href={lnk.href || "#"}
                                        aria-label={lnk.ariaLabel}
                                    >


                                        <GoArrowUpRight
                                            className="nav-card-link-icon"
                                            aria-hidden="true"
                                        />
                                        {lnk.label}
                                    </a>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </nav>
        </div>
    );
};

export default CardNav;
