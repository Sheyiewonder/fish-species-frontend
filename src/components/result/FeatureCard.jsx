import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

function FeatureCard({ feature, delay = 0 }) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        x: -30,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      transition={{
        duration: 0.45,
        delay,
      }}
      whileHover={{
        y: -4,
        scale: 1.02,
      }}
      className="
            flex
            flex-col
            items-center
            justify-center
            text-center
            gap-3
            p-5
            sm:p-6
            rounded-2xl
            bg-white/80
            backdrop-blur-lg
            border
            border-white/50
            shadow-md
            hover:shadow-xl
            transition-all
        "
    >
      <CheckCircle2
        className="text-emerald-500"
        size={24}
      />

      <p className="
                text-slate-700
                font-medium
                leading-relaxed
                text-sm
                sm:text-base
                ">
        {feature}
      </p>
    </motion.div>
  );
}

export default FeatureCard;