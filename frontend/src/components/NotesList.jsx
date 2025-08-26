import { useEffect, useState } from "react";

function NotesList() {
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/notes/")
        .then(res => res.json())
        .then(data => setNotes(data));
    },  []);

    return (
        <ul>
            {notes.map(note => (
                <li key={note.id}>{ note.title } - { note.content }</li>
            ))}
        </ul>
    );
}
export default NotesList;