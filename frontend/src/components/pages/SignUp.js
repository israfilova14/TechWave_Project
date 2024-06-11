import React, {useState} from 'react'
import user from "../../assest/banner/user.png"
import { FaRegEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { imageTobase64 } from '../../helpers/imageTobase64';
import SummaryApi from '../../common';
import { toast } from 'react-toastify';

const SignUp = () => {
  const [showPassword, setshowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [data, setData] = useState({
      email : "",
      password : "",
      name : "",
      confirmPassword : "",
      profilePicture : ""
  })
  const navigate = useNavigate()
  const handleChange = (e) => {
  const {name, value} = e.target
  setData((preve) => {
      return{
         ...preve,
         [name] : value
      }
  })
  }
  const handleUploadPic = async(e) => {
     const file = e.target.files[0]
     const imagePic = await imageTobase64(file) 
   
     setData((preve) => {
      return{
        ...preve,
        profilePic : imagePic
      }
     })
  }
  const handleSubmit = async(e) => {
     e.preventDefault()
     if(data.password === data.confirmPassword){
      console.log("SummaryApi.signUP.url", SummaryApi.signUP.url);
      const dataResponse = await fetch(SummaryApi.signUP.url, {
        method : SummaryApi.signUP.method,
        headers : {
          "content-type" : "application/json"
        },
        body : JSON.stringify(data)
       })
       const dataApi = await dataResponse.json()
       console.log("data", dataApi);
       if(dataApi.success){
        toast.success(dataApi.message)
        navigate("/login")
       }
       if(dataApi.error){
        toast.error(dataApi.message)
       }
     
     }else{
      toast.error("Please check password and confirm password")
      console.log("Please check password and confirm password");
     }
  }
  console.log("data login", data);
  return (
    <section id='signup'>
    <div className='mx-auto container p-4'>
     <div className='bg-white p-5 w-full max-w-md mx-auto rounded'>
         <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full'>
            <div >
              <img src={data.profilePic || user}/>
            </div>
          <form>
            <label>
              <div className='text-xs bg-slate-200 bg-opacity-80 pb-4 pt-2 p-1 text-center cursor-pointer absolute bottom-0 w-full'>
                Upload Picture
              </div>
               <input type='file' className='hidden' onChange={handleUploadPic}></input>
            </label>
          </form>
         </div>
         <form className='pt-5 flex-col' onSubmit={handleSubmit}>
         <div className='grid mb-2'>
                 <label>Name : </label>
                 <div className='bg-slate-100 p-2'>
                   <input 
                    type='text'
                    placeholder='enter your name' 
                    name='name'
                    value={data.name}
                    onChange={handleChange}
                    required
                    className='w-full h-full outline-none bg-transparent'/>
                 </div>
             </div>
             <div className='grid mb-2'>
                 <label>Email : </label>
                 <div className='bg-slate-100 p-2'>
                   <input 
                    type='email'
                    placeholder='enter email' 
                    name='email'
                    value={data.email}
                    onChange={handleChange}
                    required
                    className='w-full h-full outline-none bg-transparent'/>
                 </div>
             </div>

             <div>
                 <label>Password : </label>
                 <div className='bg-slate-100 p-2 flex  mb-2'>
                    <input 
                      type={showPassword ? "text" : "password"} 
                      placeholder='enter password'
                      value={data.password} 
                      name='password'
                      onChange={handleChange}
                      required
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
             </div>
             <div>
                 <label>Confirm Password: </label>
                 <div className='bg-slate-100 p-2 flex  mb-2'>
                    <input 
                      type={showConfirmPassword ? "text" : "password"} 
                      placeholder='enter confirm  password'
                      value={data.confirmPassword} 
                      name='confirmPassword'
                      onChange={handleChange}
                      required
                      className='w-full h-full outline-none bg-transparent'/>
                    <div className='cursor-pointer text-xl' onClick={() => setShowConfirmPassword((preve)=>!preve)}>
                      <span>
                         {
                             showConfirmPassword ? (
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
             </div>
             <button className='bg-orange-600 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6 hover:bg-orange-700'>Sign Up</button>
         </form>
         <p className='my-4'>Already have account ? <Link to={"/login"} className='text-orange-600 hover:text-orange-700 hover:underline'>Login</Link></p>
     </div>
    </div>
 </section>
  )
}

export default SignUp