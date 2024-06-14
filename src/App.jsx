import { useContext } from 'react';
import Sidebar from './components/Sidebar';
import ChatContainer from './components/ChatContainer';
import { UserContext } from './context/UserContext';

const App = () => {
  const User = useContext(UserContext);

  return (
    <div className='lg:flex md:flex lg:border border-white lg:mx-24 lg:my-10 lg:shadow-2xl lg:rounded-xl p-2'>
      <div className={`lg:block md:block ${User.showChat ? 'hidden md:block' : 'block'} md:w-2/5 lg:w-[28%] md:border-r-4 border-gray-400 lg:border-r-4 border-gray-400`}>
        <Sidebar />
      </div>
      {User.showChat && (
        <div className='w-full md:w-3/5 lg:w-full'>
          <ChatContainer />
        </div>
      )}
    </div>
  );
};

export default App;
