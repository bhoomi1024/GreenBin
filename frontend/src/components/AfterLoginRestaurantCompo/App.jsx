import React, { useState } from "react";
import { generatingResult } from "../../../../backend/api/testing";
import "./App.css";

const videoLinks = {
  "plastic bottles": "https://www.youtube.com/embed/QaIjcTdO2Ys?si=j-PAfVXYauLsRgcq",
  "plastic bags": "https://www.youtube.com/embed/mn0SZbMiO9s?si=oOi4x2zgCmYsGRmq",
  "plastic boxes": "https://www.youtube.com/embed/mn0SZbMiO9s?si=oOi4x2zgCmYsGRmq",
  "other plastic waste": "https://www.youtube.com/embed/mn0SZbMiO9s?si=oOi4x2zgCmYsGRmq"
};

const DIYInstructionsDisplay = ({ response }) => {
  const lines = response?.split('/').filter(line => line.trim() !== '') || [];
  const category = lines[1]?.toLowerCase() || "";

  const videoKey = Object.keys(videoLinks).find(key => 
    category.includes(key.toLowerCase())
  );
  
  const videoUrl = videoLinks[videoKey] || videoLinks["other plastic waste"];

  return (
    <div className="  diy-container">
      <div className=" diy-card">
        <div className="diy-header ">
          <h2 className="pl-[120px]">DIY Recycling Project</h2>
        </div>
        <div className="diy-content">
          {lines.map((line, index) => {
            const trimmedLine = line.trim();
            const isHeader = trimmedLine.includes(':') && !trimmedLine.startsWith('1.') && !trimmedLine.startsWith('2.') && !trimmedLine.startsWith('3.');
            const isStep = /^\d+\./.test(trimmedLine);
            
            return (
              <div 
                key={index} 
                className={`diy-line ${isHeader ? 'header-line' : ''} ${isStep ? 'step-line' : ''}`}
              >
                {trimmedLine}
              </div>
            );
          })}
        </div>
      </div>

      <div className="video-container">
        <h3>Watch Related DIY Video</h3>
        <div className="video-wrapper">
          <iframe
            src={videoUrl}
            title="DIY Tutorial"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

const ImageUploadForm = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (selectedImage) {
      setLoading(true);
      try {
        const reader = new FileReader();
        reader.onloadend = async () => {
          const image = {
            inlineData: {
              data: reader.result.split(",")[1],
              mimeType: selectedImage.type,
            },
          };

          const prompt = `I'm going to show you an image of a recyclable waste item. Please analyze it and categorize it into one of these categories: plastic bottles, plastic bags, plastic boxes, or other plastic waste. Then provide a detailed DIY guide using '/' as delimiters, following this exact format:

I see a [item] made of [material]. /

Category: [one of: plastic bottles/plastic bags/plastic boxes/other plastic waste] /

Best DIY Project: [Name of creative and practical project] /

Time needed: [Realistic duration] /

Materials needed: /
- [Main material (the waste item)] /
- [List 2-3 additional required materials with specific details] /

Detailed Instructions: /
1. [Comprehensive first step with measurements and preparation methods] /
2. [Detailed second step with safety precautions] /
3. [Thorough final step with finishing details] /

Pro Tips: /
- [Important technique tips] /
- [Maintenance advice] /

Final Result: Your [item] is now transformed into a [new purpose]. Here's how to best use it: [usage instructions] /`;

          const response = await generatingResult(prompt, image);
          setResult(response);
        };
        reader.readAsDataURL(selectedImage);
      } catch (error) {
        console.error("Error processing image:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className=" justify-center items-center  px-4">
      <div className="upload-card  p-4 w-full max-w-md">
        <div className="card-header mb-3">
          <h2 className="text-2xl font-bold text-center">Upload Recyclable Item Image</h2>
        </div>
        <div className="card-content">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                required
                className="file-input mb-3 block w-full text-sm text-gray-900 border rounded-lg cursor-pointer"
              />
              
              {imagePreview && (
                <div className="image-preview mb-3">
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="mx-auto w-48 h-auto"
                  />
                </div>
              )}
              
              <button 
                type="submit" 
                disabled={!selectedImage || loading}
                className={`submit-button w-full bg-green-500 text-white py-2 rounded-lg transition duration-200 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {loading ? "Processing..." : "Get DIY Ideas"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {result && <DIYInstructionsDisplay response={result} />}
    </div>
  );
};

export default ImageUploadForm;