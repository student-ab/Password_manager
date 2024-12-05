import { useEffect, useRef, useState } from "react";
// import React from 'react';
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
  const [form, setform] = useState({ site: "", username: "", passwords: "" });
  const [passwordArray, setpasswordArray] = useState([]);

  const getpassword = async () => {
    let req = await fetch("http://localhost:4001/")
    let response = await req.json();
    console.log( response);
    setpasswordArray( response )
  };

  useEffect(() => {
   getpassword();
  }, []);

  const passwordRef = useRef();
  const iconRef = useRef();

  const showThePass = () => {
    if (iconRef.current.src.includes("cross_eye.png")) {
      iconRef.current.src = "icons/eye3.png";
      passwordRef.current.type = "password";
    } else {
      iconRef.current.src = "icons/cross_eye.png";
      passwordRef.current.type = "text";
    }
  };
  const copyToClipboard = (text) => {
    // alert("text copied");
    toast(" copied to clipboard!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,  
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    navigator.clipboard.writeText(text);
  };

  const save_password = async () => {
    if (form.site.length > 3 && form.username.length > 3 && form.passwords.length > 3) {
      await fetch("http://localhost:4001/" , { method : "POST" , headers:{ "Content-Type" : "application/json" } , body : JSON.stringify({id: form.id} ) } )
      

    setpasswordArray([...passwordArray, {...form , id:uuidv4()} ]);
    await fetch("http://localhost:4001/" , { method : "POST" , headers:{ "Content-Type" : "application/json" } , body : JSON.stringify({...form , id:uuidv4()} ) } )
 
    // localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form , id:uuidv4()}]));

    // console.log([...passwordArray, form]);
    setform({ site: "", username: "", passwords: "" });
    }
    else {
      toast("Please fill all the fields", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }


  };


  const handle_change = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };



  const edit_password = (id) => {

    console.log("edit_password" , id);
    setform({...passwordArray.filter(i => i.id === id)[0] , id : id});
    setpasswordArray(passwordArray.filter((item) => item.id !== id));

    

  };
  const delete_password = async (id) => {
    console.log("delete_password", id);
    let c = confirm("Are you sure you want to delete");
      if (c) {
        setpasswordArray(passwordArray.filter((item) => item.id!== id));
         await fetch("http://localhost:4001/" , { method : "DELETE" , headers:{ "Content-Type" : "application/json" } , body : JSON.stringify({ id} ) } )
        // localStorage.setItem("passwords", JSON.stringify(passwordArray.filter((item) => item.id!== id)));
       
      }
   

  };




  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce"
      />
      {/* Same as */}
      <ToastContainer />
      <div
        className="absolute inset-0 -z-10 h-full w-full bg-neutral-800 "
      >
        <div
          className="absolute bottom-0 left-0 right-0 top-0
       bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]"
        ></div>
      </div>
      <div className=" p-3 md:mycontainer  min-h-[88vh] ">
        <h1 className="text-4xl text font-bold text-center">
          
          <span className="text-white text-4xl " >Password-Manager </span>
         
        </h1>
        <p className="text-white text-lg text-center ">Stored that matter!</p>

        <div className="text-black flex flex-col items-center  p-4 gap-8">
          <input
            type="text"
            name="site"
            value={form.site}
            onChange={handle_change}
            id="site"
            placeholder="Enter website URL"
            className="rounded-full  font-bold border-none text-white bg-neutral-500 w-full h-12 p-4 py-1 text-2xl "
          />
          <div className="flex flex-col md:flex-row w-full justify-between gap-8 ">
            <input
              // className="rounded-full border border-green-500 w-full h-12 p-4 py-1"
               className="rounded-full  font-bold border-none text-white bg-neutral-500 w-full h-12 p-4 py-1 text-2xl "
              name="username"
              onChange={handle_change}
              value={form.username}
              placeholder="Enter Username"
              type="text"
              id=" username "
            />

            <div className="relative">
              <input
                ref={passwordRef}
                className="rounded-full  w-full h-12 p-4 py-4 font-bold border-none text-2xl text-white bg-neutral-500 "
                //  className="rounded-full  font-bold border-none text-white bg-neutral-500 w-full h-12 p-4 py-1 text-2xl "
                onChange={handle_change}
                name="passwords"
                value={form.passwords}
                placeholder="Enter password"
                type="password"
                id="password"
              />
              <span className="absolute right-[3px] top-[4px] text-black cursor-pointer">
                <img
                  className="p-1"
                  ref={iconRef}
                  width={28}
                  onClick={showThePass}
                  src="icons/eye3.png"
                  alt="eye"
                />
              </span>
            </div>
          </div>
          <button
            onClick={save_password}
            className="flex justify-center items-center gap-2 bg-lime-500 hover:bg-lime-700 rounded-xl  h-20 px-7 text-xl font-bold py-2 w-52 "
          >
            Save Password
          </button>
        </div>
        {/* ---------------table-------------------- */}
        <div className="passwords">
          <h2 className="font-bold text-2xl py-4  text-white ">Your passowrd  </h2>
          {passwordArray.length == 0 && <div> No password to show </div>}
          {passwordArray.length != 0 && (
            <table className="table-auto w-full rounded-md overflow-hidden ">
              <thead className="bg-green-800 text-white">
                <tr>
                  <th className="py-2">Site Name</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Action</th>
                </tr>
              </thead>
              <tbody className="bg-green-100">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="  py-3 border border-white  text-center">
                        <div className="flex items-center justify-center ">


                          <a href={item.site} target="_blank" >
                          {item.site}

                          </a>








                          
                          <div
                            className="size-7 cursor-pointer "
                            onClick={() => {
                              copyToClipboard(item.site);
                            }}
                          >
                            <img
                              src="/public/icons/copy.png"
                              className="w-6 h-6 pt-1 px-0.5 "
                              alt=""
                            />
                          </div>{" "}
                        </div>{" "}
                      </td>

                      <td className="  py-2 border border-white  text-center   ">
                        <div className="flex items-center justify-center ">
                          {item.username}
                          <div
                            className="size-7 cursor-pointer "
                            onClick={() => {
                              copyToClipboard(item.username);
                            }}
                          >
                            <img
                              src="/public/icons/copy.png"
                              className="w-6 h-6 pt-1 px-0.5 "
                              alt=""
                            />
                          </div>{" "}
                        </div>{" "}
                      </td>

                      <td className="  py-2 border border-white   text-center">
                        <div className="flex items-center justify-center ">
                          {item.passwords}
                          <div
                            className="size-7 cursor-pointer "
                            onClick={() => {
                              copyToClipboard(item.passwords);
                            }}
                          >
                            <img
                              src="/public/icons/copy.png"
                              className="w-6 h-6 pt-1 px-0.5 "
                              alt=""
                            />
                          </div>{" "}
                        </div>{" "}
                      </td>

                      <td className=" flex py-2 border border-white text-center justify-center ">
                        <span  className="cursor-pointer" onClick={() => {
                          edit_password(item.id)}} >
                          <img src="/public/icons/edit2.png" className="w-9 h-9 mx-2  " alt="" />

                        </span> 
                         <span className="cursor-pointer"  onClick={() => {
                          delete_password(item.id)}} >
                          <img src="/public/icons/delete2.png" className="w-7 h-7 mx-1 " alt="" />

                        </span> 
                        
                      </td>


                    </tr>
                  );  
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
