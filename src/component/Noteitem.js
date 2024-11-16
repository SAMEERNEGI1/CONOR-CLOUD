import React, { useContext } from 'react'
import NoteContext from '../context/notes/NoteContext'

const Noteitem = (props) => {
  const context = useContext(NoteContext)
  const { deleteNote } = context
  const { note, updateNote } = props

  return (
    <div className='col-md-3'>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text" style={{ color: '#00008B' }}>{note.description}</p> 


          {/* Add line separation here */}
          <hr />

          <p className="card-text">#<i>{note.tag}</i></p>
          <i className="fa-sharp-duotone fa-solid fa-trash-can mx-2" onClick={() => { deleteNote(note._id); props.showAlert("Notes deleted successfully","success") }}></i>
          <i className="fa-sharp fa-solid fa-pen-to-square mx-2" onClick={() => { updateNote(note); }}></i>
        </div>
      </div>
    </div>
  )
}

export default Noteitem
