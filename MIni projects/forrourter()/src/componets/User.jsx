
import { useParams } from 'react-router-dom'

function User() {
    const {id} = useParams()
  return (
    <div className='text-center font-extrabold text-5xl bg-slate-400'>User : {id}</div>
  )
}

export default User