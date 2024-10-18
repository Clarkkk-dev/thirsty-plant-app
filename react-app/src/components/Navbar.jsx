import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [selectedValue, setSelectedValue] = useState("user");

  useEffect(() => {
    if (currentUser) {
      setSelectedValue("user"); 
    }
  }, [currentUser]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/sign-in");
    } catch (error) {
      console.log("Error signing out:", error);
    }
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedValue(value); 

    if (value === "sign-out") {
      handleSignOut();
    } else {
      navigate(value);
    }
  };

  const handleHomeClick = () => {
    setSelectedValue("user"); 
    navigate("/"); 
  };

  return (
    <header>
      <nav className="flex justify-between items-center gap-10 h-[100px] border-b-2 border-green-500 w-[30%] m-auto">
        <Link to="/" onClick={handleHomeClick}>
          <h1 className="text-[20px] font-bold text-green-500">ThirstyPlant</h1>
        </Link>
        <ul>
          {currentUser ? (
            <li>
              <select
                className="bg-transparent border-none cursor-pointer p-5"
                onChange={handleChange}
                value={selectedValue} 
              >
                <option value="user" disabled>
                  {currentUser.email} 
                </option>
                <option value="/drinking-schedule">Drinking Schedule</option>
                <option value="sign-out">Sign out</option>
              </select>
            </li>
          ) : (
            <li>
              <Link to="/sign-in">Sign in</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
