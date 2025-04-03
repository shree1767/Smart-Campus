import { useState } from "react";
import { Navbar } from "./Navbar";
import { VideoUploadModal } from "./VideoUploadModal";
import { VideoTable } from "./VideoTable";
import { UserTable } from "./UserTable"
import { usersData } from "../services/data";
import { processVideo } from "../services/api";
import "../App.css";

export default function AdminDb() {
  const [isCongestionTracker, setIsCongestionTracker] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videos, setVideos] = useState([]);

  const handleVideoUpload = async (videoFile, location) => {
    if (videoFile && location) {
      try {
        const response = await processVideo(videoFile);
        if (response && response.count !== undefined) {
          const newVideo = {
            name: videoFile.name,
            url: URL.createObjectURL(videoFile),
            location,
            crowdCount: response.count,
            status: response.count > 20 ? "Needs Attention" : "Normal",
          };
          setVideos([...videos, newVideo]);
          setIsModalOpen(false);
        }
      } catch (error) {
        console.error("Failed to process video", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-blue-300 p-6">
      <Navbar setIsCongestionTracker={setIsCongestionTracker} />
      <main className="mt-6 mx-5">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-white text-2xl font-semibold">All Activity</h2>
          {isCongestionTracker && (
            <button
              className="bg-green-600 text-white px-4 py-2 rounded-lg shadow cursor-pointer"
              onClick={() => setIsModalOpen(true)}
            >
              Upload Video
            </button>
          )}
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          {isCongestionTracker ? (
            <VideoTable videos={videos} setSelectedVideo={setSelectedVideo} />
          ) : (
            <UserTable users={usersData} setSelectedVideo={setSelectedVideo}/>
          )}
        </div>
      </main>
      {isModalOpen && (
        <VideoUploadModal
          setIsModalOpen={setIsModalOpen}
          handleVideoUpload={handleVideoUpload}
        />
      )}
      {selectedVideo && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-10 rounded-lg shadow-lg max-w-4xl w-full">
            <video src={selectedVideo} controls className="w-full h-auto" />
            <button
              className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg"
              onClick={() => setSelectedVideo(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
