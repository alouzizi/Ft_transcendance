<<<<<<< HEAD
import BoxChat from "./components/BoxChat";
import ListUser from "./components/ListUser";

const PageChat = async () => {
=======
import BoxChat from './components/BoxChat';
import ListUser from './components/ListUser';

const PageChat = async () => {

>>>>>>> implement the sockets successfully
  return (
    <div className="flex justify-center items-center h-screen text-black">
      <ListUser />
      <BoxChat />
    </div>
  );
};

export default PageChat;
