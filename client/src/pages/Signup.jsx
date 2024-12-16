import React, { useState } from 'react'

function Signup() {
    // Implement sign up form here
    
    const [userdata ,setUserData] =useState({
        username:"user",
        email:"user@example.com",
        password:"password",
        phone:"1234567890",
        role:"customer"
    })
    const handleChange =(e)=>{
        const {name,value}=e.target;
        setUserData({...userdata,[name]:value});
    }
    const handleSubmit =(e)=>{
        e.preventDefault();
        const url = "http://localhost:5000/api/auth/register";
        submitData(url);
        console.log(userdata);
    }
    const submitData = async (url) => {
        const response = await fetch(url,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userdata),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Data Received : ",data);
    }
  return (
    <div>
        <h1>Sign up Page</h1>
        <form className='' onSubmit={(e)=>handleSubmit(e)} >
            <input type="text" name='username' placeholder="User Name" value={userdata.username} onChange={(e)=>handleChange(e)}  />
            <input type="text" name='email' placeholder="User Name" value={userdata.email} onChange={(e)=>handleChange(e)}  />
            <input type="text" name='phone' placeholder="User Name" value={userdata.phone} onChange={(e)=>handleChange(e)}  />
            <input type="text" name='role' placeholder="User Name" value={userdata.role} onChange={(e)=>handleChange(e)}  />
            {/* <input type="text" name='conform Password' placeholder="User Name" value={userdata.password} onChange={(e)=>handleChange(e)}  /> */}
            <input type="text" name='password' placeholder="Password" value={userdata.password} onChange={(e)=>handleChange(e)}  />
            <button type='submit' > Submit data </button>
        </form>
    </div>
  )
}

export default Signup