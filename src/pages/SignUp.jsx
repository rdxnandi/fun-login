import React, { useState } from "react";
import { account } from "../components/appwrite/appwriteConfig";
import { ID } from "appwrite";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../untils/AuthContext";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [createPassword, setCreatePassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (createPassword !== confirmPassword) {
      setError("Passwords do not match!");
    }

    if (!agreeTerms) {
      setError("Please must agree to the terms and conditions!");
    }

    try {
      const newUser = await account.create(
        ID.unique(),
        email,
        createPassword,
        name
      );

      await account.createEmailPasswordSession(email, createPassword);
      const userData = await account.get();
      setUser(userData);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="border border-gray-600 rounded-lg flex flex-col items-center justify-center p-7 w-[500px]">
        <h1 className="text-xl mb-5">Sign Up</h1>
        <form onSubmit={handleSignUp}>
          <div className="flex flex-col gap-5 mb-7">
            <input
              type="text"
              placeholder="Enter Name"
              name="name"
              onChange={(e) => setName(e.target.value)}
              required
              className="border border-gray-600 outline-none px-4 py-3 w-[300px] rounded-md"
            />
            <input
              type="email"
              placeholder="Enter Email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border border-gray-600 outline-none px-4 py-3 w-[300px] rounded-md"
            />
            <input
              type="password"
              placeholder="Enter Create Password"
              name="create_password"
              onChange={(e) => setCreatePassword(e.target.value)}
              required
              className="border border-gray-600 outline-none px-4 py-3 w-[300px] rounded-md"
            />
            <input
              type="password"
              placeholder="Enter Confirm Password"
              name="confirm_password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="border border-gray-600 outline-none px-4 py-3 w-[300px] rounded-md"
            />
            <div className="flex gap-3">
              <input type="checkbox" required />
              <p>Terms and Condition</p>
            </div>
            {error && <p className="text-red-500 mt-3">{error}</p>}
            <button
              type="submit"
              className="bg-black text-white rounded-md p-2 m-auto"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
