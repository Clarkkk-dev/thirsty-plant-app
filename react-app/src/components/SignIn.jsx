import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth } from '../config/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const SignIn = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const signIn = async (e) => {
    e.preventDefault(); 
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log(user);
      navigate('/'); 
    } catch (error) {

      setError(error.message);
    }
  };

  return (
    <>
      <div className="w-screen mt-[100px] flex flex-col justify-center items-center">
        <img src="/assets/cactus.png" alt="Cactus" className="w-[200px]" />
        <p className="text-[20px] mb-[30px]">
          Sign in to modify your drinking schedule.
        </p>
        <h1 className="mb-[30px] text-[30px] font-bold">Sign in</h1>

        <form className="w-[20%] m-auto" onSubmit={signIn}>
          <label className="flex flex-col">
            Email
            <input
              type="email"
              className="bg-transparent border-2 border-black-200 p-2 rounded-[5px]"
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label className="flex flex-col">
            Password
            <input
              type="password"
              className="bg-transparent border-2 border-black-800 p-2 rounded-[5px]"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          {error && <p className="text-red-500 mb-4">{error}</p>}
          
          <div className="flex justify-center gap-3 mt-2">
            <p>Don't have an account?</p>
            <Link to="/sign-up" className="text-green-500 font-bold">
              Sign up
            </Link>
          </div>

          <button
            className="rounded-[5px] text-[20px] bg-green-500 p-2 w-[200px] text-white mt-[30px] hover:bg-green-600"
            type="submit"
          >
            Sign in
          </button>
        </form>
      </div>
    </>
  );
};

export default SignIn;
