import { useEffect, useRef, useState } from "react";
import UploadBox from "./components/uploadBox";
import Result from "./components/result";
import Footer from "./components/footer";
import logo from "./assets/IMG_9394.jpeg";
import { motion } from "framer-motion";
import { CircleCheckBig, Lightbulb, Fish } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [image, setImage] = useState(null);

  const [prediction, setPrediction] = useState(null);

  const [loading, setLoading] = useState(false);

  const [previewUrl, setPreviewUrl] = useState(null);

  const resultRef = useRef(null);

  useEffect(() => {
    if (!image) return;

    const identifyFish = async () => {
      try {
        setLoading(true);
        setPrediction(null);

        const formData = new FormData();
        formData.append("file", image);
        
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/predict`,
          {
            method: "POST",
            body: formData,
          }
        );
        if (!response.ok) {
          throw new Error("Prediction failed.");
        }

        const data = await response.json();

        setPrediction(data);

      } catch (error) {
        console.error("Prediction Error:", error);

        alert("Prediction failed. Please try again.");
      } finally {
          setLoading(false);
        }
    };

    identifyFish();
  }, [image]);

  useEffect(() => {
  if (!image) {
    setPreviewUrl(null);
    return;
  }

  const objectUrl = URL.createObjectURL(image);

  setPreviewUrl(objectUrl);

  return () => {
    URL.revokeObjectURL(objectUrl);
  };
}, [image]);

  useEffect(() => {
    if (prediction && resultRef.current) {
      resultRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [prediction]);

  return (
      <motion.div
      initial={{
        opacity: 0,
        y: 25,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.7,
      }}
      className="
      min-h-screen
      overflow-x-hidden
      flex
      flex-col
      items-center
      bg-slate-100
      px-4
      sm:px-6
      md:px-8
      py-8
      "
    >

      <div className="relative flex justify-center items-center mb-10">

      {/* Line behind the logos */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.3,
        }}
        className="
          absolute
          h-[3px]
          w-44
          rounded-full
          bg-gradient-to-r
          from-blue-600
          via-cyan-400
          to-emerald-400
        "
      />

      {/* Logos */}
      <div className="relative flex items-center">

        {/* School logo */}
        <div
          className="
            w-24
            h-24
            rounded-full
            bg-white
            border
            border-slate-200
            shadow-xl
            flex
            items-center
            justify-center
            z-10
          "
        >
          <img
            src={logo}
            alt="School Logo"
            className="w-20 h-20 rounded-full object-cover"
          />
        </div>

        {/* Pull the fish logo left so it overlaps the line */}
        <div
          className="
            -ml-2
            w-24
            h-24
            rounded-full
            bg-gradient-to-br
            from-blue-600
            to-cyan-400
            shadow-xl
            shadow-cyan-300
            flex
            items-center
            justify-center
            z-10
          "
          style={{ marginLeft: "5.5rem" }}
        >
          <Fish
            size={46}
            className="text-white"
          />
        </div>

      </div>

    </div>
  

<h1 className="text-5xl font-bold text-center text-blue-500 mb-10">
        Fish Species Identifier
      </h1>

      <p
      className="
      text-slate-500
      text-lg
      mt-3
      text-center
      max-w-xl
      "
      >

      AI-powered fish species identification using
      deep learning image analysis.

      </p>

      <div
        className="
          w-full
          max-w-4xl
          bg-amber-50
          border
          border-amber-200
          rounded-2xl
          p-6
          mb-8
        "
      >

        <div className="flex items-center gap-3 mb-5">

          <Lightbulb
            size={26}
            className="text-amber-600 flex-shrink-0"
          />

          <h2 className="text-lg font-bold text-amber-900 leading-relaxed">
            For Best Results
          </h2>

        </div>

        <div className="space-y-4">

          <div className="flex items-start gap-3">

            <CircleCheckBig
              size={22}
              className="text-green-600 flex-shrink-0"
            />

            <p className="text-slate-700 text-sm leading-relaxed">
              Ensure the image contains only <strong>one fish.</strong>
            </p>

          </div>

          <div className="flex items-start gap-3">

            <CircleCheckBig
              size={22}
              className="text-green-600 flex-shrink-0"
            />

            <p className="text-slate-700 text-sm leading-relaxed">
              Ensure the fish is <strong>clearly visible.</strong>
            </p>

          </div>

        </div>

      </div>

     

      <UploadBox
        image={previewUrl}
        setImage={setImage}
        loading={loading}
      />

      <div ref={resultRef} className="w-full">
        <Result
          loading={loading}
          prediction={prediction}
        />
      </div>

      <Footer />

    </motion.div>
  );
}

export default App;
