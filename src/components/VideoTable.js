export function VideoTable({ videos, setSelectedVideo }) {
    return (
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="p-3">Video File</th>
            <th className="p-3">Location</th>
            <th className="p-3">Crowd Count</th>
            <th className="p-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {videos.map((video, index) => (
            <tr key={index} className="border-t hover:bg-gray-100 transition">
              <td
                className="p-3 text-blue-600 underline cursor-pointer"
                onClick={() => setSelectedVideo(video.url)}
              >
                {video.name}
              </td>
              <td className="p-3">{video.location}</td>
              <td className="p-3">{video.crowdCount}</td>
              <td
                className={`p-3 ${video.status === "Needs Attention" ? "text-red-500" : "text-green-500"} font-semibold`}
              >
                {video.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
}