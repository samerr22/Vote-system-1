import React, { useEffect, useState } from "react";


import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


export default function Mypoint() {
 
   
    const [errorMessage, setErrorMessage] = useState(null);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const navigate = useNavigate();
    
    const [user, setuser] = useState([]);
    console.log(user);
    
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`api/user/getvoteuser`);
        const data = await response.json();
        console.log("dataa", data);

        if (response.ok) {
          setuser(data.infoo);
        } else {
          setuser([]);
        }
      } catch (error) {
        console.error("Error fetching bid data:", error);
      }
    };

    fetchData();
  }, []);

 

  const handleSubmit = async (e,Id) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/user/addpoint/${Id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });
  
      const data = await response.json();
      if (response.ok) {
        setShowSuccessModal(true);
      } else {
        throw new Error(data.message || "Failed to add points");
      }
    } catch (error) {
      console.error("Failed to add points:", error);
      setErrorMessage(error.message);
    }
  };


  const closeModal = () => {
    setShowSuccessModal(false);
  };

  return (
    <div className="flex">
      <img src="https://t3.ftcdn.net/jpg/01/25/14/36/360_F_125143621_PeyQ9V9HmFNO8Rwmqxojv4Ki6QyU0snF.jpg" alt="" className="w-full h-[800px] object-cover " />

      <div className="absolute transform -translate-x-0 translate-y-0 top-20 ">
        <div className="bg-slate-400 mt-20 w-[800px] h-[500px] rounded-2xl ml-[340px] border border-white  bg-opacity-50">
        
        {user.map((state, index) => (
                  <div key={index}  className="gap-2   rounded-xl bg-opacity-40 ">

                     <div className="flex  items-center justify-center  ">
                     <div className="font-serif  text-6xl mt-5  text-gray-800">
                   {state.username}
                    </div>
                    <div className="font-extralight text-gray-600">
                     {state.points}
                    </div>
                    <div>
                    

                     </div>
                     

                    
                 </div>
                 <div className="flex justify-center items-start mt-2">
                

                 </div>

                 <div className="flex justify-center items-start mt-2">
              <button
               onClick={(e) => handleSubmit(e, state._id)} 
                className="bg-gradient-to-r from-green-600 shadow-md to-green-900 border border-white text-white w-32 h-14 rounded-xl"
              >
                Vote
              </button>
            </div>
                 

                  </div>
                ))}
        </div>
       
      </div>
      {showSuccessModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div
              className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                    <svg
                      className="h-6 w-6 text-green-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900"
                      id="modal-headline"
                    >
                      Success!
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Your vote has been successfully recorded.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={closeModal}
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
