// import { useState } from "react";
// import UploadBox from "./components/UploadBox";
// import Result from "./components/Result";
// import Footer from "./components/Footer";

// function App() {
//   const [image, setImage] = useState(null);

//   // Temporary mock result until FastAPI is connected
//   const [prediction] = useState({
//     species: "African Catfish",
//     accuracy: 94,
//   });

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">

//       < className="text-4xl font-bold mb-10">
//         Fish Species Identifier
//       </h1>

//       <UploadBox
//         image={image}
//         setImage={setImage}
//       />

//       <Result prediction={prediction} />

//       <Footer />

//     </div>
//   );
// }

// export default App; 

import { useEffect, useState } from "react";
import UploadBox from "./components/uploadBox";
import Result from "./components/result";
import Footer from "./components/footer";
import logo from "./assets/IMG_9394.jpeg";
const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [image, setImage] = useState(null);

  const [prediction, setPrediction] = useState(null);

  const [loading, setLoading] = useState(false);

  const [previewUrl, setPreviewUrl] = useState(null);

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

        setPrediction({
          species: data.species,
          accuracy: data.accuracy,
        });
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

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4 py-16 mb-10">
      <img
    src={logo}
    alt="Fish Species Identifier"
    className="w-36 h-36 object-cover rounded-2xl border-4 border-blue-500 shadow-lg mb-6"
/>

      <h1 className="text-5xl font-bold text-center text-blue-500 mb-10">
        Fish Species Identifier
      </h1>

      <UploadBox
        image={previewUrl}
        setImage={setImage}
        loading={loading}
      />

      <Result
        loading={loading}
        prediction={prediction}
      />

      <Footer />

    </div>
  );
}

export default App;
