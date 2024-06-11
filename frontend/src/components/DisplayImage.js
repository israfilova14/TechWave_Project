import React from 'react'
import { MdOutlineClose } from 'react-icons/md'

const DisplayImage = ({
    imgUrl,
    onClose
}) => {
  return (
    <div className='fixed bottom-0 top-0 right-0 left-0 flex justify-center items-center'>
        <div className='bg-white shadow-lg rounded max-w-5xl mx-auto p-3'>
            <div className='w-fit ml-auto text-2xl cursor-pointer hover:text-orange-500' onClick={onClose}>
                    <MdOutlineClose/>
            </div>
            <div className='flex justify-center p-4 max-w-[80vh] max-h-[80vh]'>
                <img src = {imgUrl} className='w-96 h-96'/>
            </div>
        </div>
    </div> 
  )
}

export default DisplayImage