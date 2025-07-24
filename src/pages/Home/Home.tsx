const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen ">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">Home</h1>
      <p className="text-lg text-gray-700">Welcome to the Home!</p>
      <div className="mt-4 space-x-4">
        <a href="/login">Login</a>
        <a href="/register">Register</a>
        <a href="/dashboard">Dashboard</a>
      </div>
    </div>
  );
};
export default Home;
