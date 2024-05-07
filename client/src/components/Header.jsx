import React from "react";
import { Link} from "react-router-dom";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { signoutSuccess } from "../redux/user/userSilce";

export default function () {
  const {currentUser} = useSelector((state) => state.user);


  const dispatch = useDispatch();


  const handleSignout = async () => {
    try {
      const res = await fetch('/api/user/signout', {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="bg-gradient-to-r from-[#141615] to-[#f3f8f3] via-white">
      <div className=" flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/vote">
          <h1 className="font-medium text-white text-xl ">Vote</h1>
        </Link>
        <ul className="flex gap-4">
          <Link to="/vote">
            <li className="font-serif text-xl text-slate-700 hover:text-slate-900">Home</li>
          </Link>

          {currentUser && currentUser.isAdmin && (<>
        <Link to="/mange">
               <h1 className="font-serif text-xl text-slate-700 hover:text-slate-900">ManageUser</h1>
               </Link>
      
      
      </>)}  

      {currentUser && currentUser.isAdmin && (<>
        <Link to="/wins">
               <h1 className="font-serif text-xl text-slate-700 hover:text-slate-900">Wins</h1>
               </Link>
      
      
      </>)} 
          
         

            {currentUser ? (
              <>
               <img src="https://a.storyblok.com/f/191576/1200x800/faa88c639f/round_profil_picture_before_.webp" alt="profile" className="h-8 w-8 rounded-full object-cover" />
               <span onClick={handleSignout} className=' cursor-pointer font-serif text-xl text-slate-700 hover:text-slate-900'>
               Sign Out
             </span>
             </>
               )
           
            :(
              <Link to="/sign-in" >
              <li className="font-serif text-xl text-slate-700 hover:text-slate-900">Sing In</li>
              </Link>
            )}
            
        
        </ul>
      </div>
    </div>
  );
}