import { useRef, useState, useEffect } from "react";
import {
  Upload,
  Camera,
  CameraIcon,
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
      <div className="w-full max-w-md border-2 border-dashed border-blue-300 rounded-2xl p-6 bg-white shadow-xl">

        {/* Preview */}
        {image && !cameraOn && (
          <img
            src={image}
            alt="Fish Preview"
            className="w-full h-64 object-contain rounded-lg mb-6"
          />
        )}

        {/* Camera */}
        {cameraOn && (
          <>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full rounded-lg mb-6"
            />

            <div className="flex gap-4">

              <button
                onClick={captureImage}
                className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg transition"
              >
                <CameraIcon size={18} />
                Capture
              </button>

              <button
                onClick={stopCamera}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg transition"
              >
                Cancel
              </button>

            </div>
          </>
        )}

        {/* Upload Buttons */}
        {!cameraOn && (
          <div className="flex flex-col gap-4">

            <button
                onClick={openFilePicker}
                disabled={loading}
                className={`flex items-center justify-center gap-2 py-3 rounded-lg transition ${
                    loading
                    ? "bg-gray-400 cursor-not-allowed text-white"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
            >

              <Upload size={20} />
              Upload from Device
            </button>

            <button
                onClick={openCamera}
                disabled={loading}
                className={`flex items-center justify-center gap-2 py-3 rounded-lg transition ${
                    loading
                    ? "bg-gray-400 cursor-not-allowed text-white"
                    : "bg-green-600 hover:bg-green-700 text-white"
                }`}
            >

              <Camera size={20} />
              Take Photo
            </button>

          </div>
        )}

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