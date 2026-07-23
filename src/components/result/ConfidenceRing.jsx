import { motion, animate } from "framer-motion";
import { useEffect, useState } from "react";

function ConfidenceRing({ value }) {

    const displaySize = 170;      // Actual rendered size
    const viewBoxSize = 200;      // Large SVG canvas

    const stroke = 12;

    const center = viewBoxSize / 2;

    const radius = center - stroke;

    const circumference = 2 * Math.PI * radius;

    const offset =
        circumference -
        (value / 100) * circumference;

    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {

        const controls = animate(0, value, {

            duration: 1.8,

            onUpdate(v) {
                setDisplayValue(v);
            },

        });

        return () => controls.stop();

    }, [value]);

    return (

        <motion.div

            initial={{
                opacity: 0,
                y: 20,
            }}

            animate={{
                opacity: 1,
                y: 0,
            }}

            transition={{
                duration: 0.6,
            }}

            className="
                relative
                w-[170px]
                h-[170px]
                flex
                items-center
                justify-center
                overflow-visible
                mx-auto
            "

        >

            <svg

                width={displaySize}
                height={displaySize}

                viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}

                className="-rotate-90"

                style={{
                    overflow: "visible",
                    display: "block",
                }}

            >

                <defs>

                    <linearGradient
                        id="ringGradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                    >

                        <stop
                            offset="0%"
                            stopColor="#2563EB"
                        />

                        <stop
                            offset="100%"
                            stopColor="#06B6D4"
                        />

                    </linearGradient>

                </defs>

                <circle

                    cx={center}
                    cy={center}
                    r={radius}

                    fill="none"

                    stroke="#E2E8F0"

                    strokeWidth={stroke}

                />

                <motion.circle

                    cx={center}
                    cy={center}
                    r={radius}

                    fill="none"

                    stroke="url(#ringGradient)"

                    strokeWidth={stroke}

                    strokeLinecap="round"

                    strokeDasharray={circumference}

                    initial={{
                        strokeDashoffset: circumference,
                    }}

                    animate={{
                        strokeDashoffset: offset,
                    }}

                    transition={{
                        duration: 1.8,
                        ease: "easeOut",
                    }}

                />

            </svg>

            <div

                className="
                    absolute
                    inset-0
                    flex
                    flex-col
                    items-center
                    justify-center
                    text-center
                    pointer-events-none
                "

            >

                <h2 className="text-4xl font-bold text-slate-800">

                    {displayValue.toFixed(1)}%

                </h2>

                <p className="text-slate-500 text-sm">

                    Confidence

                </p>

            </div>

        </motion.div>

    );

}

export default ConfidenceRing;