import { useEffect } from 'react'
import './App.css'
import { useState } from 'react'

function App() {


  const [recentNotes, setRecentNotes] = useState([])
  const [note, setNote] = useState("")

  // function to load all the notes from the back 
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

  function handleSubmit(){
    console.log(note)
  }

  function handleNote(event){
    setNote(event.target.value)
  }

  return (
    <>
      <div>
        <h1 className='text-4xl'>Notes App</h1>
      </div>

      <div id='showNotes'>
        {recentNotes && <div>
          {recentNotes.map((item,index)=>(
            <div key={index}>
              <p>{item.Nota}</p>
            </div>
          ))}          
          </div>}
      </div>

      <div className='bg-green-200 p-5 flex flex-col' id='enterNotes'>
        <label for="message" class=" block mb-2.5 text-sm font-medium text-heading">Your Note..</label>
        <textarea value={note} onChange={handleNote} id="message" rows="4" class="m-5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand w-[90%] h-fit p-3.5 shadow-xs placeholder:text-body" placeholder="Write your thoughts here..."></textarea>
        <button onClick={handleSubmit}>Submit</button>
      </div>





    </>
  )
}

export default App
