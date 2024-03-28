import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginSignup.css";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://cocqkidcedhuvtidhbgt.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNvY3FraWRjZWRodXZ0aWRoYmd0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE2MDk2NjEsImV4cCI6MjAyNzE4NTY2MX0.mHunkLWa7ZzYkwWDNwl2jrroKGKxt3kIh6a0Tzimfq8"; // Use the .env file to store this key
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const LoginSignup = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signIn({ email, password });
    if (error) console.error("Login error:", error.message);
    else navigate("/dashboard");
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) console.error("Signup error:", error.message);
    else navigate("/dashboard");
  };

  const toggleForm = () => setIsLogin(!isLogin);

  return (
    <div className="login-signup-container">
      <div className="logo-container">
        <div
          className={`form-container ${isLogin ? "" : "form-container-shift"}`}
        >
          <div className="form-header">
            <h1>{isLogin ? "Login" : "Signup"}</h1>
            <nav>
              <button onClick={toggleForm} className="toggle-button">
                {isLogin ? "Need an account?" : "Have an account?"}
              </button>
            </nav>
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
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
