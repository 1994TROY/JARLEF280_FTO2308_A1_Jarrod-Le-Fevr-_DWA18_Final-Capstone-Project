import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginSignup.css";
import { createClient } from '@supabase/supabase-js'; 

const supabaseUrl = "https://cocqkidcedhuvtidhbgt.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNvY3FraWRjZWRodXZ0aWRoYmd0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE2MDk2NjEsImV4cCI6MjAyNzE4NTY2MX0.mHunkLWa7ZzYkwWDNwl2jrroKGKxt3kIh6a0Tzimfq8";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const LoginSignup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const { user, error } = await supabase.auth.signIn({ email, password });
      if (error) throw error;
      if (user) {
        navigate("/dashboard");
      }
    } catch (error) {
      setMessage(error.error_description || error.message);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setMessage("");
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }
    try {
      const { user, error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
      if (user) {
        setIsLogin(true);
        setMessage("Thank you for signing up with RVNBEATS. Please confirm your email to continue.");
      }
    } catch (error) {
      setMessage(error.message);
    }
  };

  console.log(supabase);
console.log(supabase.auth);

  return (
    <div className="login-signup-container">
    {message && <div className="message-box">{message}</div>}
    <div className="form-container">
        <div className="form-column">
          <div className="form-container">
            <div className="form-header">
              <h1>Signup</h1>
            </div>
            <form className="form signup" onSubmit={handleSignup}>
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
              <div className="form-field">
                <input
                  type="password"
                  className="input-text"
                  placeholder="Confirm Password"
                  required
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <div className="form-field">
                <button type="submit" className="submit-button">
                  Signup
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="form-column">
          <div className="form-container">
            <div className="form-header">
              <h1>Login</h1>
            </div>
            <form className="form login" onSubmit={handleLogin}>
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
              <div className="form-field">
                <button type="submit" className="submit-button">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
