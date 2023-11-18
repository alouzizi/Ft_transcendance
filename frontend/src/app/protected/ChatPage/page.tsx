import BoxChat from './components/BoxChat';
import ListUser from './components/ListUser';

const PageChat = async () => {
  // md:bg-color-main bg-white
  return (
    <div className="flex justify-center items-center h-fit min-h-screen text-black ">
      <ListUser />
      <BoxChat />
    </div>
  );
};

export default PageChat;
