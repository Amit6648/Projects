
import { useState,useEffect } from 'react'

export default function Github() {

    const [data, setdata] = useState([])

    useEffect(() => {
      fetch("https://api.github.com/users/hiteshchoudhary").then(res=>res.json()).then(res=>setdata(res))
      console.log(data)

      
     
    }, [])
    
  return (
    <div className='text-center text-5xl bg-slate-700 text-white mt-5 mb-5'>
      Github Followers : {data.followers}
    </div>
  )
}
