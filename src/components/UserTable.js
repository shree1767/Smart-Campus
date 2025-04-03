export function UserTable({ users, setSelectedUser }) {
  const getSeverityColor = (severity) => {
    switch (severity) {
      case "High":
        return "text-red-600 font-bold";
      case "Medium":
        return "text-orange-500 font-semibold";
      case "Low":
        return "text-green-500 font-semibold";
      default:
        return "";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "text-yellow-500 font-semibold";
      case "Resolved":
        return "text-green-600 font-semibold";
      case "In Progress":
        return "text-blue-500 font-semibold";
      default:
        return "";
    }
  };

  return (
    <table className="w-full text-left border-collapse">
      <thead>
        <tr className="bg-gray-200 text-gray-700">
          <th className="p-3">Reported by</th>
          <th className="p-3">Date</th>
          <th className="p-3">Category</th>
          <th className="p-3">Severity</th>
          <th className="p-3">Assigned to</th>
          <th className="p-3">Status</th>
          <th className="p-3">Response Time</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => (
          <tr key={index} className="border-t hover:bg-gray-100 transition">
            <td className="p-3">{user.reportedBy}</td>
            <td className="p-3">{user.date}</td>
            <td className="p-3">{user.category}</td>
            <td className={`p-3 ${getSeverityColor(user.severity)}`}>
              {user.severity}
            </td>
            <td className="p-3">{user.assignedTo}</td>
            <td className={`p-3 ${getStatusColor(user.status)}`}>
              {user.status}
            </td>
            <td className="p-3">{user.responseTime}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
