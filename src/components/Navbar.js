import React from 'react';
import { Link } from 'react-router-dom'

//get button name and path for evaery component
const Navbar = (props) => {

  return (
    <div className='navbar'>
      <h2>
        <span className='logo'>Album List</span>
      </h2>
      <Link to={props.path}><button>{props.btnName}</button></Link>
    </div>
  )
}

// Props.btnName will change the button text based on pages selected
// path will make sure 
export default Navbar
