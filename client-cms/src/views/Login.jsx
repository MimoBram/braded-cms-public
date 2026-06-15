import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../constant/url";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(API_URL.LOGIN, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json" 
        },
        body: JSON.stringify({ email, password }),
      });

      const jsonData = await response.json();

      if (response.ok) {
        localStorage.setItem("token", jsonData.data.token);
        navigate("/dashboard");
      } else {
        setError(jsonData.message || "Invalid email or password");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="w-full max-w-md border-4 border-black p-8 bg-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] mx-auto my-24 font-sans text-black">
      <h2 className="text-4xl font-black italic tracking-tighter mb-2 uppercase">CMS LOGIN</h2>
      <p className="text-xs font-bold text-gray-500 uppercase mb-6">
        Branded Things Admin Panel Portal
      </p>
      {error && (
        <div className="bg-red-500 text-white p-3 border-2 border-black font-black text-xs uppercase mb-6">
          ERROR: {error}
        </div>
      )}
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <div>
          <label className="block text-xs font-black uppercase mb-1">Admin Email</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.value || e.target.value)} 
            required 
            placeholder="Enter your email"
            className="w-full p-3 border-2 border-black font-bold focus:outline-none" 
          />
        </div>
        <div>
          <label className="block text-xs font-black uppercase mb-1">Password</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            placeholder="Enter your password"
            className="w-full p-3 border-2 border-black font-bold focus:outline-none" 
          />
        </div>
        <button 
          type="submit" 
          className="w-full bg-black text-white p-4 font-black border-2 border-black uppercase text-sm mt-4 cursor-pointer hover:bg-white hover:text-black transition-all"
        >
          ENTER DASHBOARD
        </button>
      </form>
    </div>
  );
}

export default Login;