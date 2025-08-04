import { useAuth } from "../../context/AuthContext";
import { useLocation } from "preact-iso";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await logout(user!.id);
      location.route("/");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-4xl font-bold text-blue-600 mb-4 text-center">Dashboard</h1>
        
        <div className="mb-6">
          <p className="text-lg text-gray-700 mb-2">
            Welcome, <span className="font-semibold">{user!.email}</span>!
          </p>
          <p className="text-sm text-gray-500">User ID: {user!.id}</p>
        </div>
        
        <p className="text-lg text-gray-700 mb-6 text-center">
          This is your protected dashboard area.
        </p>
        
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
