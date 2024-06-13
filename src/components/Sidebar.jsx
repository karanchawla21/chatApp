import { useContext } from 'react';
import UserCard from './UserCard';
import { UserContext } from '../context/UserContext';

const Sidebar = () => {
  const User = useContext(UserContext);

  return (
    <div className={`h-screen block md:w-2/5 lg:w-1/3`}>
      {User.chatData.map((chat, index) => (
        <UserCard key={index} info={chat} />
      ))}
    </div>
  );
};

export default Sidebar;
