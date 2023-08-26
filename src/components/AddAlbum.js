import React from 'react'
import { Link } from "react-router-dom";
import Navbar from './Navbar';

// This file is used for showing add album component
const AddAlbum = (props) => {
  // First get the album data 
  const getAlbumFormData = () => {
    const userId = document.getElementById('UserIDInput').value;
    const title = document.getElementById('TitleInput').value;
    props.addAlbumToList(Number(userId), title)
  }

  return (
    <>
      {/* Navbar code to display on Page */}
      <Navbar path="/" btnName="HomePage" />
      <div className='AddAlbumContainer'>
        <div className='AddAlbumForm'>
          <h1>Add Album!</h1>
          <h3>Please Enter the Details for new Album</h3>
          <div className='inp-container-add-album'>
            <input id='UserIDInput' type="text" placeholder='User ID' />
          </div>
          <div className='inp-container-add-album'>
            <input id='TitleInput' type="text" placeholder='Album Name'/>
          </div>
          <div>
            <Link to="/"><button onClick={getAlbumFormData}>Add To List</button></Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddAlbum
