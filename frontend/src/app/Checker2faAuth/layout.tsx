
import NavBarPublic from "../components/navBar/NavbarPublic";


export default function Layout(prompt: { children: React.ReactNode }) {
  return (
    <div className=" bg-color-main">
      <NavBarPublic>{prompt.children}</NavBarPublic>
    </div>
  );
}
