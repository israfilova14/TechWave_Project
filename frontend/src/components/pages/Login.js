import React, { useContext, useState } from 'react'
import user from "../../assest/banner/user.png"
import { FaRegEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import SummaryApi from '../../common';
import { toast } from 'react-toastify';
import Context from '../../context';
const Login = () => {
    const [showPassword, setshowPassword] = useState(false)
    const [data, setData] = useState({
        email : "",
        password : ""
    })
    const navigate = useNavigate()
    const {fetchUserDetails} = useContext(Context)
    const handleChange = (e) => {
    const {name, value} = e.target
    setData((preve) => {
        return{
           ...preve,
           [name] : value
        }
    })
    }
    const handleSubmit = async(e) =>{
       e.preventDefault()
       const dataResponse = await fetch(SummaryApi.signIn.url,{
        method : SummaryApi.signIn.method,
        credentials : "include",
        headers : {
            "content-type" : "application/json"
        },
        body : JSON.stringify(data)
       })
       const dataApi = await dataResponse.json()
       if(dataApi.success){
        toast.success(dataApi.message)
        navigate('/')
        fetchUserDetails()
       }
       if(dataApi.error){
        toast.error(dataApi.error)
       }
    }
    console.log("data login", data);
  return (
    <section id='login'>
       <div className='mx-auto container p-4'>
        <div className='bg-white p-5 w-full max-w-md mx-auto rounded'>
            <div className='w-20 h-20 mx-auto'>
                <img src={user}/>
            </div>
            <form className='pt-5' onSubmit={handleSubmit}>
                <div className='grid mb-2'>
                    <label>Email : </label>
                    <div className='bg-slate-100 p-2'>
                      <input 
                       type='email'
                       placeholder='enter email' 
                       name='email'
                       value={data.email}
                       onChange={handleChange}
                       className='w-full h-full outline-none bg-transparent'/>
                    </div>
               
                </div>
                <div>
                    <label>Password : </label>
                    <div className='bg-slate-100 p-2 flex'>
                       <input 
                         type={showPassword ? "text" : "password"} 
                         placeholder='enter password'
                         value={data.password} 
                         name='password'
                         onChange={handleChange}
                         className='w-full h-full outline-none bg-transparent'/>
                       <div className='cursor-pointer text-xl' onClick={() => setshowPassword((preve)=>!preve)}>
                         <span>
                            {
                                showPassword ? (
                                    <FaEyeSlash/>
                                )
                                :
                                (
                                    <FaRegEye/> 
                                )
                            }
                         </span>
                       </div>
                    </div>
                    <Link to={'/forgot-password'} className='block w-fit ml-auto hover:underline hover:text-orange-600'>
                        Forgot password?
                    </Link>
                </div>
                <button className='bg-orange-600 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6 hover:bg-orange-700'>Login</button>
            </form>
            <p className='my-4'>Don't have account ? <Link to={"/sign-up"} className='text-orange-600 hover:text-orange-700 hover:underline'>Sign up</Link></p>
        </div>
       </div>
    </section>
  )
}

export default Login