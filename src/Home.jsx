import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import './Home.css'
const Home = () => {
  const [inputUser, setInputUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChnage = (event) => {
    setInputUser({
      ...inputUser,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); 
    // console.log(inputUser);
    const res = await axios.post("https://chandan-api.onrender.com/createuser", inputUser);
    console.log(res);
    fetchAllUser();
  };

  // All Data fetching
  const [userData, setUserData] = useState([]);
  const fetchAllUser = async () => {
    const res = await axios.get("https://chandan-api.onrender.com/readalluser");
    console.log(res);
    setUserData(res.data);
  };
  useEffect(() => {
    fetchAllUser();
  }, []);

  const handleDelete = async (id) => {
    const res = await axios.delete(`https://chandan-api.onrender.com/deleteuser/${id}`);
    if (res.status === 200) {
      fetchAllUser();
    }
  };
  return (

    <>
    <div className="w-2/3 mx-auto mt-5">

      {/* creating form */}
      <form onSubmit={handleSubmit}>
        <h1>Create User</h1>
        <div className="mt-3">
          <label className="text-lg text-gray-500 ">Name</label>
          <input
            type="text"
            name="name"
            className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent  border-2 border-gray-300 mt-1"
            placeholder="Enter Your Name"
            required
            value={inputUser.name}
            onChange={handleChnage}/>
        </div>

        <div className="mt-3">
          <label className=" text-lg text-gray-500 mt-3">Email</label>
          <input
            type="text"
            name="email"
            className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent  border-2 border-gray-300 mt-1"
            placeholder="Enter Your Email "
            required
            value={inputUser.email}
            onChange={handleChnage}/>
        </div>

        <div className="mt-3">
          <label className=" text-lg text-gray-500 ">Password</label>
          <input
            type="password"
            name="password"
            className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent  border-2 border-gray-300 mt-1"
            placeholder="Enter Your Password "
            required
            value={inputUser.password}
            onChange={handleChnage}/>
        </div>

        <div className="flex justify-center my-4">
          <button type="submit" className="btn px-8 py-3 bg-yellow-500 rounded-sm">
            Add User
          </button>
        </div>
      </form>


      {/* ------------------------------Records-------------------------------------------------- */}

      <div className="relative overflow-x-auto shadow-md">
        <table className="w-full text-lg text-center text-gray-500 ">
          <thead className="text-[17px] text-gray-700 uppercase bg-gray-500">
            <tr>
              <th scope="col" className="px-6 py-3">
                SN.
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th type="password" scope="col" className="px-6 py-3">
                Password
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {userData.map((item, i) => (
              <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {i + 1}
                </th>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {item?.name}
                </th>
                <td className="px-6 py-4"> {item?.email}</td>
                <td className="px-6 py-4"> {item?.password}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-x-4 justify-center">
                    <NavLink
                      to={`/readuser/${item._id}`}
                      className="font-medium text-green-600 dark:text-blue-500 hover:underline">
                     <i class="fa-brands fa-readme"></i>
                    </NavLink>

                    <NavLink
                      to={`/updateuser/${item._id}`}
                      className="font-medium text-yellow-400 dark:text-blue-500 hover:underline">
                      <i class="fa-solid fa-pen-to-square"></i>
                    </NavLink>

                    <button
                      onClick={() => handleDelete(item._id)}
                      className="font-medium text-red-500  hover:underline">
                      <i class="fa-solid fa-trash-can"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
};

export default Home;