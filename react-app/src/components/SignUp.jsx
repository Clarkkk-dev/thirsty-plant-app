import React, { useReducer } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth } from '../config/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const initialState = {
  email: '',
  password: '',
  confirmPassword: '',
  error: ''
};

const formReducer = (state, action) => {
  switch (action.type) {
    case 'SET_EMAIL':
      return { ...state, email: action.payload };
    case 'SET_PASSWORD':
      return { ...state, password: action.payload };
    case 'SET_CONFIRM_PASSWORD':
      return { ...state, confirmPassword: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'CLEAR_ERROR':
      return { ...state, error: '' };
    default:
      return state;
  }
};

const SignUp = () => {

  const [state, dispatch] = useReducer(formReducer, initialState);
  const { email, password, confirmPassword, error } = state;
  const navigate = useNavigate();

  const handleSignUp = async (e) => {

    e.preventDefault();
    
    dispatch({ type: 'CLEAR_ERROR' });

    if (password !== confirmPassword) {
      dispatch({ type: 'SET_ERROR', payload: 'Passwords do not match!' });
      return;
    }

    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      console.log(user);
      navigate('/');
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  };

  return (
    <div className="w-screen mt-[100px] flex flex-col justify-center items-center">
      <img src="/assets/cactus.png" alt="Cactus" className="w-[200px]" />
      <h1 className="mb-[30px] text-[30px] font-bold">Sign up</h1>

      <form className="w-[20%] m-auto" onSubmit={handleSignUp}>
        <label className="flex flex-col mb-4">
          Email
          <input
            type="email"
            value={email}
            className="bg-transparent border-2 border-black-200 p-2 rounded-[5px]"
            onChange={(e) => dispatch({ type: 'SET_EMAIL', payload: e.target.value })}
            required
          />
        </label>

        <label className="flex flex-col mb-4">
          Password
          <input
            type="password"
            value={password}
            className="bg-transparent border-2 border-black-800 p-2 rounded-[5px]"
            onChange={(e) => dispatch({ type: 'SET_PASSWORD', payload: e.target.value })}
            required
          />
        </label>

        <label className="flex flex-col mb-4">
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            className="bg-transparent border-2 border-black-800 p-2 rounded-[5px]"
            onChange={(e) => dispatch({ type: 'SET_CONFIRM_PASSWORD', payload: e.target.value })}
            required
          />
        </label>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="flex justify-center gap-3 mb-4">
          <p>Already have an account?</p>
          <Link to="/sign-in" className="text-green-500 font-bold">
            Sign in
          </Link>
        </div>

        <button
          type="submit"
          className="rounded-[5px] text-[20px] bg-green-500 p-2 w-[200px] text-white mt-[30px] hover:bg-green-600"
        >
          Sign up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
