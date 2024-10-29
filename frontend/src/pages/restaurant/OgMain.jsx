import React from "react";
import ImageUploadForm from "../../components/AfterLoginRestaurantCompo/App";
import CameraCapture from "../../components/AfterLoginRestaurantCompo/photo";
const ogApp =()=>{
    return (
        <div>
            <CameraCapture />
            <ImageUploadForm/>
        </div>
    );
}

export default ogApp;