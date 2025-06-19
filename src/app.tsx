import { lazy, LocationProvider, Router, Route } from "preact-iso";

export function App() {
  const Home = lazy(() => import("./pages/Home/Home"));
  const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard"));
  const Login = lazy(() => import("./pages/Login/Login"));
  const Register = lazy(() => import("./pages/Register/Register"));
  return (
    <LocationProvider>
      <Router>
        <Route path="/" component={Home} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Router>
    </LocationProvider>
  );
}
