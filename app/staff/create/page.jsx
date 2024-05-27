"use client"

import { useState,useEffect } from "react";
export default function Insert() {
  const [StaffID, setStaffID] = useState('');
    const [fullname, setFullname] = useState('');
    const [Birthday, setBirthday] = useState('');
    const [Gender, setGender] = useState(1); 
    const [message,setMessage]=useState('');
    const [errorMessage,setErrorMessage]=useState('');
    const handleSubmit =async (e)=>{
        e.preventDefault()  
        const Staff={
            StaffID,fullname,Birthday,Gender
        }

        const res =await fetch("http://localhost:8080/create",{
            method:"POST",
            headers:{'Content-type': 'application/json',
            'Accept': 'application/json',
      },
            body:JSON.stringify(Staff)
        })
        if(res.status==200){
            const data = await res.json();
            setMessage(data.message);
            setErrorMessage('');
            
        }else{
            const data = await res.json();
            setMessage('');
            setErrorMessage(data.message)
            console.log(data.message);
        }
    }
    return (
      <main className="flex min-h-screen flex-col items-center py-10">
        { message && (
         <a className="w-full text-left ms-10 text-blue-500 mb-15" href="/">back to home page</a>
        )}
        <h1 className="text-3xl font-bold mb-6">Insert New Staff Information</h1>
        <form className="w-full max-w-lg mt-3" onSubmit={handleSubmit}>
       
       {message && (
       
           <div className="mt-4 p-2 bg-green-200 text-gray-700 rounded mb-3">
                {message}
            </div>
           )}
      {errorMessage && (
               <div className="mt-4 p-2 bg-red-200 text-gray-700 rounded mb-3">
                   {errorMessage}
               </div>
           )}
       <div className="flex flex-wrap -mx-3 mb-6">
       
         <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
           <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="StaffID">
             Staff ID
           </label>
           <input
             className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
             id="StaffID"
             type="text"
             placeholder="Staff ID"
             value={StaffID}
             min='8'
             max='8'
             onChange={(e) => setStaffID(e.target.value)}
           />
         </div>
         <div className="w-full md:w-1/2 px-3">
           <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="fullname">
             Full Name
           </label>
           <input
             className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
             id="fullname"
             type="text"
             placeholder="Full Name"
             value={fullname}
             onChange={(e) => setFullname(e.target.value)}
           />
         </div>
       </div>
      
       <div className="flex flex-wrap -mx-3 mb-6">
     
         <div className="w-full md:w-1/2 px-3">
           <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="Birthday">
             Birthday
           </label>
           <input
             className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
             id="Birthday"
             type="date"
             value={Birthday}
             onChange={(e) => setBirthday(e.target.value)}
           />
         </div>
      
         <div className="w-full md:w-1/2 px-3">
           <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="Gender">
             Gender
           </label>
           <div className="relative">
             <select
               className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
               id="Gender"
               value={Gender}
               onChange={(e) => setGender(e.target.value)}
             >
               <option value="1">Male</option>
               <option value="2">Female</option>
             </select>
           </div>
         </div>
       </div>
       <div className="flex items-center justify-between">
         <button
           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
           type="submit"
         >
           Insert
         </button>
       </div>
     </form>
    </main>
    );
  }
  