import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import {
  Fish,
  Waves,
  Utensils,
  Ruler,
  BrainCircuit,
} from "lucide-react";

import ConfidenceRing from "./ConfidenceRing";
import FeatureCard from "./FeatureCard";
import InfoCard from "./InfoCard";

function AnimatedResultCard({ prediction }) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 40,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.7,
      }}
      className="
            w-full
            max-w-4xl
            mx-auto
            mt-12
            rounded-3xl
            bg-white/90
            backdrop-blur-xl
            shadow-2xl
            px-6
            py-10
            sm:px-8
            sm:py-12
            overflow-visible

        "
    >
      {/* Header */}

      {/* ================= HEADER ================= */}

        <div className="flex flex-col items-center">

            {/* Animated Fish Icon */}

            <motion.div

                initial={{
                    scale:0,
                    rotate:-90
                }}

                animate={{
                    scale:1,
                    rotate:0
                }}

                transition={{
                    type:"spring",
                    stiffness:170,
                    damping:12
                }}

                className="
                    w-16
                    h-16
                    rounded-full
                    bg-gradient-to-br
                    from-blue-500
                    to-cyan-400
                    flex
                    items-center
                    justify-center
                    shadow-lg
                    shadow-cyan-200
                "

            >

                <Fish
                    size={30}
                    className="text-white"
                />

            </motion.div>

            {/* Status */}

            <motion.h3

                initial={{
                    opacity:0,
                    y:12
                }}

                animate={{
                    opacity:1,
                    y:0
                }}

                transition={{
                    delay:.25
                }}

                className="
            pt-5
            text-[10px]
            sm:text-xs
            uppercase
            tracking-[0.2em]
            font-semibold
            text-slate-500
            text-center
        "

            >

                AI Classification Complete ✓

            </motion.h3>

            {/* Animated Gradient Line */}

            <motion.div

                initial={{
                    width:0
                }}

                animate={{
                    width:180
                }}

                transition={{
                    delay:.45,
                    duration:.8
                }}

                className="
                    mb-8
                    h-[3px]
                    rounded-full
                    mt-4
                    bg-gradient-to-r
                    from-blue-600
                    via-cyan-400
                    to-emerald-400
                "

            />

        <motion.h1
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: .5,
          }}
          className="
                text-3xl
                sm:text-4xl
                md:text-5xl
                font-extrabold
                text-slate-800
                mt-10
                text-center
                "
        >
          {prediction.species}
        </motion.h1>

        <p className="
            mt-2
            italic
            text-cyan-700
            text-xl
            tracking-wide
            ">
          {prediction.scientific_name}
        </p>

      </div>

      {/* Confidence Ring */}

      <div className="py-6 flex justify-center">
        <ConfidenceRing
          value={prediction.accuracy}
        />
      </div>

      {/* AI Analysis */}

      <div className="mt-12">

        <div className="flex items-center gap-3 mb-5">

            <BrainCircuit
                size={28}
                className="text-blue-600"
            />

            <h2 className="text-2xl font-bold text-slate-800">
                AI Visual Analysis
            </h2>

        </div>

        <div className="
                    bg-slate-50
                    rounded-2xl
                    p-5
                    sm:p-6
                    leading-7
                    text-slate-700
                    text-sm
                    sm:text-base
                    ">

          <TypeAnimation
            sequence={[
              `The uploaded fish exhibits visual characteristics that closely match ${prediction.species} (${prediction.scientific_name}). ${prediction.description}`,
            ]}
            speed={70}
            cursor={true}
          />

        </div>

      </div>

      {/* Features */}

      <div className="mt-12">

        <h2 className="text-xl font-bold text-slate-800 mb-5">
          Key Visual Features
        </h2>

        <div className="
                    grid
                    grid-cols-1
                    md:grid-cols-2
                    gap-4
                    "
        >

          {prediction.features.map((feature, index) => (
            <FeatureCard
              key={index}
              feature={feature}
              delay={0.3 * index}
            />
          ))}

        </div>

      </div>

      {/* Information */}

      <div className="mt-12">

        <h2 className="text-xl font-bold text-slate-800 mb-5">
          Species Information
        </h2>

        <div className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            gap-5
            "
        >

          <InfoCard
            icon={<Waves />}
            title="Habitat"
            value={prediction.habitat}
            delay={0}
          />

          <InfoCard
            icon={<Utensils />}
            title="Diet"
            value={prediction.diet}
            delay={0.2}
          />

          <InfoCard
            icon={<Ruler />}
            title="Average Length"
            value={prediction.average_length}
            delay={0.4}
          />

        </div>

      </div>

    </motion.div>
  );
}

export default AnimatedResultCard;
