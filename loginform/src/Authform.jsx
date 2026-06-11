import React, { useState } from "react";

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const [signupData, setSignupData] = useState({
    email: "",
    username: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errors, setErrors] = useState({});

  // Login Validation
  const handleLogin = () => {
    let newErrors = {};

    if (!loginData.username.trim()) {
      newErrors.username = "Username is required";
    }

    if (!loginData.password.trim()) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setLoginSuccess(true);
    }
  };

  // Signup Validation
  const handleSignup = () => {
    let newErrors = {};

    const usernameRegex = /^[A-Za-z0-9]+$/;

    const mobileRegex = /^[6-9]\d{9}$/;

    const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,16}$/;

    if (!signupData.email.trim()) {
      newErrors.email = "Email is required";
    }

    if (!usernameRegex.test(signupData.username)) {
      newErrors.username =
        "Username should contain only letters and numbers";
    }

    if (!mobileRegex.test(signupData.mobile)) {
      newErrors.mobile =
        "Enter a valid 10-digit Indian mobile number";
    }

    if (!passwordRegex.test(signupData.password)) {
      newErrors.password =
        "Password must be 8-16 characters with uppercase, lowercase, number and special character";
    }

    if (signupData.password !== signupData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      alert("Signup Successful!");
      setIsLogin(true);

      setSignupData({
        email: "",
        username: "",
        mobile: "",
        password: "",
        confirmPassword: "",
      });
    }
  };

  // Success Screen
  if (loginSuccess) {
    return (
      <div className="container">
        <div className="success-container">
          <h1>🎉 Login Successful</h1>
          <p>Welcome, {loginData.username}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="form-container">
        <div className="form-toggle">
          <button
            className={isLogin ? "active" : ""}
            onClick={() => {
              setErrors({});
              setIsLogin(true);
            }}
          >
            Login
          </button>

          <button
            className={!isLogin ? "active" : ""}
            onClick={() => {
              setErrors({});
              setIsLogin(false);
            }}
          >
            Sign Up
          </button>
        </div>

        {isLogin ? (
          <div className="form">
            <h2>Login Form</h2>

            <input
              type="text"
              placeholder="Enter Username"
              value={loginData.username}
              onChange={(e) =>
                setLoginData({
                  ...loginData,
                  username: e.target.value,
                })
              }
            />

            {errors.username && (
              <span className="error">{errors.username}</span>
            )}

            <input
              type={showLoginPassword ? "text" : "password"}
              placeholder="Enter Password"
              value={loginData.password}
              onChange={(e) =>
                setLoginData({
                  ...loginData,
                  password: e.target.value,
                })
              }
            />

            <button
              type="button"
              className="password-toggle"
              onClick={() =>
                setShowLoginPassword(!showLoginPassword)
              }
            >
              {showLoginPassword
                ? "Hide Password"
                : "Show Password"}
            </button>

            {errors.password && (
              <span className="error">{errors.password}</span>
            )}

            <button onClick={handleLogin}>Login</button>

            <p>
              Not a Member?{" "}
              <a
                href="/#"
                onClick={(e) => {
                  e.preventDefault();
                  setErrors({});
                  setIsLogin(false);
                }}
              >
                Register Here
              </a>
            </p>
          </div>
        ) : (
          <div className="form">
            <h2>Signup Form</h2>

            <input
              type="email"
              placeholder="Enter Email"
              value={signupData.email}
              onChange={(e) =>
                setSignupData({
                  ...signupData,
                  email: e.target.value,
                })
              }
            />

            {errors.email && (
              <span className="error">{errors.email}</span>
            )}

            <input
              type="text"
              placeholder="Enter Username"
              value={signupData.username}
              onChange={(e) =>
                setSignupData({
                  ...signupData,
                  username: e.target.value,
                })
              }
            />

            {errors.username && (
              <span className="error">{errors.username}</span>
            )}

            <input
              type="tel"
              placeholder="Enter Mobile Number"
              maxLength="10"
              value={signupData.mobile}
              onChange={(e) =>
                setSignupData({
                  ...signupData,
                  mobile: e.target.value.replace(/\D/g, ""),
                })
              }
            />

            {errors.mobile && (
              <span className="error">{errors.mobile}</span>
            )}

            <input
              type={showSignupPassword ? "text" : "password"}
              placeholder="Create Password"
              value={signupData.password}
              onChange={(e) =>
                setSignupData({
                  ...signupData,
                  password: e.target.value,
                })
              }
            />

            <button
              type="button"
              className="password-toggle"
              onClick={() =>
                setShowSignupPassword(!showSignupPassword)
              }
            >
              {showSignupPassword
                ? "Hide Password"
                : "Show Password"}
            </button>

            {errors.password && (
              <span className="error">{errors.password}</span>
            )}

            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={signupData.confirmPassword}
              onChange={(e) =>
                setSignupData({
                  ...signupData,
                  confirmPassword: e.target.value,
                })
              }
            />

            <button
              type="button"
              className="password-toggle"
              onClick={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
            >
              {showConfirmPassword
                ? "Hide Password"
                : "Show Password"}
            </button>

            {errors.confirmPassword && (
              <span className="error">
                {errors.confirmPassword}q
                
              </span>
            )}

            <button onClick={handleSignup}>Sign Up</button>
          </div>
        )}
      </div>
    </div>
  );
}