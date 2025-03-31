import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { processVideo } from "../services/api";
import "../App.css";
import logo from "../assets/image.svg";
import alert from "../assets/alerts.svg";
import user from "../assets/profile.svg";

export default function AdminDb() {
  const [isCongestionTracker, setIsCongestionTracker] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videoFile, setVideoFile] = useState(null); // For the video file
  const [location, setLocation] = useState(""); // For the location input
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state for API call

  const handleVideoUpload = async () => {
    if (videoFile && location) {
      setLoading(true); // Show loading spinner
      try {
        const response = await processVideo(videoFile); // Call the API to process video

        if (response && response.count !== undefined) {
          const newVideo = {
            name: videoFile.name,
            url: URL.createObjectURL(videoFile),
            location: location, // Use the user-provided location
            crowdCount: response.count,
            status: response.count > 20 ? "Needs Attention" : "Normal",
          };
          setVideos([...videos, newVideo]); // Add the new video to the list
          setIsModalOpen(false); // Close modal after adding footage
        } else {
          console.error("Invalid response from server:", response);
        }
      } catch (error) {
        console.error("Failed to process video", error);
      } finally {
        setLoading(false); // Hide loading spinner after API call
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-blue-300 p-6">
      <header className="flex justify-between items-center p-4">
        <div className="flex items-center space-x-2">
          <img src={logo} alt="SRM Logo" className="h-16" />
        </div>
        <div className="flex space-x-4">
          <button
            className="bg-blue-600 text-white px-4 py-3 rounded-full shadow"
            onClick={() => setIsCongestionTracker(true)}
          >
            Congestion Tracker
          </button>
          <button
            className="border border-blue-600 text-blue-600 px-4 py-3 rounded-full shadow"
            onClick={() => setIsCongestionTracker(false)}
          >
            Manage Users
          </button>
          <button>
            <img src={alert} alt="Alerts" className="h-12" />
          </button>
          <button>
            <img src={user} alt="Profile" className="h-12" />
          </button>
        </div>
      </header>

      <main className="mt-6 mx-5">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-white text-2xl font-semibold">All Activity</h2>
          {isCongestionTracker && (
            <div>
              <button
                className="bg-green-600 text-white px-4 py-2 rounded-lg shadow cursor-pointer"
                onClick={() => setIsModalOpen(true)}
              >
                Upload Video
              </button>
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
                  <tr
                    key={index}
                    className="border-t hover:bg-gray-100 transition"
                  >
                    <td
                      className="p-3 text-blue-600 underline cursor-pointer"
                      onClick={() => setSelectedVideo(video.url)}
                    >
                      {video.name}
                    </td>
                    <td className="p-3">{video.location}</td>
                    <td className="p-3">{video.crowdCount}</td>
                    <td
                      className={`p-3 ${
                        video.status === "Needs Attention"
                          ? "text-red-500"
                          : "text-green-500"
                      } font-semibold`}
                    >
                      {video.status}
                    </td>
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

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            {loading ? (
              <div className="flex flex-col items-center">
                <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16 mb-4"></div>
                <p className="text-gray-700 text-lg font-semibold">
                  Processing Footage...
                </p>
              </div>
            ) : (
              <form>
                <div className="flex justify-between mb-4">
                  <h3 className="text-xl font-semibold">Add Video Footage</h3>
                  <button onClick={() => setIsModalOpen(false)}>
                    <FaTimes />
                  </button>
                </div>
                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) => setVideoFile(e.target.files[0])}
                  className="mb-4 w-full"
                  required
                />
                <input
                  type="text"
                  placeholder="Enter Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="mb-4 w-full p-2 border border-gray-300 rounded"
                  required
                />
                <button
                  type="submit"
                  className="bg-blue-600 text-white w-full py-2 rounded-lg"
                  onClick={handleVideoUpload}
                >
                  Add Footage
                </button>
              </form>
            )}
          </div>
        </div>
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
