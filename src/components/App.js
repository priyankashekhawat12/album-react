import React, { Component } from 'react'
import { Routes, Route } from "react-router-dom";
import AddAlbum from './AddAlbum';
import AlbumsList from './albumLists';
// import Navbar from './Navbar'
import UpdateAlbum from './update';
import { toast } from "react-toastify";

 
// Import toastify css file
import 'react-toastify/dist/ReactToastify.css';


export default class App extends Component {
  constructor() {
    super();
    this.state = {
      albums: [],
      updateAlbum: {}
    }
  }

  // this function call first time when app render
  // we are getting albums data from this line 
  componentDidMount = async () => {
    const albums = await fetch('https://jsonplaceholder.typicode.com/albums')
      .then((response) => response.json())
      .then((json) => json);
    this.setState({
      albums
    })
  }

  // Take ID as params 
  deleteAlbumFromList = (id) => {
    fetch(`https://jsonplaceholder.typicode.com/albums/${id}`, { method: 'DELETE', })
    const newAlbums = this.state.albums.filter((album) => album.id !== id);
    toast('Album Deleted');
    this.setState({
      albums: newAlbums,
    })
  }

  setUpdateAlbum = async (album) => {
    this.setState({
      updateAlbum: album
    })
  }

  // this function is used to update album in the list 
  updateAlbumInList = async (id, updateTitle, updateUserid, oldAlbumTitle) => {
    const albums = this.state.albums;
    const index = albums.indexOf(oldAlbumTitle);
    let updatedAlbum = [];
    if (id < 100) {
      updatedAlbum = await fetch(`https://jsonplaceholder.typicode.com/albums/${id}`, {
        // put method is used for adding updated album in the list  
        method: 'PUT',
        body: JSON.stringify({
          userId: updateUserid,
          id: id,
          title: updateTitle,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }).then((response) => response.json()).then((json) => json);
    } else {
      updatedAlbum = {
        userId: updateUserid,
        id: id,
        title: updateTitle
      }
    }
    albums[index] = updatedAlbum;
    this.setState({
      albums: albums
    })
    toast("Album is updated")
  }
  //--------------------------------------------------------------------------------------------------------

  //add album function--------------------------------------------------------------------------------------
  //this function take userid and title from input and then added to the bottom of the albums list
  addAlbumToList = (userId, title) => {
    fetch('https://jsonplaceholder.typicode.com/albums', {
      // POST method to add album in the list 
      method: 'POST',
      body: JSON.stringify({
        userId: userId,
        id: this.state.count,
        title: title,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }).then((response) => response.json()).then((json) => json);
    const length = this.state.albums.length;
    const lastId = this.state.albums[length - 1].id;
    const album = {
      userId: userId,
      id: lastId + 1,
      title: title,
    }
    this.setState({
      albums: [...this.state.albums, album]
    })
    toast("New Album added successfully in the bottom");
  }
  //--------------------------------------------------------------------------------------------------------


  render() {
    return (
      <>
        <Routes>
          <Route path='/' element={<AlbumsList albums={this.state.albums} setUpdateAlbum={this.setUpdateAlbum} deleteAlbumFromList={this.deleteAlbumFromList} />}></Route>
          <Route path='/add-album' element={<AddAlbum addAlbumToList={this.addAlbumToList} />}></Route>
          <Route path='/update-album' element={<UpdateAlbum album={this.state.updateAlbum} updateAlbumInList={this.updateAlbumInList} />}></Route>
        </Routes>
      </>
    )
  }
}
