import React, { useState, useEffect} from 'react';

function NoteApp(){
    const username = "exurb3r";

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [noteList, setNoteList] = useState([]);
    const [loading, setLoading] = useState(true);

    const [editingId, setEditingId] = useState(null);
    const [editTitle, setEditTitle] = useState("");
    const [editDescription, setEditDescription] = useState("");

    async function getNote(){
        try{
            setLoading(true);
            const response = await fetch(`http://localhost:3500/noteHandler/get?username=${username}`);

            if(!response.ok){
                throw new Error('Failed to fetch notes');
            }

            const data = await response.json();
            setNoteList(data.notes || []) ;

        } catch (err){
            console.error(err);
            setNoteList([]);
        } finally {
            setLoading(false);
        }
    
    }

    useEffect(() => {
        getNote();
    }, []);



    function handleTitleChange(event){
        setTitle(c => c = event.target.value);
    }

    function handleDescriptionChange(event){
        setDescription(c => c = event.target.value);
    }

    function addNotes(event){
        event.preventDefault();

        if(title === '' || description === ''){
            return console.log('Needs title and description');
        }

        const notes = {
            username,
            title,
            description
        };
        console.log(notes)

       async function sendNotes(){
            try{
                const response = await fetch('http://localhost:3500/noteHandler/post',{
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(notes)
                });

                if(!response.ok){
                    throw new Error('Failed to add note');
                }

                const updates = await response.json();
                setTitle('');
                setDescription('');

                setNoteList(updates.notes);

            } catch (err){
                console.error(err);
            }
        }
        sendNotes();
    }

    async function deleteNote(username, noteId) {
        const toDelete = {username, noteId}
        try{
            const response = await fetch('http://localhost:3500/noteHandler/delete',{
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(toDelete)
            });

            if(!response.ok){
                throw new Error('Failed to delete note');
            }

            const updates = await response.json();
            setNoteList(updates.notes);

        } catch (err){
            console.error(err);
        }
    
    }

    async function updateNote(noteId) {
        const toBeUpdated = { username, noteId, title: editTitle, description: editDescription}
        try{
            const response = await fetch('http://localhost:3500/noteHandler/put', {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(toBeUpdated)
                
                })

            if(!response.ok){
                throw new Error('Failed to delete note');
            }

            const updates = await response.json();
            setNoteList(updates.notes);
            setEditingId(null);
        } catch (err){
            console.error(err.message)
        } finally {

        }
        
    }

    return(
        <div className='noteAPP'>
            <h1 className='noteApp-title'>Notes Application</h1>
            
            <div className='note-section'>
                
                {loading ? (<p> Loading notes...</p>): 
                (<ol>
                    <li className='note-container' id='add-section'>
                        <div className="edit-notes">
                            <form onSubmit={addNotes} >
                                <h2><input type='text' placeholder='Your Title' value={title} onChange={(e) => handleTitleChange(e)}></input></h2>
                                <textarea placeholder='Description' value={description} onChange={(e) => handleDescriptionChange(e)}></textarea>

                                <button type='submit'> Add Notes</button>
                            </form>
                        </div>
                    </li>
                    {noteList.map(note => (
                        <li key={note._id} className='note-container'>
                        {editingId === note._id ? (
                            <div className="edit-notes">
                               <h2><input value={editTitle} onChange={(e) => setEditTitle(e.target.value)}/></h2>
                                <textarea value={editDescription} onChange={(e) => setEditDescription(e.target.value)}/>

                                <button onClick={() => setEditingId(null)}>Cancel</button>
                                <button onClick={() => updateNote(note._id)}>Confirm</button>
                            </div>
                        ) : (
                            <div className="show-notes">
                                <p className='date-tag'>{new Date(note.date).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true })}</p>
                                <h2>{note.title}</h2>
                                <p className='note-description'>{note.description}</p>

                                <button onClick={() => {
                                    setEditingId(note._id);
                                    setEditTitle(note.title);
                                    setEditDescription(note.description);
                                    }}>
                                    Edit
                                </button>
                                <button onClick={() => deleteNote(username, note._id) }> Delete</button>
                            </div>
                        )}
                        </li>
                    ))}

                </ol>)
                }
            </div>       
        </div>
    );
}
export default NoteApp;