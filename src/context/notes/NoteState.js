
import { useState } from "react";
import NoteContext from "./NoteContext";
//CRUD OPERATIONS HERE
const NoteState = (props) => {
  const host="http://localhost:3001"
  const notesInitial = []
   
  const [notes, setNotes] = useState(notesInitial)

  //fetching all notes
  const getNote = async() => {
    //api fetching here
    const response=await fetch(`${host}/api/notes/fetchallnotes`,{
      method:'GET',
      headers:{
        'Content-Type':'application/json',
        'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjcyYWY2YWZmZTA2MTA0MWI2NzA1MTYwIn0sImlhdCI6MTczMDg2ODkxMX0.yoAdELZqstKTzP6t5VuID23YBFIX64K5zQZe3zN_KjM'
      },
    })
    const json=await response.json()
    console.log(json)

    setNotes(json)

  }




  //adding a note
  const addNote = async(title, description, tag) => {
    //api fetching here
    const response=await fetch(`${host}/api/notes/addnotes`,{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjcyYWY2YWZmZTA2MTA0MWI2NzA1MTYwIn0sImlhdCI6MTczMDg2ODkxMX0.yoAdELZqstKTzP6t5VuID23YBFIX64K5zQZe3zN_KjM'
      },
      body:JSON.stringify({title,description,tag})
    })
    //console.log("adding a new note")
    const note=await response.json()
    setNotes(notes.concat(note))

  }

  //deleting a note

  const deleteNote = async(id) => {
    console.log(id)
    if(!id)
    {
      console.log("id not found")
    }
    //api fetching here
    const response=await fetch(`${host}/api/notes/deletenotes/${id}`,{
      method:'DELETE',
      headers:{
        'Content-Type':'application/json',
        'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjcyYWY2YWZmZTA2MTA0MWI2NzA1MTYwIn0sImlhdCI6MTczMDg2ODkxMX0.yoAdELZqstKTzP6t5VuID23YBFIX64K5zQZe3zN_KjM'
      },
    })
    const json=await response.json()
    console.log(json)


    console.log("deleted" + id)
    const newNotes = notes.filter((note) => { 
      return note._id !== id 
    })
    setNotes(newNotes)
  }

  //updateing a note
  const editNote = async(id, title, description, tag) => {
    console.log(id)
    if(!id)
    {
      console.log("id not defined")
      return;
    }

    //api fetching here 
    const response=await fetch(`${host}/api/notes/updatenotes/${id}`,{
      method:'PUT',
      headers:{
        'Content-Type':'application/json',
        'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjcyYWY2YWZmZTA2MTA0MWI2NzA1MTYwIn0sImlhdCI6MTczMDg2ODkxMX0.yoAdELZqstKTzP6t5VuID23YBFIX64K5zQZe3zN_KjM'
      },
      body:JSON.stringify({title, description, tag})
    })
    const json= await response.json()
    console.log(json)

    setNotes(notes.map(note => note._id === id ? { ...note, title, description, tag } : note));

  

   
  }


return (
  <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote , getNote}}>
    {props.children}
  </NoteContext.Provider>
)
}

export default NoteState;