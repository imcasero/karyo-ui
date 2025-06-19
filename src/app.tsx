import { lazy, LocationProvider, Router, Route } from "preact-iso";

export function App() {
  const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard"));
  const Login = lazy(() => import("./pages/Login/Login"));
  return (
    <LocationProvider>
      <Router>
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/login" component={Login} />
      </Router>
    </LocationProvider>
  );
}
