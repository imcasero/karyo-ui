import { useState } from "preact/hooks";
import { useAuth } from "../context/AuthContext";

export const Navbar = () => {
  const { user, logout, isLoading } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logout();
      // Redirect to login page
      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const handleLogoClick = () => {
    if (user) {
      window.location.href = "/dashboard";
    } else {
      window.location.href = "/";
    }
  };

  return (
    <nav className="bg-white sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1
                onClick={handleLogoClick}
                className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors cursor-pointer"
              >
                Karyo
              </h1>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {!isLoading && (
              <>
                {user ? (
                  <div className="flex items-center space-x-4">
                    <div className="hidden sm:flex sm:items-center sm:space-x-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-medium">
                            {user.email.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <span className="text-sm font-medium text-gray-700">
                          {user.email}
                        </span>
                      </div>
                    </div>

                    <div className="sm:hidden">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-medium">
                          {user.email.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={handleLogout}
                      disabled={isLoggingOut}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      {isLoggingOut ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          <span className="hidden sm:inline">
                            Logging out...
                          </span>
                          <span className="sm:hidden">...</span>
                        </>
                      ) : (
                        <>
                          <svg
                            className="w-4 h-4 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                            />
                          </svg>
                          <span className="hidden sm:inline">Logout</span>
                          <span className="sm:hidden">Out</span>
                        </>
                      )}
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center space-x-4">
                    {/* Login Link */}
                    <a
                      href="/login"
                      className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                        />
                      </svg>
                      <span className="hidden sm:inline">Sign In</span>
                      <span className="sm:hidden">In</span>
                    </a>
                  </div>
                )}
              </>
            )}

            {/* Loading State */}
            {isLoading && (
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-sm text-gray-600 hidden sm:inline">
                  Loading...
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
