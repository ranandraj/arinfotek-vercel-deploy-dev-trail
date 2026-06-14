import { useState } from "react";
import Login from "./components/Login";
import StudentList from "./components/StudentList";

function App() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <div className="max-w-5xl mx-auto p-6">

            {!isLoggedIn ? (
                <Login setIsLoggedIn={setIsLoggedIn} />
            ) : (
                <StudentList />
            )}

        </div>
    );
}

export default App;