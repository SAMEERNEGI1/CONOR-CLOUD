import React, { useContext, useState } from 'react'
import NoteContext from '../context/notes/NoteContext'
export const AddNote = (props) => {
    const context=useContext(NoteContext)
    const {addNote}=context
    const [note,setNote]=useState({title:"", description:"",tag:""})

    const onChange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value})
    }
    const handleClick=(e)=>{
        e.preventDefault()
        addNote(note.title, note.description, note.tag)
        setNote({title:"", description:"",tag:""})
        props.showAlert("Notes added successfully","success") 

    }
  return (

    <div className="container my-3">
    <h2>Add a Note</h2>

    <form>
        <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" name="title" value={note.title} onChange={onChange} minLength={5} required  aria-describedby="emailHelp" placeholder='Write your note title here..'/>
                
        </div>
        <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input type="text" className="form-control" onChange={onChange}value={note.description} minLength={5} required id="description" name="description" placeholder='Write your note description here..'/>
        </div>
        <div className="mb-3">
            <label htmlFor="tag" className="form-label">Tag</label>
            <input type="text" className="form-control" onChange={onChange} id="tag" value={note.tag}name="tag" minLength={5} required placeholder='name a tag for your notes'/>
        </div>
        <button disabled={note.title.length<5||note.description.length<5}type="submit" className="btn btn-primary" onClick={handleClick}>Add my note</button>
    </form>
    </div>

  )
}
