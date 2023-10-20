export default function AuthLayout(prompt: { children: React.ReactNode }) {
  return (
    <div className="bg-white p-2 w-80 h-96  m-auto rounded-md">
      {prompt.children}
    </div>
  );
}
