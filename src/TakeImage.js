import React, { useState, useRef, useEffect } from 'react';
import { Camera, X } from 'lucide-react';
import CONFIG from './config';

const TakeImage = ({ onImageCapture, onClose }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isCameraOn, setIsCameraOn] = useState(true);

  useEffect(() => {
    if (isCameraOn) {
      startCamera();
    }
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, [isCameraOn]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      setIsCameraOn(false);
    }
  };

  const uploadImage = async (imageDataUrl) => {
    let base64data = imageDataUrl.split(';base64,')[1];

    fetch(`${CONFIG.API_URL}upload-image`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ image: base64data })
    })
      .then(response => response.json())
      .then(data => console.log('Upload response:', data))
      .catch(error => console.error('Upload error:', error));
  };

  const captureImage = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0);
    const imageDataUrl = canvas.toDataURL('image/jpeg');
    uploadImage(imageDataUrl);
    onImageCapture(imageDataUrl);
    console.log("Image captured successfully");
    setIsCameraOn(false);
    onClose();
  };

  if (!isCameraOn) {
    return (
      <button 
        onClick={() => setIsCameraOn(true)} 
        className="bg-green-500 text-white px-4 py-2 rounded-full flex items-center justify-center"
      >
        <Camera size={20} className="mr-2" />
        Start Camera
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      <div className="relative flex-grow">
        <video 
          ref={videoRef} 
          autoPlay 
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-white"
        >
          <X size={24} />
        </button>
      </div>
      <div className="bg-black p-4 flex justify-center">
        <button 
          onClick={captureImage}
          className="bg-white text-black rounded-full p-4"
        >
          <Camera size={32} />
        </button>
      </div>
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

export default TakeImage;