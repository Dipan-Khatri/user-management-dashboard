import { Outlet, useNavigate } from "react-router-dom";

export function Sidebar() {
  const navigate = useNavigate(); // Initialize the useNavigate hook

  // Function to handle navigation
  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">Analytics</h2> {/* Changed the title to "Analytics" */}
          <nav>
            <button
              onClick={() => handleNavigation("/dashboard")}
              className="block w-full text-left py-2 px-4 text-blue-600 bg-blue-100 rounded"
            >
              Dashboard
            </button> {/* Moved Dashboard as a submenu item */}
            <button
              onClick={() => handleNavigation("/users")}
              className="block w-full text-left py-2 px-4 text-gray-700 hover:bg-gray-200 rounded mt-1"
            >
              Users
            </button>
            <button
              onClick={() => handleNavigation("/clients")}
              className="block w-full text-left py-2 px-4 text-gray-700 hover:bg-gray-200 rounded mt-1"
            >
              Clients
            </button>
            <button
              onClick={() => handleNavigation("/settings")}
              className="block w-full text-left py-2 px-4 text-gray-700 hover:bg-gray-200 rounded mt-1"
            >
              Settings
            </button>
          </nav>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 p-8 overflow-auto">
        <Outlet /> {/* This will render the nested routes */}
      </div>
    </div>
  );
}
