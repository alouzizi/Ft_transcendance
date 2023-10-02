export default function SBSection(prompt: {
  sectionName: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col w-full ">
      <p className="text-gray-400 mb-8 text-center text-md font-bold">
        {prompt.sectionName}
      </p>
      {prompt.children}
    </div>
  );
}
