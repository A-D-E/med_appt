import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';
import './SignUp.css';

export default function SignUp() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        password: ''
      });
    
      const [errors, setErrors] = useState({
        name: '',
        phone: '',
        email: '',
        password: ''
      });
    
      const [showerr, setShowerr] = useState('');

      const validateInput = (field, value) => {
        let error = '';
    
        switch (field) {
          case 'name':
          case 'email':
            if (!value) {
              error = 'This field is required';
            } else if (value.length < 2) {
              error = 'Must be at least 2 characters';
            }
            break;
          case 'password':
            if (!value) {
              error = 'This field is required';
            } else if (value.length < 6) { 
              error = 'Must be at least 6 characters';
            }
            break;
          case 'phone':
            if (!value) {
              error = 'This field is required';
            } else if (!/^\d{0,10}$/.test(value)) {
              error = 'Must be a valid phone number with max 10 digits';
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
          [id]: value
        });
    
        setErrors({
          ...errors,
          [id]: error
        });
      };
    
      
      const isSubmitDisabled = () => {
        return Object.values(errors).some(error => error) || 
               !formData.name || 
               !formData.email || 
               !formData.password || 
               !formData.phone || 
               formData.password.length < 6; 
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${API_URL}/api/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: formData.name,
                email: formData.email,
                password: formData.password,
                phone: formData.phone,
            }),
        });
        const json = await response.json();
        if (json.authtoken) {
            sessionStorage.setItem("auth-token", json.authtoken);
            sessionStorage.setItem("name", formData.name);
            // phone and email
            sessionStorage.setItem("phone", formData.phone);
            sessionStorage.setItem("email", formData.email);
            // Redirect to home page
            navigate("/");   //on directing to home page you need to give logic to change login and signup buttons with name of the user and logout button where you have implemented Navbar functionality
            window.location.reload();
        } else {
            if (json.errors) {
                for (const error of json.errors) {
                    setShowerr(error.msg);
                }
            } else {
                setShowerr(json.error);
            }
        }
      };
  return (
    <div className="container" style={{ marginTop: "5%"}}>
        <div className="signup-grid">
            <div className="signup-text">
                <h1>Sign Up</h1>

            </div>
            <div className="signup-text1" style={{textAlign: "left"}}>
                Already a member? <span><Link to="/Login" style={{color: "#2190FF"}}> Login</Link></span>
            </div>
            <div className="signup-form">
                <form>

                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input onChange={handleChange} type="text" name="name" id="name" required className="form-control" placeholder="Enter your name" aria-describedby="helpId" />
                        {errors.name && <div className="error">{errors.name}</div>}
</div>
                    <div className="form-group">
                        <label htmlFor="phone">Phone</label>
                        <input onChange={handleChange} type="tel" name="phone" id="phone" required className="form-control" placeholder="Enter your phone number" aria-describedby="helpId" />
                        {errors.phone && <div className="error">{errors.phone}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input onChange={handleChange} type="email" name="email" id="email" required className="form-control" placeholder="Enter your email" aria-describedby="helpId" />
                        {errors.email && <div className="error">{errors.email}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input onChange={handleChange} name="password" type="password" id="password" required className="form-control" placeholder="Enter your password" aria-describedby="helpId" />
                        {errors.password && <div className="error">{errors.password}</div>}
                    </div>
                    <div className="btn-group">
                    <button onClick={handleSubmit} disabled={isSubmitDisabled()} type="submit" className={`btn mb-2 mr-1 waves-effect waves-light ${isSubmitDisabled() ? 'btn-disabled' : 'btn-primary'}`}>Submit</button>
                        <button type="reset" className="btn btn-danger mb-2 waves-effect waves-light">Reset</button>
                    </div>
                </form>
                {showerr && <div className="error">{showerr}</div>}
            </div>
        </div>
    </div>
  )
}
