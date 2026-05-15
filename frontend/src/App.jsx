import { useEffect } from 'react'
import './App.css'

function App() {



  // function to load all the notes from the back 
  useEffect( () => {
    async function getNotes() {
      try {
        const result = await fetch(`${import.meta.env.VITE_API_URL}/notas`)
        const data = await result.json()
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    };
    getNotes()
  },[])

  return (
    <>
      <div>
        <h1>Notes App</h1>
      </div>
    </>
  )
}

export default App
