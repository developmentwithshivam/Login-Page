import React, { useEffect, useState } from "react";
import { UseCreatoperation } from "./Creatoperation";

function Read() {
  const [editid, seteditid] = useState(null);
  const [edit, setedit] = useState(false);
  const context = UseCreatoperation();
  const [getdata, setgetdata] = useState([]);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
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
    if (id === editid) {
      updatefunc(id);
      seteditid(null);
    } else {
      seteditid(id);
    }
  };

  const changeobjemail=(id)=>{
    setgetdata((prev) => {
      return prev.map((obj) => {
        if (obj.id === id) {
          if (email) {
            return { ...obj, email: email };
          } else {
            return { ...obj, email: obj.email };
          }
        } else {
          return obj;
        }
      });
      
    }
  );

    localStorage.setItem("storagedata", JSON.stringify(getdata));
  }
  const changeobjpassword=(id)=>{
    setgetdata((prev) => {
      return prev.map((obj) => {
        // console.log("ID are :", obj.id, id);
        if (obj.id === id) {
          if (password) {
            return { ...obj, password: password };
          } else {
            return { ...obj, password: obj.password };
          }
        } else {
          return obj;
        }
      });
      
    }
  );

    localStorage.setItem("storagedata", JSON.stringify(getdata));
  }
  const updatefunc = (id) => {
  changeobjemail(id);
  changeobjpassword(id);
  setemail("")
  setpassword("")
  };

  return (
    <>
      <table>
        
          <div className="mt-3 ml-16 text-4xl">Read</div>
          <div className="mt-4">
            <tr>
              <th className=" border border-black w-96 text-center">ID</th>
              <th className=" border border-black w-96 text-center">Email</th>
              <th className=" border border-black w-96 text-center">Password</th>
            </tr>
          </div>
        
        <tbody>
          <tr>
            {getdata?.length === 0 ? (
              <td
                className="font-medium text-3xl"
                style={{ position: "absolute", left: "400px" }}
              >
                Empty
              </td>
            ) : (
              <>
                {getdata?.map((obj) => {
                  return (
                    <tr key={obj.id}>
                      <td className=" border border-black w-96 text-center">
                        {obj.id}
                      </td>
                      {editid === obj.id ? (
                        <td >
                          <input className="focus:outline-none w-96 text-center"
                            type="text"
                            value={email || obj?.email}
                            onChange={(e) => {
                              const newemail = e.target.value;

                              if (newemail) {
                                setemail(newemail);
                              }
                            }}
                          ></input>
                        </td>
                      ) : (
                        <td className=" border border-black w-96 text-center">
                          {obj.email}
                        </td>
                      )}

                      {editid=== obj.id?
                      <td className=" border border-black w-96 text-center ">
                      <input
                        type="text"
                        value={password || obj?.password}
                        onChange={(e) => {
                          const newpassword = e.target.value;

                          if (newpassword) {
                            setpassword(newpassword);
                          }
                        }}
                      ></input>
                    </td>:
                      <td className=" border border-black w-96 text-center">
                        {obj.password}
                      </td>}
                      
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
                          onClick={() => {
                            toggleedit(obj.id);
                          }}
                        >
                          {editid === obj.id ? "Save" : "Edit"}
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
