import React, { useEffect, useState } from "react";
import { UseCreatoperation } from "./Creatoperation";

function Read() {
  const [edit, setedit] = useState(false);
  const context = UseCreatoperation();
  const [getdata, setgetdata] = useState([]);
  const [email, setemail] = useState("");
  const myarr = context.data;


  const deletefunc = (id) => {
    const myfiltereddata = getdata.filter((obj) => obj.id !== id);
    setgetdata(myfiltereddata);
    localStorage.setItem("storagedata", JSON.stringify(myfiltereddata));
  };

  useEffect(() => {
    if (myarr.length > 0) {
      localStorage.setItem("storagedata", JSON.stringify(myarr));
    }
    if (myarr) {
      setgetdata(JSON.parse(localStorage.getItem("storagedata")) || []);
    }
  }, [myarr]);

  const toggleedit = (id) => {
    console.log(getdata);
    getdata.forEach((obj) => {
      // obj.id===id?setedit((prev)=>!prev):setedit((prev)=>prev)
      if (obj.id === id) {
        setedit((prev) => !prev);
      } else {
        setedit((prev) => prev);
      }
    });
  };
  useEffect(() => {
    console.log(email);
  }, [email])
  

  const updatefunc = (id,newemail) => {
    // const newemail = e.target.value;
    setgetdata((prev)=>{
      prev.map((obj)=>{
        if(obj.id===id){
          return {...obj,email:newemail}
        }
        else{return obj}
      })
    })
  if(getdata){

    localStorage.setItem("storagedata", JSON.stringify(getdata));  
  }
    // toggleedit(id);

    // console.log("working edit");
    //   const fetcheddata = JSON.parse(localStorage.getItem("storagedata")||[])
    //   fetcheddata.map((obj)=>obj.id===id?{...obj,email:"shivamdixiteditable"}:obj)

    // fetcheddata.map((obj)=>obj.id===id?console.log("ID matched ==",id):console.log("nothing"))
  };

  // useEffect(() => {

  // }, [getdata])

  // console.log("here is the data from localStorage",getdata);
  // function generateRandomId() {
  //   return Math.floor(Math.random() * 1000000); // Generates a random number between 0 and 999999
  // }

  return (
    <>
      <table>
        <theader>
          <div className="mt-3 ml-16 text-4xl">Read</div>
          <div className="mt-4">
            <tr>
              <th className=" border border-black w-96 text-center">ID</th>
              <th className=" border border-black w-96 text-center">Email</th>
              <th className=" border border-black w-96 text-center">
                Password
              </th>
            </tr>
          </div>
        </theader>
        <tbody>
          <tr>
            {getdata?.length === 0 ? (
              <th
                className="font-medium text-3xl"
                style={{ position: "absolute", left: "400px" }}
              >
                Empty
              </th>
            ) : (
              // console.log("nullemlskjflk")
              <>
                {getdata?.map((obj) => {
                  // const heloid= generateRandomId()
                  // let id = index + 1;
                  // console.log("This is the id=====",id);
                  return (
                    <tr key={obj.id}>
                      <td className=" border border-black w-96 text-center">
                        {obj.id}
                      </td>
                      {edit === true ? (
                        <td className=" border border-black w-96 text-center ">
                          <input
                            type="text"
                            value={email||obj?.email}
                            onChange={(e) => {
                              const newemail = e.target.value;
                              
                              setemail(newemail);
                            
                            }}
                          ></input>
                        </td>
                      ) : (
                        <td className=" border border-black w-96 text-center">
                          {obj.email}
                        </td>
                      )}

                      <td className=" border border-black w-96 text-center">
                        {obj.password}
                      </td>
                      <td>
                        <button
                          className=" w-24  h-8 bg-red-700  rounded-md text-white hover:bg-red-500 text-center"
                          onClick={() => {
                            deletefunc(obj.id);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                      <td>
                        <button
                          className=" w-24  h-8 bg-blue-700  rounded-md text-white hover:bg-blue-500 text-center"  
                          onClick={()=>{toggleedit(obj.id)}}
                        >
                          {edit === false ? "Edit" : "Save"}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </>
            )}
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default Read;
