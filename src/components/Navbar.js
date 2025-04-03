import logo from "../assets/image.svg"
import alert from "../assets/alerts.svg"
import profile from "../assets/profile.svg"

export function Navbar({ setIsCongestionTracker }) {
    return (
      <header className="flex justify-between items-center p-4">
        <button className="flex items-center space-x-2" onClick={() => setIsCongestionTracker(false)}>
          <img src={logo} alt="SRM Logo" className="h-16" />
        </button>
        <div className="flex space-x-4">
          <button
            className="bg-blue-600 text-white px-4 py-3 rounded-full shadow"
            onClick={() => setIsCongestionTracker(true)}
          >
            Congestion Tracker
          </button>
          <button
            className="border border-blue-600 text-blue-600 hover:text-white hover:bg-blue-600 transition px-4 py-3 rounded-full shadow"
            onClick={() => setIsCongestionTracker(false)}
          >
            Monitor Activity
          </button>
          <button className="flex items-center space-x-2" onClick={() => {}}>
          <img src={alert} alt="SRM Logo" className="h-12" />
        </button>
        <button className="flex items-center space-x-2" onClick={() => {}}>
          <img src={profile} alt="SRM Logo" className="h-12" />
        </button>
        </div>
      </header>
    );
  }