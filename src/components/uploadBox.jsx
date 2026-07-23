import { useRef, useState, useEffect } from "react";
import {
  Upload,
  Camera,
  CameraIcon,
  Fish,
} from "lucide-react";

function UploadBox({ image, setImage, loading }) {
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [cameraOn, setCameraOn] = useState(false);
  const [stream, setStream] = useState(null);

  // Open file picker
  const openFilePicker = () => {
    fileInputRef.current.click();
  };

  // Upload from device
  const handleFileChange = (event) => {
        const file = event.target.files[0];

        if (!file) return;

        const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/webp",
        ];

        if (!allowedTypes.includes(file.type)) {
        alert("Please upload a JPG, PNG or WEBP image.");
        event.target.value = "";
        return;
        }

        if (file.size > 10 * 1024 * 1024) {
        alert("Image size must be less than 10MB.");
        event.target.value = "";
        return;
        }

        setImage(file);

        event.target.value = "";
    };

  // Open webcam
  const openCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });

      setStream(mediaStream);
      setCameraOn(true);
    } catch (err) {
      console.error(err);
      alert("Unable to access camera.");
    }
  };

  // Attach webcam stream to video element
  useEffect(() => {
    if (cameraOn && videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [cameraOn, stream]);

  // Stop webcam
  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }

    setStream(null);
    setCameraOn(false);
  };

  // Capture image from webcam
  const captureImage = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;

    const context = canvas.getContext("2d");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    context.drawImage(video, 0, 0);

    canvas.toBlob((blob) => {
      const file = new File([blob], "captured-fish.jpg", {
        type: "image/jpeg",
      });

      if (file.size > 10 * 1024 * 1024) {
        alert("Captured image is too large.");
        stopCamera();
        return;
        }

        setImage(file);

        stopCamera();
    }, "image/jpeg");
  };

  return (
    <>
      <div className="
            w-full
            max-w-4xl
            mx-auto
            rounded-3xl
            bg-white/90
            backdrop-blur-xl
            border
            border-slate-200
            shadow-2xl
            p-6
            sm:p-8
            "
      >

        {/* Preview Area */}

        {!cameraOn && (

        <div
        className="
        mb-8
        rounded-2xl
        bg-gradient-to-br
        from-slate-50
        to-cyan-50
        border
        border-slate-200
        overflow-hidden
        "
        >

        {image ? (

        <img
        src={image}
        alt="Fish Preview"
        className="
        w-full
        aspect-video
        object-cover
        "
        />

        ) : (

        <div
        className="
        aspect-video
        flex
        flex-col
        items-center
        justify-center
        px-6
        text-center
        "
        >

        <Fish
        size={58}
        className="text-cyan-500 mb-5"
        />

        <h3 className="text-2xl font-bold text-slate-800">

        Upload a Fish Image

        </h3>

        <p className="mt-3 text-slate-500">

        This AI model will identify the species and explain
        why it made the prediction.

        </p>

        <p className="mt-4 text-sm text-slate-400">

        JPG • PNG • WEBP • Max 10 MB

        </p>

        </div>

        )}

        </div>

        )}
        <div className="flex flex-col gap-4">

          <button
          onClick={openFilePicker}
          disabled={loading}
          className={`
          group
          flex
          items-center
          justify-center
          gap-3
          rounded-xl
          py-4
          font-semibold
          transition-all
          duration-300
          shadow-md
          hover:shadow-xl
          hover:-translate-y-1
          ${
          loading
          ?
          "bg-slate-400 text-white cursor-not-allowed"
          :
          "bg-gradient-to-r from-blue-600 to-cyan-500 text-white"
          }
          `}
          >

          <Upload size={20}/>

          {image
          ?
          "Upload Another"
          :
          "Upload from Device"}

          </button>

          <button
          onClick={openCamera}
          disabled={loading}
          className={`
          group
          flex
          items-center
          justify-center
          gap-3
          rounded-xl
          py-4
          font-semibold
          transition-all
          duration-300
          shadow-md
          hover:shadow-xl
          hover:-translate-y-1
          ${
          loading
          ?
          "bg-slate-400 text-white cursor-not-allowed"
          :
          "bg-gradient-to-r from-emerald-600 to-green-500 text-white"
          }
          `}
          >

          <Camera size={20}/>

          {image
          ?
          "Take Another"
          :
          "Take Photo"}

          </button>

        </div>

      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      <canvas
        ref={canvasRef}
        className="hidden"
      />
    </>
  );
}

export default UploadBox;