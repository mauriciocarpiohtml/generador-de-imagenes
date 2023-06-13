import { useState } from 'react'

function App() {

  const [prompt, setPrompt] = useState('')
  const [imagenes, setImagenes] = useState()
  
  async function crearImagenes(prompt){
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt: `${prompt}`
        })
      });
      const respuesta = await response.json()
      setImagenes(respuesta.bot.data.data)
      
    } catch (error) {
      console.log(error)
    }
  }

  

  return (
    <>
      <div className='w-[85%] rounded-lg p-10 bg-gray-100 z-10 mt-14 shadow-lg h-[90%] mx-auto flex flex-col justify-center items-center'>
        <div className='mt-10 mx-auto md:w-[50%] flex flex-col justify-center items-center'>
          <h2 className=' text-2xl md:text-5xl uppercase text-center font-black 
          text-transparent bg-clip-text bg-gradient-to-r from-[#5014ad] to-[#ff3067]'>Generate images with a single click.</h2>
          <p className='text-center text-md mb-3 mt-3 text-stone-400'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestiae asperiores modi blanditiis officiis animi? Eligendi velit quibusdam in eius, minus voluptas cupiditate veritatis vero ipsa.</p>
          <input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)} 
          className='w-full rounded-lg border border-[#5114ad68] mt-3 p-2 focus:outline-none'
          placeholder='A pineapple wearing glasses'/>
          <button
          onClick={() => crearImagenes(prompt)}
          className='p-3 w-full md:w-[50%] mx-auto mt-5 rounded-lg font-black text-center text-white bg-gradient-to-b from-[#5014ad] to-[#a80430] uppercase'
          >Create images</button>
        </div>

        {/* // Aqui iran las imagenes de la api  */}
        <div className=' flex flex-col md:flex-row gap-20 justify-center items-center w-full mt-10 p-10'>
        {imagenes?.map(imagen =>( 
          <img 
           key={imagen.url}
           src={imagen.url}/>
        ))}
        </div>
        
      </div>
    </>
  )
}

export default App
