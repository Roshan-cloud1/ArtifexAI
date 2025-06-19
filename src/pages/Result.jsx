import React, { useState } from 'react';
import {assets} from '../assets/assets';
import {delay,motion} from "motion/react"


const Result = () => {

  const[image, setImage] =useState(assets.sample_img_2)
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const[loading, setLoading] = useState(false)
  const[input, setInput]=useState('')

  const onSubmitHandler =async(e)=>{
    e.preventDefault();
    setLoading(true)

    if(input){
      if(image){
        setIsImageLoaded(true)
        setImage(image)
      }
    }
    setLoading(false)
  }

  return (
    <motion.form
    initial={{opacity:0.2,y:100}}
    transition={{duration:1}}
    whileInView={{opacity:1,y:0}}
    viewport={{once:true}}
    onSubmit={onSubmitHandler} className='flex flex-col min-h-[90vh] justify-center items-center'>
    
      <div>
        <div className='relative'>
         <img src={image} alt="" className="w-64 sm:w-80 h-64 sm:h-80 object-cover rounded-md" />

          <span className={`absolute bottom-0 left-0 h-1 bg-red-500 ${loading ? 'w-full transition-all duration-[10s]':'w-0'}`}/>
        </div>
        <p className={!loading ? 'hidden':''}>Generating.....</p>
      </div>

      {!isImageLoaded &&
      <div className='flex w-full max-w-xl bg-neutral-500 text-white text-sm p-0.5 mt-10 rounded-full'>
        <input onChange={e=> setInput(e.target.value)} value={input} type='text' placeholder='Describe your idea, and AI will generate it!' className='flex-1 bg-transparent outline-none ml-8 max-m:w-20 placeholder:color ' />
        <button type='submit' className='bg-pink-700 px-10 sm:px-16 py-3 rounded-full'>Generate</button>
      </div>
      }

      {isImageLoaded &&
      <div className='flex gap-2 flex-wrap justify-center text-sm p-0.5 mt-10 rounded full'>
       <p onClick={()=>{setIsImageLoaded(false)}} className='bg-transparent border border-zinc-900 text blacck px-8 py-3 rounded-full cursor-pointer'>Generate Another</p>
       <a href={image} download className='bg-yellow-900 px-10 py-3 rounded-full cursor-pointer'>Download</a>

      </div> 
       }
    </motion.form>
  );
};

export default Result;