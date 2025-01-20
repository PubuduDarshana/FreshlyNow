import React, { useState } from "react";
import LogInPage from "../../components/LogInPage/LogInPage";
import SignUpPage from "../../components/SignUpPage/SignUpPage";
import "./UserLoginSignup.css"

const UserLoginSignup = () => {
    
  const [view, setView] = useState("login");

  return (
    <div>
      <div className="userLoginSignup">
        <button
          className={view === "login" ? "active" : ""}
          onClick={() => setView("login")}
        >
          Login
        </button>
        <button
          className={view === "signup" ? "active" : ""}
          onClick={() => setView("signup")}
        >
          Signup
        </button>
      </div>
      {view === "login" && <LogInPage />}
      {view === "signup" && <SignUpPage />}
    </div>
  );
};

export default UserLoginSignup;