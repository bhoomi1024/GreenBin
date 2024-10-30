import React, { useState, useRef } from 'react';

function CameraCapture() {
  const [photo, setPhoto] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const startCamera = async () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    }
  };

  const takePhoto = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    setPhoto(canvas.toDataURL('image/png'));

    // Stop the camera after capturing the photo
    video.srcObject.getTracks().forEach(track => track.stop());
  };

  const downloadPhoto = () => {
    const link = document.createElement('a');
    link.href = photo;
    link.download = 'captured_photo.png';
    link.click();
  };

  return (
    <div className="flex flex-col items-center justify-center h-auto w-[440px]  ">
      <h1 className="font-bold text-2xl mb-4 mt-16">Camera Capture</h1>
      {!photo ? (
        <video ref={videoRef} autoPlay className="mb-4 border border-gray-400 rounded" />
      ) : (
        <img src={photo} alt="Captured" className="mb-4 border border-gray-400 rounded" />
      )}
      <canvas ref={canvasRef} className="hidden"></canvas>
      {!photo ? (
        <div className='flex gap-[30px]'>

          <button
            onClick={startCamera}
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded mb-2 hover:bg-blue-600 transition"
          >
            Start Camera
          </button>
          <button
            onClick={takePhoto}
            className="bg-green-500 text-white font-bold py-2 px-4 mb-2 rounded hover:bg-green-600 transition"
          >
            Capture Photo
          </button>
        </div>
      ) : (
        <>
          <button
            onClick={downloadPhoto}
            className="bg-green-800 text-white font-bold py-2 px-4 rounded mb-2 hover:bg-green-700 transition"
          >
            Download Photo
          </button>
          <button
            onClick={() => setPhoto(null)}
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition"
          >
            Retake Photo
          </button>
        </>
      )}
    </div>
  );
}

export default CameraCapture;
