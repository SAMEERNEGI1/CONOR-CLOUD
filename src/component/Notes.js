import React, { useEffect, useRef, useState } from 'react'
import NoteContext from '../context/notes/NoteContext'
import { useContext } from 'react'
import Noteitem from './Noteitem'
import { AddNote } from './AddNote'
import { useNavigate } from 'react-router-dom'

const Notes = (props) => {
  const context = useContext(NoteContext)
  let navigate = useNavigate('/login')
  const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })

  const { notes, getNote, editNote } = context
  

  useEffect(() => {
    if (localStorage.getItem('token')) {
      getNote()
      
    }
    else {
      navigate('/login')
    }
    
    

  }, [navigate])

  const ref = useRef(null)
  const refClose = useRef(null)

  const updateNote = (currentNote) => {
    ref.current.click()
    setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })

  }

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }

  const handleClick = (e) => {
    // Update the note
    editNote(note.id, note.etitle, note.edescription, note.etag)
    refClose.current.click()
    props.showAlert("Notes updated successfully", "success")
  }

  return (
    <>
      <AddNote showAlert={props.showAlert} />
      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} onChange={onChange} minLength={5} required placeholder='Write your note title here..' />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <input type="text" className="form-control" onChange={onChange} id="edescription" name="edescription" value={note.edescription} minLength={5} required placeholder='Write your note description here..' />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">Tag</label>
                  <input type="text" className="form-control" value={note.etag} onChange={onChange} id="etag" name="etag" placeholder='name a tag for your notes' />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={note.etitle.length < 5 || note.edescription.length < 5} type="button" className="btn btn-primary" onClick={handleClick}>Update note</button>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-3">
        <h2>Your notes</h2>

        <div className="container mx-1">
          {notes.length === 0 && (

            <p style={{
              color: '#888',
              fontSize: '1.2rem',
              textAlign: 'center',
              marginTop: '20px',
              fontStyle: 'italic'
            }}>
              <i className="fas fa-info-circle" style={{ marginRight: '5px', color: '#888' }}></i>
              No notes available right now
            </p>
          )}
        </div>

        {Array.isArray(notes) && notes.map((note) => {
  return <Noteitem key={note._id} updateNote={updateNote} note={note} showAlert={props.showAlert} />;
})}

      </div>
    </>
  )
}

export default Notes;
