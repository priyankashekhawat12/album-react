import React from 'react'
import { Link } from "react-router-dom";
import Navbar from './Navbar';

const UpdateAlbum = (props) => {
  
  const getUpdateData = () => {
    const id = props.album.id;
    let updateTitle = document.getElementById('title-inp').value;
    let updateUserid = document.getElementById('userid-inp').value;

    if (updateTitle === '') {
      updateTitle = props.album.title;
    }
    if (updateUserid === '') {
      updateUserid = props.album.userId;
    }
    props.updateAlbumInList(id, updateTitle, Number(updateUserid), props.album);
  }

  return (
    <>
      <Navbar path="/" page="Home" btnName='Home Page'/>
      <div className='update-album'>
        <div className='form-container'>
          <h4 id='album-title'>Current Album title is :<h3 className='current_states'> {props.album.title}</h3></h4>
          <div className='inp-container'>
            <input type="text" id='title-inp' placeholder='Enter New Title'></input>
          </div>

          <h4 id='album-title'>Current User ID is: <h3 className='current_states'>{props.album.userId}</h3></h4>
          <div className='inp-container'>
          
            <input type="number" id='userid-inp' placeholder='Enter updated user ID'></input>
          </div>

          <Link to='/'><button type='submit' onClick={getUpdateData}>Save</button></Link>
        </div>
      </div>
    </>
  )
}

export default UpdateAlbum;
