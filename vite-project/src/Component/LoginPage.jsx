import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
   

    const [errorMessage, setErrorMessage] = useState(''); // State for error message
    const navigate = useNavigate('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:3000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Login successful", data);
                navigate("/ProductPage");
                // Save user data or token as needed
                // Optionally handle 'Remember Me' functionality
                if (rememberMe) {
                    localStorage.setItem("userEmail", email); // Example of saving email
                }
                // Navigate to dashboard or home page
            } else {
                const errorData = await response.json();
                console.log("Login failed", errorData.message);
                setErrorMessage(errorData.message || "Login failed");
            }
        } catch (error) {
            console.log("Error:", error);
            setErrorMessage("An error occurred during login.");
        }
    };

    return (
        <div className="bg-gradient-to-r from-blue-300 to-blue-600 min-h-screen flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h1 className="text-3xl font-bold text-center mb-6">Sign In</h1>

                {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>} {/* Error message display */}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="inline-flex items-center">
                            <input
                                type="checkbox"
                                className="form-checkbox"
                                checked={rememberMe}
                                onChange={() => setRememberMe(!rememberMe)} // Toggle remember me state
                            />
                            <span className="ml-2 text-gray-700">Remember me</span>
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
                    >
                        Sign In
                    </button>
                </form>

                <p className="mt-4 text-center">
                    Don't have an account?{" "}
                    <Link to="/RegistrationForm" className="text-blue-600 font-bold hover:underline">
                        Sign up
                    </Link>
                </p>
                <p className="text-center text-black mt-4">
                    Already have an account? <Link to="/CartPage" className="text-blue-500">cart</Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
