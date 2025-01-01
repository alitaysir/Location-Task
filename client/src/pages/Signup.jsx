import React, { useContext, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const Signup = () => {
  const [state, setState] = useState("Login");
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {setuser,settoken}=useAppContext();

  const submitHandler = async (e) => {
    e.preventDefault(); // Prevent form reload

    if (state === "SignUp") {
        try {
          const res = await axios.post("http://localhost:4001/api/user/register", { name, email, password });
          if (res.data.success) {
            setuser(res.data.user.name);
            localStorage.setItem('token',res.data.token)
            settoken(res.data.token)
            toast.success("User created successfully");
          } else {
            toast.error(res.data.message || "Error creating a user");
          }
        } catch (error) {
          console.error("Signup error: ", error);
          toast.error(error.response?.data?.message || "Error creating a user");
        }
      }
       else {
      try {
        const res = await axios.post("http://localhost:4001/api/user/login",{email,password})
        if(res.data.success){
          setuser(res.data.user.name);
          localStorage.setItem('token',res.data.token)
          settoken(res.data.token)
          toast.success("User logged in successfully")
        }else{
            toast.error("Error in user Login")
        }

      } catch (error) {
        console.error("Login error: ", error)
        toast.error("Error Logging In a user")      }
    }
  };

  function shifthandle(){
    if(state==="Login"){
        setState("SignUp")
        setIsSignup(true)
    }else{
        setState("Login")
        setIsSignup(false)
    }
  }

  return (
    <div className='flex flex-col items-center justify-center gap-3 bg-gray-100 h-screen'>
      <form onSubmit={submitHandler} className='flex flex-col items-center justify-center gap-3'>
        <h1 className='text-3xl font-semibold'>{state} Page</h1>
        {isSignup && (
          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='rounded px-5 py-2'
          />
        )}
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='rounded px-5 py-2'

        />
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='rounded px-5 py-2'

        />
        <button type="submit" className="px-3 py-1 bg-blue-500 text-white rounded">
          {state}
        </button>
        <p>
         {isSignup ? "Already have an account? " : "Don't have an account? " }<span onClick={shifthandle} className="text-blue-500 underline cursor-pointer">{isSignup ? "Login" : "SignUp"}</span>
        </p>
      </form>
    </div>
  );
};

export default Signup;
