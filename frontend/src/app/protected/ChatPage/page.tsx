import BoxChat from "./components/BoxChat";
import ListUser from "./components/ListUser";

const PageChat = async () => {
  return (
    <div className="flex justify-center items-center h-fit min-h-screen my-4 text-black">
      <ListUser />
      <BoxChat />
    </div>
  );
};

export default PageChat;
