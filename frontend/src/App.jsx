import { useEffect } from 'react'
import './App.css'
import { useState } from 'react'

function App() {


  const [recentNotes, setRecentNotes] = useState([])
  const [note, setNote] = useState("")
  const [title, setTitle] = useState("")
  const [idNoteEditing, setIdNoteEditing] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState([])

  // function to load all the notes from the back  --------------------
  useEffect( () => {
    async function getNotes() {
      try {
        const result = await fetch(`${import.meta.env.VITE_API_URL}/notas`)
        const data = await result.json()
        setRecentNotes(data)
      } catch (error) {
        console.log(error)
      }
    };
    getNotes()
  },[])
  // --------------------------------------------------------------------

  // Function to send a note to MongoDB. Post ---------------------------
  async function handleSubmit(){
    setTitle("")
    setNote("")
    try {
      const result = await fetch (`${import.meta.env.VITE_API_URL}/notas`, {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({title: title, nota: note })
      })
      if(result.ok){
        refresh()
      }
    } catch (error) {
      console.log(error)
    }
  }
  // ---------------------------------------------------------------------

  // Function to send changed using Edit ---------------------------------
  async function handleSubmitChanges(){
    try {
      const result = await fetch (`${import.meta.env.VITE_API_URL}/notas`, {
        method:"PUT",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({title:title,nota:note, id:idNoteEditing})
      })
      setTitle("")
      setNote("")
      setIdNoteEditing(null)
      if(result.ok){
        refresh()
      }
    } catch (error) {
      console.log(error)
    }   
  }
  // ----------------------------------------------------------------------

  // Function to erase notes, DELETE method -------------------------------
  async function handleErase (event) {
    console.log(event.target.value)
    const idNote = event.target.value
    try {
      const result = await fetch (`${import.meta.env.VITE_API_URL}/notas`, {
        method: "DELETE",
        headers : {"Content-Type": "application/json"},
        body : JSON.stringify({id:idNote})
      })
      if(result.ok){
        refresh()
      }
    } catch (error) {
      console.log(error)
    }
  }
  // -----------------------------------------------------------------------

  // Function to edit a note, gets id, and sets the current note in the field to edit 
  async function handleEdit(event) {
    const idNote = event.target.value
    const noteToEdit = recentNotes.find((item) => item._id === idNote)
    if(noteToEdit){
      setNote(noteToEdit.nota)
      setTitle(noteToEdit.title)
      setIdNoteEditing(idNote)
      }
    }
  // ------------------------------------------------------------------------

  // ------------------------------------------------------------------------
  async function searchNotes() {
    console.log(searchResults)
    try {
      const result = await fetch (`${import.meta.env.VITE_API_URL}/notas/findOne`, {
        method : "POST",
        headers : {"Content-Type":"application/json"},
        body : JSON.stringify({term:searchTerm})
      })
      const data = await result.json()
      if(data.Code == 201){
        const data = {
          nota: "Not a match found"
        }
        return setSearchResults([data])
      }
      setSearchResults([data.Result])
      setSearchTerm("")
    } catch (error) {
      console.log(error)
    }
  }
  // ------------------------------------------------------------------------

  // Function to refresh ----------------------------------------------------
  async function refresh() {
    try {
      const result = await fetch(`${import.meta.env.VITE_API_URL}/notas`)
      const data = await result.json()
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  };
  // ------------------------------------------------------------------------

  function handleNote(event){
    setNote(event.target.value)
  }
  function handleTitle(event){
    setTitle(event.target.value)
  }
  function handleSearch(event){
    setSearchTerm(event.target.value)
    if(event.target.value == ""){
      setSearchResults([]);
    }
  }
  
  return (
    <>
      <div>
        <h1 className='text-5xl p-3 font-bold text-center hover:scale-110 duration-200'>Notes App</h1>
      </div>

      <div id='showNotes'>
        {recentNotes && <div>
          {recentNotes.map((item,index)=>(
            <div className='bg-blue-200 p-2' key={index}>
              <p className='text-2xl font-bold'>{item.title}</p>
              <p>{item.nota}</p>
              <button className='bg-gray-300 p-2 rounded-2xl font-bold hover:scale-110 duration-200' onClick={handleErase} value={item._id}>Erase</button>
              <button className='bg-gray-300 p-2 rounded-2xl font-bold hover:scale-110 duration-200 m-2' onClick={handleEdit}  value={item._id}>Edit</button>
            </div>
          ))}          
          </div>}
      </div>

      <div className='bg-green-200 p-5 flex flex-col' id='enterNotes'>
        <input value={title} onChange={handleTitle} type="text" placeholder='Enter a title' />
        <label for="message" className=" block text-sm font-medium text-heading">Your Note..</label>
        
        {!idNoteEditing&&<textarea value={note} onChange={handleNote} id="message" rows="4" class="m-5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand w-[90%] h-fit p-3.5 shadow-xs placeholder:text-body" placeholder="Write your thoughts here..."></textarea>}
        {idNoteEditing&&<textarea  value={note} onChange={handleNote} id="message" rows="4" class="m-5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand w-[90%] h-fit p-3.5 shadow-xs placeholder:text-body">{note}</textarea>}
        
        {!idNoteEditing&&<button className='bg-gray-300 p-2 rounded-2xl font-bold hover:scale-102 duration-200' onClick={handleSubmit}>Submit</button>}
        {idNoteEditing&&<button className='bg-gray-300 p-2 rounded-2xl font-bold hover:scale-102 duration-200' onClick={handleSubmitChanges}>Submit Changes</button>}
      </div>


      <div className='bg-gray-50 text-center m-3'>
        <input className='border-2 rounded-2xl m-1 p-2' type="text" value={searchTerm} onChange={handleSearch} />
        <button className='p-2 border-2 rounded-2xl' onClick={searchNotes}>Search Notes</button>
        {searchResults && <div>
           {searchResults.map((item,index)=> (
            <div key={index}>
              <p>Note Found : {item.nota}</p>
            </div>
           ))}
           </div>}
      </div>
    </>
  )
}

export default App
