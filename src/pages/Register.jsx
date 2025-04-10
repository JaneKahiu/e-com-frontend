import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    re_password: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.re_password) {
      setError("Passwords do not match.");
      setSuccess(null);
      return;
    }

    const dataToSend = { ...formData }; 

    try {
      const response = await api.post("/auth/users/", dataToSend);

      if (response.status === 201) {
        setSuccess("User registered successfully! You can now log in.");
        setError(null);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      console.error("Error:", error.response);
      if (error.response) {
        const data = error.response.data;
        const errorMessage =
          data.username?.[0] ||
          data.email?.[0] ||
          data.password?.[0] ||
          data.re_password?.[0] ||
          data.detail ||
          "An error occurred. Please try again.";
        setError(errorMessage);
      } else {
        setError("An error occurred. Please try again.");
      }
      setSuccess(null);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300">
      <div className="bg-white shadow-lg rounded-2xl p-10 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">
          Create an Account
        </h2>

        {success && (
          <div className="bg-green-200 text-green-800 p-3 mb-4 rounded-lg text-center">
            {success}
          </div>
        )}

        {error && (
          <div className="bg-red-200 text-red-800 p-3 mb-4 rounded-lg text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
              placeholder="example@email.com"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Username</label>
            <input
              type="text"
              name="username"
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
              placeholder="Your username"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
              placeholder="Enter your password"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Confirm Password</label>
            <input
              type="password"
              name="re_password"
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
              placeholder="Confirm your password"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition duration-300"
          >
            Register
          </button>
        </form>
        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Log in here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
