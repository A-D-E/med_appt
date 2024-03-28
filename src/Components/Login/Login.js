import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';

import './Login.css';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("auth-token")) {
      navigate("/")
    }
  }, []);

  const validateInput = (field, value) => {
    let error = '';

    switch (field) {
      case 'email':
        if (!value) {
          error = 'This field is required';
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          error = 'Please enter a valid email address';
        }
        break;
      case 'password':
        if (!value) {
          error = 'This field is required';
        } else if (value.length < 8) {
          error = 'Password must be at least 8 characters';
        }
        break;
      default:
        break;
    }

    return error;
  };

  const handleChange = (e) => {
    const { id, value } = e.currentTarget;
    const error = validateInput(id, value);

    setFormData({
      ...formData,
      [id]: value,
    });

    setErrors({
      ...errors,
      [id]: error,
    });
  };

  const isSubmitDisabled = () => {
    return Object.values(errors).some(error => error) || !formData.email || !formData.password || formData.password.length < 8;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // name: name,
          email:formData.email,
          password: formData.password,
        }),
      });
      const json = await res.json();
      if (json.authtoken) {
        sessionStorage.setItem('auth-token', json.authtoken);
    
        sessionStorage.setItem('email', formData.email);
        navigate('/');
        window.location.reload()
      } else {
        if (json.errors) {
          for (const error of json.errors) {
            alert(error.msg);
          }
        } else {
          alert(json.error);
        }
      }
  };

  return (
    <div className="container">
      <div className="login-grid">
        <div className="login-text">
          <h2>Login</h2>
        </div>
        <div className="login-text">
          Are you a new member?{' '}
          <span>
            <Link to="/SignUp" style={{ color: "#2190ff", fontWeight: 'bold' }}>
              Sign Up Here
            </Link>
          </span>
        </div>
        <br />
        <div className="login-form">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                className="form-control"
                placeholder="Enter your email"
                aria-describedby="helpId"
                onChange={handleChange}
              />
              {errors.email && <div className="error">{errors.email}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                className="form-control"
                placeholder="Enter your password"
                aria-describedby="helpId"
                onChange={handleChange}
              />
              {errors.password && <div className="error">{errors.password}</div>}
            </div>

            <div className="btn-group">
              <button
                type="submit"
                className={`btn mb-2 mr-1 waves-effect waves-light ${isSubmitDisabled() ? 'btn-disabled' : 'btn-primary'}`}
                disabled={isSubmitDisabled()}
              >
                Login
              </button>
              <button
                type="reset"
                className="btn btn-danger mb-2 waves-effect waves-light"
              >
                Reset
              </button>
            </div>
            <br />
            <div className="login-text">Forgot Password?</div>
          </form>
        </div>
      </div>
    </div>
  );
}
