import { useState } from "react";

export function VideoUploadModal({ setIsModalOpen, handleVideoUpload }) {
    const [videoFile, setVideoFile] = useState(null);
    const [location, setLocation] = useState("");
  
    const handleSubmit = () => {
      handleVideoUpload(videoFile, location);
    };
  
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <h2 className="text-lg font-semibold mb-4">Upload Video</h2>
          <input type="file" accept="video/*" onChange={(e) => setVideoFile(e.target.files[0])} className="mb-3" />
          <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} className="w-full p-2 border rounded mb-3" />
          <div className="flex justify-end space-x-2">
            <button className="bg-gray-300 px-4 py-2 rounded" onClick={() => setIsModalOpen(false)}>Cancel</button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={handleSubmit}>Upload</button>
          </div>
        </div>
      </div>
    );
  }
  