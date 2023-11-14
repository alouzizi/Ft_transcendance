import BoxChat from './components/BoxChat';
import ListUser from './components/ListUser';

const PageChat = async () => {

  return (
    <div className="flex justify-center items-center h-screen text-black">
      <ListUser />
      <BoxChat />
    </div>
  );
};

export default PageChat;
