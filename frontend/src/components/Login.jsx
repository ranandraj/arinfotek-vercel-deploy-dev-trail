import { useState } from "react";

function Login({ setIsLoggedIn }) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleLogin = async () => {

        try {

            const response = await fetch(
                "http://localhost:5000/api/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        username,
                        password
                    })
                }
            );

            const data = await response.json();

            if (data.message === "Login Success") {

                setIsLoggedIn(true);

            } else {

                setMessage("Invalid Username or Password");

            }

        } catch (error) {

            setMessage("Server Error");

        }
    };

    return (

        <div className="max-w-md mx-auto mt-20 shadow-lg p-6 rounded">

            <h1 className="text-2xl font-bold mb-5 text-center">
                Login
            </h1>

            <input
                type="text"
                placeholder="Username"
                className="w-full border p-2 mb-3 rounded"
                value={username}
                onChange={(e) =>
                    setUsername(e.target.value)
                }
            />

            <input
                type="password"
                placeholder="Password"
                className="w-full border p-2 mb-3 rounded"
                value={password}
                onChange={(e) =>
                    setPassword(e.target.value)
                }
            />

            <button
                onClick={handleLogin}
                className="bg-blue-600 text-white px-4 py-2 rounded w-full"
            >
                Login
            </button>

            <p className="text-red-500 mt-3">
                {message}
            </p>

        </div>
    );
}

export default Login;