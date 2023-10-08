export default function FriendBtn(prompt: {
  btnName: string;
  onClick: () => void;
  className: string;
}) {
  return (
    <button
      className={`mr-4 font-bold bg-gray-500 text-lg p-2 rounded-md ${prompt.className}`}
    >
      {prompt.btnName}
    </button>
  );
}
