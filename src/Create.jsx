import React, { useEffect, useState } from "react";
import { UseCreatoperation } from "./Creatoperation";
function Create() {
  const context = UseCreatoperation();
  const [emailplaceholdercolour, setemailplaceholdercolour] = useState("black");
  const [emailplaceholder, setemailplaceholder] = useState("Enter email");
  const [passwordplaceholder, setpasswordplaceholder] =
    useState("Enter password");
  const [show, setshow] = useState(false);
  const [passwordtype, setpasswordtype] = useState("password");
  const [showhidetext, setshowhidetext] = useState("Show");

  // const [email, setemail] = useState('');
  // const [password, setpassword] = useState('');
  //     useEffect(() => {
  //         if (email!=='') {

  //             console.log(email);
  //         };
  // }, [email])

  const toggle = (e) => {
    e.preventDefault();
    context.setview((prev) => {
      return !prev;
    });
  };

  const setplaceholder = () => {
    console.log("running");
    if (context.email === "") {
      setemailplaceholder("Please Enter Email");
    }
    if (context.password === "") {
      setpasswordplaceholder("Please Enter password");
    }
  };

  function generateRandomId() {
    return Math.floor(Math.random() * 1000000); // Generates a random number between 0 and 999999
  }
  const add = () => {
    // context.setemail(tempemail);
    // context.setpassword(temppassword);
    // console.log("runn");
    const objectfordata = {
      id: generateRandomId(),
      email: context.email,
      password: context.password,
    };
    const prevdata = JSON.parse(localStorage.getItem("storagedata"))||[]

    context.setdata(() => {
      return [...prevdata, objectfordata];
    });
    // console.log("set to empty");
    context.setemail("");
        context.setpassword("");
  };
  const showpasswordfunc = (e) => {
    e.preventDefault();
    setshow((prev) => {
      return !prev;
    });
  };

  useEffect(() => {
    // console.log("show is =",show);
    if (show === true) {
      setpasswordtype("text");
      setshowhidetext("Hide");
    } else {
      setpasswordtype("password");
      setshowhidetext("Show");
    }
  }, [show]);

  useEffect(() => {
    // console.log(context.view);
  }, [context.view]);

  const submited = (e) => {
    e.preventDefault();

    // if (tempemail !== "") {
    // if (context.email) {
      if (context.email&&context.password !=="") {
        console.log("running add");
        add();
      }
    // } 
    if(context.email || context.password === "") {
      console.log("running placeholder");
      setplaceholder();
    }
  };

//   console.log("here is the data from create");
  return (
    <>
      <form onSubmit={submited}>
        <div className="ml-6 mt-5">
          <h1 className="text-base">Email address</h1>
          <input
            type="text"
            // value={tempemail}
            value={context.email}
            placeholder={emailplaceholder}
            className="w-96  h-9 bg-slate-100 border-2 border-black rounded-md pl-3"
            onChange={(e) => {
            //   settempemail(e.target.value);
              context.setemail(e.target.value);
            }}
          />
          {/* <h6 className='text-red-600 text-xm'>Please Enter Email</h6> */}
          <h1 className="text-base">Password</h1>
          <input
            type={passwordtype}
            // value={temppassword}
            value={context.password}
            placeholder={passwordplaceholder}
            className="w-96  h-9 bg-slate-100 border-2 border-black rounded-md pl-3 "
            onChange={(e) => {
            //   settemppassword(e.target.value);
              context.setpassword(e.target.value);
            }}
          />
          <button
            className="w-20  h-8 bg-blue-700  rounded-md text-white mt-4 hover:bg-blue-500"
            onClick={showpasswordfunc}
          >
            {showhidetext}
          </button>
          {/* <h6 className='text-red-600 text-xm'>Please Enter Password</h6> */}
          <br></br>
          <button
            type="submit"
            className="w-24  h-8 bg-blue-700  rounded-md text-white mt-4 hover:bg-blue-500"
          >
            Add
          </button>
          <button
            className="ml-5 w-24  h-8 bg-blue-700  rounded-md text-white mt-4 hover:bg-blue-500"
            onClick={toggle}
          >
            View
          </button>
        </div>
      </form>
    </>
  );
}

export default Create;
