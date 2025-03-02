import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../untils/AuthContext";
import { account } from "./appwrite/appwriteConfig";

function Header() {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();

  const handleSignOut = async () => {
    await account.deleteSession("current");
    setUser(null);
    navigate("/signin");
  };

  return (
    <header className="flex justify-between p-4 border-b border-gray-200">
      <div>
        <h1 className="text-2xl font-bold">
          <Link to="/">Logo</Link>
        </h1>
      </div>
      <div>
        {user ? (
          <button
            className="border border-gray-600 px-7 py-3 rounded-full cursor-pointer"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        ) : (
          <button className="border border-gray-600 px-7 py-3 rounded-full">
            <Link to="/signin">Sign In</Link>
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;
