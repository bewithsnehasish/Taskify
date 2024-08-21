import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className=" h-[98vh] flex items-center justify-center />">
      <div className="p-4 w-2/6 bg-gray-800">
        <div className="text-center text-2xl font-bold">Login</div>
        <input
          type="email"
          placeholder="Enter your email"
          className="bg-gray-700 px-3 py-2 my-3 w-full rounded"
          name="xyz@gmail.com"
          required
        />
        <input
          type="password"
          placeholder="Enter your password"
          className="bg-gray-700 px-3 py-2 my-3 w-full rounded"
          name="password"
          required
        />
        <div className="flex items-center justify-between w-full">
          <button className="bg-blue-400 text-xl font-semibold text-black px-4 py-2 rounded-lg">
            Login
          </button>
          <Link to="/signup" className="text-gray-400 hover:text-gray-200">
            Not Having an account? Signup
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
