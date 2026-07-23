import {
  Card,
  Divider,
  Progress,
  Tag,
  Descriptions,
} from "antd";

import { motion } from "framer-motion";

import { TypeAnimation } from "react-type-animation";

import AnimatedResultCard from "./result/AnimatedResultCard";

function Result({ loading, prediction }) {

  if (loading) {
    return (
      <div className="mt-10 flex flex-col items-center">

        <div className="w-10 h-10 rounded-full border-4 border-slate-300 border-t-blue-600 animate-spin"></div>

        <p className="mt-5 text-slate-600 text-lg">
          Identifying fish species...
        </p>

      </div>
    );
  }

  if (!prediction) return null;

  return (
    <AnimatedResultCard prediction={prediction} />
  );
}

export default Result;