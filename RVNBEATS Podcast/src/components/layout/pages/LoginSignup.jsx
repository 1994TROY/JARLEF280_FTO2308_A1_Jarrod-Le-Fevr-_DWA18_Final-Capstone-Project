import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginSignup.css";
import { createClient } from "@supabase/supabase-js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

const LoginSignup = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signIn({ email, password });
    if (error) {
      toast.error("Username or password is not correct", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else navigate("/dashboard");
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { user, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      toast.error("Please ensure Password meets correct criteria", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      toast.success(
        "Thank you for signing up with RVNBEATS. Please confirm your email in order to continue the login",
        { position: toast.POSITION.TOP_RIGHT }
      );
      navigate("/login"); // Redirect to login page after signup
    }
  };

  const toggleForm = () => setIsLogin(!isLogin);

  return (
    <div className="login-signup-container">
      <ToastContainer />
      <div className="logo-container">
        <div
          className={`form-container ${isLogin ? "" : "form-container-shift"}`}
        >
          <div className="form-header">
            <h1>{isLogin ? "Login" : "Signup"}</h1>
            {!isLogin && (
              <nav>
                <button onClick={toggleForm} className="logsign-button">
                  Have an account?
                </button>
              </nav>
            )}
          </div>
          <form
            className={`form ${isLogin ? "login" : "signup"}`}
            onSubmit={isLogin ? handleLogin : handleSignup}
          >
            <div className="form-field">
              <input
                type="text"
                className="input-text"
                placeholder="Email Address"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-field">
              <input
                type="password"
                className="input-text"
                placeholder="Password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {!isLogin && (
              <div className="form-field">
                <input
                  type="password"
                  className="input-text"
                  placeholder="Confirm Password"
                  required
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            )}
            <div className="form-field">
              <button type="submit" className="submit-button">
                {isLogin ? "Login" : "Signup"}
              </button>
            </div>
          </form>
          {isLogin && (
            <div className="logsign-button-container">
              <button onClick={toggleForm} className="logsign-button">
                Need an account?
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
