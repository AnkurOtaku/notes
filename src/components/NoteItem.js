import React, { useContext } from 'react'
import NoteContext from "../context/notes/NoteContext"


const NoteItem = (props) => {
    const context = useContext(NoteContext);
    const { deleteNote } = context;
    const { note, updateNote } = props;
    return (
        <div className="col-md-3">
            <div className="card">
                <div className="card-body border rounded border-dark">
                    <h5 className="card-title">{note.title}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{note.tag}</h6>
                    <p className="card-text">{note.description}</p>
                    <button onClick={() => { updateNote(note) }} type="button" className="btn btn-primary mx-2">Edit</button>
                    <button onClick={() => { deleteNote(note._id) }} type="button" className="btn btn-danger">Delete</button>
                </div>
            </div>
        </div>

    )
}

export default NoteItem