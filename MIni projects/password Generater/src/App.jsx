import { useState, useEffect, useCallback, useRef } from 'react'
import React from 'react'


function App() {

  const [pass, setpass] = useState("")
  const [length, setlength] = useState(8)
  const [number, setnumber] = useState(false)
  const [Special, setSpecial] = useState(false)
  const [copych, setcopych] = useState("copy")
  const copyref = useRef(null)
  const copychange = useRef(null)

  const password = useCallback(
    () => {
      let tempass = "";
      let char = "ABCDEFGHIJKLMNOPQRSTWXYZ"


      if (number) {
        char += "0123456789";
      }

      if (Special) {
        char += "!@#$%^&*()"
      }
      for (let i = 0; i < length; i++) {

        let tem = Math.floor((Math.random() * char.length))
        tempass += char[tem]
      }

      setpass(tempass)
      setcopych("copy")
    },
    [setpass, length, number, Special],
  )

  useEffect(() => {

    password()

  }, [password, length, number, Special])

  const copy = () => {
    window.navigator.clipboard.writeText(pass);
    copyref.current.select()
    setcopych("copyed")
  }

  return (
    < >
      <div className='bg-purple-600 h-screen w-screen flex justify-center items-center' >
        <button onClick={copy} className='bg-black rounded-lg absolute bottom-[15.5rem] h-10 w-20 text-white border-2 border-green-500'>
          {copych}
        </button>
        <div className='bg-black h-[8rem] w-[35rem] rounded-lg border-4 border-green-500 relative '>
          <input ref={copyref} type="text" className='  bg-transparent text-white rounded-sm h-8 absolute right-[8.4rem] text-2xl text-center mt-2 focus:outline-none' readOnly value={pass} />

          <div className="functions absolute bottom-0 h-16 w-full text-green-700 flex justify-center items-center space-x-5">
            <p className='flex items-center space-x-2 '>
              <input onChange={(e) => { setlength(Number(e.target.value)) }}
                type="range" min={1} max={25} value={length} className='bg-green-600' />
              <label> {length}</label>
            </p>

            <p className='flex items-center space-x-2'>
              <input onChange={() => {
                setnumber((prev) => !prev)
              }} className='size-6' type="checkbox" />
              <label>Numbers</label>
            </p>

            <p className='flex items-center space-x-2'>
              <input onChange={() => {
                setSpecial((prev) => !prev)
              }} className='size-6' type="checkbox" />
              <label>Special Characters</label>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
