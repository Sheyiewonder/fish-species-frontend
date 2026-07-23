import { motion } from "framer-motion";
import { Fish } from "lucide-react";
import profile from "../assets/profile.jpeg";

function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="
        w-full
        max-w-4xl
        mt-20
        rounded-3xl
        bg-white/80
        backdrop-blur-xl
        border
        border-slate-200
        shadow-xl
        px-8
        py-10
      "
    >
      <div className="flex flex-col items-center">

        {/* Profile */}
          <div className="relative">

        {/* Accent Ring */}
        <div
          className="
            absolute
            inset-0
            rounded-full
            ring-2
            ring-cyan-400/70
            ring-offset-4
            ring-offset-white
          "
        />

        <img
          src={profile}
          alt="Developer"
          className="
            relative
            w-36
            h-36
            rounded-full
            object-cover
            border-4
            border-white
            shadow-xl
          "
        />

        {/* Floating Fish Badge */}
        <motion.div
          animate={{
            y: [0, -5, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
          className="
            absolute
            -bottom-2
            -right-2
            w-12
            h-12
            rounded-full
            bg-gradient-to-br
            from-blue-600
            to-cyan-400
            flex
            items-center
            justify-center
            shadow-lg
          "
        >
          <Fish
            size={22}
            className="text-white"
          />
        </motion.div>

      </div>

        {/* Divider */}

        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: 120 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="
            h-[3px]
            rounded-full
            bg-gradient-to-r
            from-blue-600
            via-cyan-400
            to-emerald-400
            my-7
          "
        />

        {/* Text */}

        <p className="text-slate-500 uppercase tracking-[0.3em] text-sm">
          By
        </p>

        <h2 className="mt-2 text-3xl font-bold text-slate-800 text-center">
          Falodun Eniola Grace
        </h2>

        <p className="mt-1 text-lg text-cyan-600 font-medium">
          FAT/20/4424
        </p>

        <div className="mt-8 w-full border-t border-slate-200 pt-6">

          <p className="text-center text-sm text-slate-400">
            © 2026 Fish Species Identifier • All Rights Reserved
          </p>

        </div>

      </div>
    </motion.footer>
  );
}

export default Footer;