import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'


function App() {
  const [count, setCount] = useState(0)

  const [color, setcolor] = useState("pink")

  return (
    <>
        <div className=' h-screen w-screen flex justify-center' style={{backgroundColor:color}}>

          <div  className='bg-orange-600 w-[63rem] h-20 absolute bottom-[3rem] rounded-lg border-4 border-purple-500 flex items-center justify-center space-x-10 '>

          <button onClick={()=>{setcolor("blue")}} className='bg-blue-500 h-10 w-20 border-2 border-white rounded-lg'>
          blue
          </button>
          <button onClick={()=>{setcolor("green")}} className='bg-green-500 h-10 w-20 border-2 border-white rounded-lg'>
            Green
          </button>
          <button onClick={()=>{setcolor("red")}} className='bg-red-700 h-10 w-20 border-2 border-white rounded-lg'>
            Red
          </button>
          <button onClick={()=>{setcolor("white")}} className='bg-white h-10 w-20 border-2 border-white text-black rounded-lg '>
            White
          </button>
          <button onClick={()=>{setcolor("black")}} className='bg-black h-10 w-20 border-2 border-white rounded-lg text-white'>
            Black
          </button>
          </div>
        </div>
    </>
  )
}

export default App
