import React, {  useContext, useState } from 'react'
import './LoginPopup.css'
import { StoreContext } from '../../context/StoreContext';
import axios from "axios"


const LoginPopup = ({setShowLogin}) => {

    const {url,setToken} = useContext(StoreContext)

    const [currState,setCurrState] = useState("Login");
    const [data,setData] = useState({
        name:"",
        email:"",
        password:""
    })

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setData(data=>({...data,[name]:value}))
    }

    const onLogin = async (event) => {
        event.preventDefault()
        let newUrl = url;
        if (currState==="Login") {
            newUrl += "/api/user/login"
        }
        else {
            newUrl += "/api/user/register"
        }

        const response = await axios.post(newUrl,data);

        
    
        if (response.data.success) {
            setToken(response.data.token);
            localStorage.setItem("token",response.data.token);
            setShowLogin(false)
        }
        else {
            alert(response.data.message)
        }

    }
  return (
    <div className='login-popup'>
        <form onSubmit={onLogin} className='login-popup-container'>
            <div className="login-popup-title">
                <h2>{currState}</h2>
                <span onClick={()=>setShowLogin(false)}>✖</span>
            </div>
            <div className="login-popup-inputs">
                {currState==="Login"?<></>:  <input type="text" name='name' onChange={onChangeHandler} value={data.name} placeholder='Your name' required />}
                <input type="email" name='email' onChange={onChangeHandler} value={data.email} placeholder='Your email' required />
                <input type="password" name='password' onChange={onChangeHandler} value={data.password} placeholder='Your password' required />
            </div>
            <button type='submit' >{currState==="Sign Up"? "Create account":"Login"}</button>
            {currState==="Login"
            ?<p>Create a new account? <span onClick={()=>setCurrState("Sign Up")}>Click here</span></p>
            :<p>Already have an account? <span onClick={()=>setCurrState("Login")}>Login</span></p>}
            
        </form>
    </div>
  )
}

export default LoginPopup
