import Link from 'next/link';
import { usePathname } from 'next/navigation';


const NavLink = ({ href, title }: any) => {

    const currentPath = usePathname();
    return (
        <Link
            href={href}
            className={`block py-2 pl-3 text-gray-300 text-md rounded md:p:0  
                ${currentPath === href ? "underline text-white" : ""}
            
            `}
        >
            {title}
        </Link>
    );
};

export default NavLink;

