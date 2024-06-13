import { useContext } from 'react'
import Sidebar from './components/Sidebar'
import ChatContainer from './components/ChatContainer'
import { UserContext } from './context/UserContext'

const App = () => {
  const User = useContext(UserContext);
  
  return (
    <div>
    <div className=' sm:flex md:flex md:border border-white md:mx-24 md:my-10 md:shadow-2xl md:rounded-xl p-2'>
      <Sidebar/>
      {User.showChat && (
      <div className='md:w-full sm:w-full'>
      <ChatContainer/>
      </div>)}
    </div>
    </div>
  )
}

export default App