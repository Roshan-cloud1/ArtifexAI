import React from 'react';
import {assets} from '../assets/assets';
import {delay,motion} from "motion/react";
import { useNavigate } from 'react-router-dom';     
const Header = () => {

  
  const navigate = useNavigate();

  const onClickHandler= () => {
    if(user){
      navigate('/result')
    }else{
      setShowLogin(true);
    }
  }

  return (
    <motion.div className='flex flex-col items-center justify-center text-center my-20'
      initial={{ opacity:0.2, y:100 }}
      transition={{duration:1}}
      whileInView={{ opacity:1, y:0}}
      viewport={{ once: true }}
      >
      <motion.div className='text-stone-500 inline-flex text-center gap-2 bg-white px-6 py-1 rounded-full border hover:scale-105 border-neutral-500 transition-all duration-700'
      initial={{ opacity:0, y:-20 }}
      animate={{ opacity:1, y:0 }}
      viewport={{delay:0.2,duration:0.8}}
      >
        <p>Best Transform Words into Art</p>
        <img src={assets.star_icon} alt=''/>
        </motion.div>
<motion.h1
  className="text-4xl sm:text-6xl max-w-[320px] sm:max-w-[650px] mx-auto mt-10 text-center leading-tight"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 0.4, duration: 2 }}
>
  <span className="text-gray-800 font-medium">Say it.</span>{' '}
  <span className="text-gray-800 font-medium">See it.</span>{' '}
  <span className="text-gray-800 font-medium">Create it</span>{' '}
  <span className="text-gray-500">— all with</span>{' '}
  <span className="text-red-600 font-bold">ArtifexAI</span>.
</motion.h1>

<motion.p className='text-center max-w-xl mx-auto mt-5'
initial={{opacity:0, y:20}}
animate={{opacity:1, y:0}}
transition={{delay:0.6, duration:0.8}}

>Unleash boudless creativity with AI - Turn your thoughts into stunning visual art instantly. Just type, and watch the magic unfold</motion.p>

<motion.button   className='sm:text-lg text-white bg-pink-700 w-auto mt-8 px-12 py-2.5 flex items-center gap-2 rounded-full'
whileHover={{ scale: 1.05 }}
whileTap={{ scale: 0.95 }}
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
transition={{default: { duration: 0.5 }, opacity: { delay: 0.8, duration:1 }}}
>Generate Image
  <img src={assets.star_group} alt="" className='h-6' />
</motion.button>

<motion.div className="flex flex-wrap justify-center mt-16 gap-3">
  {Array(3).fill('').map((_, index) => (
    <motion.img
      key={index}
      whileHover={{ scale: 1.05 }}
      className="rounded transition-all duration-300 cursor-pointer max-sm:w-10"
      src={assets[`sample_img_${(index % 3) + 1}`]}
      alt={`sample-${index + 1}`}
      width={70}
    />
  ))}
</motion.div>

<motion.p 
initial={{opacity:0}}
animate={{opacity:1}}
transition={{delay:1.2, duration:0.8}}
className='mt-2 text-neutal-600'>
 Generated Images from ArtifexAI
</motion.p>

    </motion.div>
  );
};

export default Header;