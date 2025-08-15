import React, { useState } from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";
import BudgetForm from "./components/BudgetForm";

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [isSignup, setIsSignup] = useState(false);

  const handleSignOut = () => {
    setLoggedInUser(null);
  };

  return (
    <div className="app-container">
      {!loggedInUser ? (
        isSignup ? (
          <Signup
            onSignup={setLoggedInUser}
            onSwitchToLogin={() => setIsSignup(false)}
          />
        ) : (
          <Login
            onLogin={setLoggedInUser}
            onSwitchToSignup={() => setIsSignup(true)}
          />
        )
      ) : (
        <BudgetForm username={loggedInUser} onSignOut={handleSignOut} />
      )}
    </div>
  );
}

export default App;
