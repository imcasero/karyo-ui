import { lazy, LocationProvider, Router, Route } from "preact-iso";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";

export function App() {
  const Home = lazy(() => import("./pages/Home/Home"));
  const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard"));
  const Login = lazy(() => import("./pages/Login/Login"));
  const Register = lazy(() => import("./pages/Register/Register"));

  return (
    <AuthProvider>
      <LocationProvider>
        <Router>
          <Route path="/" component={Home} />
          <Route 
            path="/dashboard" 
            component={() => <ProtectedRoute component={Dashboard} />} 
          />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </Router>
      </LocationProvider>
    </AuthProvider>
  );
}
