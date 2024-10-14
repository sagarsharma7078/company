import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Combined imports for clarity

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        termsAccepted: false,
    });
    const [errorMessage, setErrorMessage] = useState(''); // State for error message
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:3000/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Registration successful", data);
                navigate("/LoginPage");
            } else {
                const errorData = await response.json();
                console.log("Registration failed", errorData.message);
                setErrorMessage(errorData.message || "Registration failed");
            }
        } catch (error) {
            console.log("Error:", error);
            setErrorMessage("An error occurred during registration.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-300 to-blue-600">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-2xl font-bold text-black text-center mb-6">Sign Up</h2>
                {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>} {/* Error message display */}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Name"
                            className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:border-blue-400"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email"
                            className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:border-blue-400"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Password"
                            className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:border-blue-400"
                            required
                        />
                    </div>
                    <div className="flex items-center mb-4">
                        <input
                            type="checkbox"
                            name="termsAccepted"
                            checked={formData.termsAccepted}
                            onChange={handleChange}
                            className="mr-2"
                            required
                        />
                        <label className="text-gray-600">I’ve read and agree to Terms & Conditions</label>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition"
                    >
                        Create Account
                    </button>
                </form>
                <p className="text-center text-black mt-4">
                    Already have an account? <Link to="/LoginPage" className="text-blue-500">Sign in</Link>
                </p>
                <p className="text-center text-black mt-4">
                    Check out our <Link to="/ProductPage" className="text-blue-500">Product</Link>
                </p>
            </div>
        </div>
    );
};

export default RegistrationForm;
