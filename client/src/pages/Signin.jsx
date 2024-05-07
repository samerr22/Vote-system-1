import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from "../redux/user/userSilce";


export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error: errorMessage} = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlchange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ( !formData.email || !formData.password) {
      return dispatch(signInFailure('please fill all the fields'));
    }

    try {
      dispatch(signInStart());

      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }
     
      if(res.ok){
        dispatch(signInSuccess(data));
        navigate('/vote');
      }
    } catch (error) {
      dispatch(signInFailure(data.message));
    }
  };

  return (
    <div className="  ">

<img src="https://t3.ftcdn.net/jpg/01/25/14/36/360_F_125143621_PeyQ9V9HmFNO8Rwmqxojv4Ki6QyU0snF.jpg" alt="" className="w-full h-[900px] object-cover " />
<div className="absolute transform -translate-x-0 translate-y-0 top-1 ml-6 ">
      <div className="mt-56 ml-80">
        
      <div className="bg-white bg-opacity-20 border   ml-28  w-[600px] h-96 rounded-xl">
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
           
            
            <div className="flex justify-center items-center mt-14">
           
              <input
              className=" bg-slate-100 p-3 rounded-lg w-[460px] h-11"
                type="email"
                placeholder="name@company.com"
                id="email"
                onChange={handlchange}
              />
            </div>
            <div className="flex justify-center items-center">
            
              <input
              className=" bg-slate-100 p-3 rounded-lg w-[460px] h-11"
                type="password"
                placeholder="Password"
                id="password"
                onChange={handlchange}
              />
            </div>

            <div className="flex justify-center items-center">
            <button
              className=" bg-gradient-to-r from-[#141615] to-[#f3f8f3] via-white text-black p-3 rounded-lg w-[460px] h-11 hover:opacity-90"
              type="submit"
              disabled={loading}
            >
              {
              loading ? (
                <>
                  <Spinner size="sm" />
                  <sapn className="pl-3">Loading...</sapn>
                </>
              ) : (
                "Sign In"
              )}
            </button>

            </div>
           
       
          </form>
          <div className="flex gap-2 text-sm ml-20 mt-5">
            <span>Dont Have an account?</span>
            <Link to="/sign-up" className="text-white">
              Sign Up
            </Link>
          </div>
          {errorMessage && (
            <p className="mt-5 text-white w-300 h-7 rounded-lg text-center ">
              {errorMessage}
            </p>
          )}
        </div>
        </div>
      </div>
      </div>
    </div>
  );
}
