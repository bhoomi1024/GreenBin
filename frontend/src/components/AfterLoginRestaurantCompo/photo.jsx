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
    <div style={{ textAlign: 'center' }}>
      <h2>Camera Capture</h2>
      {!photo ? (
        <>
          <video ref={videoRef} autoPlay style={{ width: '100%', maxWidth: '500px' }} />
          <button onClick={startCamera}>Start Camera</button>
          <button onClick={takePhoto}>Capture Photo</button>
        </>
      ) : (
        <>
          <img src={photo} alt="Captured" style={{ width: '100%', maxWidth: '500px' }} />
          <button onClick={downloadPhoto}>Download Photo</button>
          <button onClick={() => setPhoto(null)}>Retake Photo</button>
        </>
      )}
      <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
    </div>
  );
}

export default CameraCapture;
