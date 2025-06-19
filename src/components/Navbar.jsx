import React from 'react';
import {assets} from '../assets/assets'; // Adjust the path as necessary

const Navbar = () => {
  return (
   <div>
     <Link to ='/'>
    <img src={assets.logo} alt="" className='w-28 sm:w-32 lg:w-40' />
     </Link>
     <div>
      <div>
        <button>
          <img src={assets.credit_star} alt="" />
          <p>Credits Left: 5</p>
        </button>
        <p> Hi, Roshan</p>
        <div>
          <ig src={assets.profile_icon} className ='w-10 drop-shadow' alt=""/>
        </div>
      </div>
     </div>
   </div>
  );
};

export default Navbar;