import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import moment from 'moment';

export default function DashUsers() {
  const { currentUser } = useSelector((state) => state.user);
  const [items, setItems] = useState([]);
  const [ItemDelete, setItemToDelete] = useState("");
  console.log("sameea", items);

  useEffect(() => {
    const fetchitems = async () => {
      try {
        const res = await fetch(`/api/user/getvoteuser`);
        const data = await res.json();

        if (res.ok) {
          setItems(data.infoo);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchitems();
  }, []);

  const handleDeleteUser = async () => {
    try {
      const res = await fetch(
        `/api/Sale/Pdelete/${ItemDelete}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (res.ok) {
        setItems((prev) => prev.filter((item) => item._id !== ItemDelete));
        alert("deleted")
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <div className="h-[600px] relative">
         
      <img src="https://t3.ftcdn.net/jpg/01/25/14/36/360_F_125143621_PeyQ9V9HmFNO8Rwmqxojv4Ki6QyU0snF.jpg" alt="" className="w-full h-[600px] object-cover " />
      <div className="absolute transform -translate-x-0 translate-y-0 top-1 ml-56 ">
        <div className="flex justify-center items-center mb-2">
            <h1 className="font-serif text-white text-3xl  ml-32 mb-6 mt-4">
            Winners
            </h1>
        </div>


      <div className="w-[800px] h-[500px]  ml-36 rounded-lg border shadow-lg shadow-slate-300 border-white bg-slate-100 bg-opacity-35">

<div className="max-h-96 overflow-y-auto">
  <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
    {currentUser.isAdmin ? (
      <>
        <table className="w-full divide-y divide-green-500 shadow-md">
          <thead className="bg-white">
            <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              profile
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
               name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Vote
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Register Date
              </th>
              
            </tr>
          </thead>
          <tbody className=" divide-y divide-gray-200">
            {items.map((item) => (
              <tr
                key={item._id}
                className="bg-black bg-opacity-50 text-white dark:border-black dark:bg-black"
              >
                 <td className="px-6 py-4 whitespace-nowrap">
                 <img src="https://a.storyblok.com/f/191576/1200x800/faa88c639f/round_profil_picture_before_.webp" alt="profile" className="h-8 w-8 rounded-full object-cover" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.username}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                 {item.points}
                </td>
               
               
                <td className="px-6 py-4 whitespace-nowrap">
               
                 
                  {moment(item.updatedAt).format("YYYY-MM-DD hh:mm:ss A")}
                 
                </td>

               
              </tr>
            ))}
          </tbody>
        </table>
      </>
    ) : (
      <p>You have no users yet!</p>
    )}
  </div>
</div>
</div>
        
       </div>

   </div>
    </div>
  );
}


