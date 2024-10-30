import React from "react";
import ImageUploadForm from "../../components/AfterLoginRestaurantCompo/App";
import CameraCapture from "../../components/AfterLoginRestaurantCompo/photo";

const ogApp = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-8 py-8 gap-8 pl-[35%] w-full pr-[20%]">
      <CameraCapture />
      <ImageUploadForm />
    </div>
  );
};

export default ogApp;