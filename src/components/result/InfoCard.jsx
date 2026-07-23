import { motion } from "framer-motion";

function InfoCard({
  icon,
  title,
  value,
  delay = 0,
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 30,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.5,
        delay,
      }}
      whileHover={{
        y: -6,
      }}
      className="
            rounded-2xl
            bg-white/80
            backdrop-blur-lg
            p-5
            sm:p-6
            shadow-lg
            border
            border-white/50
            flex
            flex-col
            items-center
            justify-center
            text-center
            min-h-[200px]
        "
    >
      <div className="text-3xl sm:text-4xl mb-4 text-blue-600">
        {icon}
      </div>

      <h3 className="text-base sm:text-lg font-semibold text-slate-800">
        {title}
      </h3>

      <p className="mt-3 text-slate-500 leading-relaxed">
        {value}
      </p>
    </motion.div>
  );
}

export default InfoCard;