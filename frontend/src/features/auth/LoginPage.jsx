import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "./authSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { loading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(loginUser({ username, password })).unwrap();
      toast.success("Login successful! Redirecting...");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err || "Invalid username or password");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-stone-100">
      <div className="flex flex-col items-center justify-center h-[480px] w-[400px] bg-purple-200 border rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="flex flex-col w-full gap-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-purple-600 text-white py-2 rounded-md font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Logging in ..." : "Login"}
          </button>
          {/* {error && <p className="text-red-600 text-sm mt-2">{error}</p>} */}
        </form>
      </div>
    </div>
  );
}
