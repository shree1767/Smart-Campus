import { useState } from "react";
import { FaExclamationCircle, FaUserCircle } from "react-icons/fa";
import { processVideo } from "../services/api";

export default function AdminDb() {
  const [isCongestionTracker, setIsCongestionTracker] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videos, setVideos] = useState([]);

  const handleVideoUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const response = await processVideo(file);
        const newVideo = {
          name: file.name,
          url: URL.createObjectURL(file),
          location: "Unknown",
          crowdCount: response.count,
          status: response.count > 20 ? "Needs Attention" : "Pending",
        };
        setVideos([...videos, newVideo]);
      } catch (error) {
        console.error("Failed to process video", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-blue-300 p-6">
      <header className="flex justify-between items-center p-4 bg-white shadow-md rounded-lg">
        <div className="flex items-center space-x-2">
          <img src="https://vectorlogoseek.com/wp-content/uploads/2019/03/srm-institute-of-science-and-technology-vector-logo.png" alt="SRM Logo" className="h-12" />
        </div>
        <div className="flex space-x-4">
          <button 
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow" 
            onClick={() => setIsCongestionTracker(true)}
          >
            Congestion Tracker
          </button>
          <button 
            className="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg shadow"
            onClick={() => setIsCongestionTracker(false)}
          >
            Manage Users
          </button>
          <FaExclamationCircle className="text-red-500 text-2xl cursor-pointer" />
          <FaUserCircle className="text-blue-600 text-2xl cursor-pointer" />
        </div>
      </header>

      <main className="mt-6">
      <div className="flex justify-between items-center mb-4">
          <h2 className="text-white text-2xl font-semibold">All Activity</h2>
          {isCongestionTracker && (
            <div>
              <input type="file" accept="video/*" onChange={handleVideoUpload} className="hidden" id="videoUpload" />
              <label htmlFor="videoUpload" className="bg-green-600 text-white px-4 py-2 rounded-lg shadow cursor-pointer">
                Upload Video
              </label>
            </div>
          )}
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                {isCongestionTracker ? (
                  <>
                    <th className="p-3">Video File</th>
                    <th className="p-3">Location</th>
                    <th className="p-3">Crowd Count</th>
                    <th className="p-3">Status</th>
                  </>
                ) : (
                  <>
                    <th className="p-3">Reported by</th>
                    <th className="p-3">Date</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Severity</th>
                    <th className="p-3">Assigned to</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Response Time</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {isCongestionTracker ? (
                videos.map((video, index) => (
                  <tr key={index} className="border-t hover:bg-gray-100 transition">
                    <td className="p-3 text-blue-600 underline cursor-pointer" onClick={() => setSelectedVideo(video.url)}>
                      {video.name}
                    </td>
                    <td className="p-3">{video.location}</td>
                    <td className="p-3">{video.crowdCount}</td>
                    <td className="p-3 text-yellow-500 font-semibold">{video.status}</td>
                  </tr>
                ))
              ) : (
                <tr className="border-t hover:bg-gray-100 transition">
                  <td className="p-3">John Doe</td>
                  <td className="p-3">2025-03-31</td>
                  <td className="p-3">Network</td>
                  <td className="p-3 text-red-600 font-bold">High</td>
                  <td className="p-3">Admin</td>
                  <td className="p-3 text-yellow-500 font-semibold">Pending</td>
                  <td className="p-3">2 hrs</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>

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
