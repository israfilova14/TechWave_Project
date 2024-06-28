import React from 'react'
import password from '../../assest/banner/password.png'

const ForgotPassword = () => {
  return (
    <div>
      <div className='mt-10'>
         <h2 className='text-center mb-2 text-2xl'>Password Manager</h2>
         <div className='border border-b border-slate-300'></div>
      </div>
      <div className='mt-7 text-center'>
        <p className='text-slate-600'>See, change, or remove passwords you  saved in your Google Account. <a className='text-blue-500'>Learn more</a></p>
      </div>
      <div className='flex items-center mt-9 border border-slate-300 w-[700px] h-[280px] mx-auto p-6 rounded gap-3'>
         <div>
            <h2>Password Checkup</h2>
            <p className='text-slate-500'>Check your svaed passwords to strengthen your security</p>
         </div>
         <div>
             <img src={password}/>
         </div>
      </div>
    </div>
  )
}

export default ForgotPassword