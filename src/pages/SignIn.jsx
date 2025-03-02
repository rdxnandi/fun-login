import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../untils/AuthContext";
import { account } from "../components/appwrite/appwriteConfig";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      await account.createEmailPasswordSession(email, password);
      const userData = await account.get();
      setUser(userData);
      navigate("/");
    } catch (error) {
      // console.log(error);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="border border-gray-600 rounded-lg flex flex-col items-center justify-center p-7 w-[500px]">
        <h1 className="text-xl mb-5">Sign In</h1>
        <form onSubmit={handleSignIn}>
          <div className="flex flex-col gap-5 mb-7">
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border border-gray-600 outline-none px-4 py-3 w-[300px] rounded-md"
            />
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border border-gray-600 outline-none px-4 py-3 w-[300px] rounded-md"
            />
            <button
              type="submit"
              className="bg-black text-white rounded-md p-2 m-auto"
            >
              Sign In
            </button>
          </div>
        </form>
        <p className="text-xl">
          Don't account?{" "}
          <Link to="/signup" className="font-semibold">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignIn;
