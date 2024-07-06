import { useState } from "react"
import Create from "./Create"
import Read from "./Read.jsx"
import { Creatoperation } from './Creatoperation.js'
  

function App() {
const [view, setview] = useState(false)
const [email, setemail] = useState('');
const [password, setpassword] = useState('');
const [data,setdata] = useState([]);
// console.log(data);

  return (
   <>
     <Creatoperation.Provider value={{view, setview, email, setemail , password , setpassword, data , setdata}}>
   <Create/>
   {
     view === true? <Read/> : null
     }
    </Creatoperation.Provider>
   </>
  )
}

export default App
