import { useState } from "react";
import SearchBar from "./SearchBar";

const navigation = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Messanger",
    href: "/messanger",
  },
  {
    name: "Logout",
    href: "/signup",
  },
];

export default function NavBar({ username }) {
  const [menuOpened, setMenuOpened] = useState(false);

  const toggleMenu = () => setMenuOpened(!menuOpened);

  return (
    <div>
      <nav className="bg-[#2D0F0F]">
        <div className="flex h-16 items-center text-white">
          <MenuButton toggleMenu={toggleMenu} menuOpened={menuOpened} />
          <div className="flex w-screen items-center justify-between">
            <div className="flex items-center">
              <img src="placeholder-image.png" href="/" className="ml-10 self-center size-10 rounded-full"></img>
              <p className="text-sm font-bold pl-2">Welcome, {username}</p>
            </div>
            <Menu />
          </div>
        </div>
        <MobileMenu menuOpened={menuOpened} />
      </nav>
    </div>
  );
}

const Menu = () => {
  return (
    <div className="hidden sm:block">
      <ul className="mr-12 flex justify-between self-end">
        <li className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
          <SearchBar />
        </li>
        {navigation.map((link) => (
          <li key={link.name}>
            <a
              href={link.href}
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
              onClick={() => {
                if (link.name === "Logout") {
                  localStorage.removeItem("token");
                }
              }}
            >
              {link.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

const MenuButton = ({ toggleMenu, menuOpened }) => {
  return (
    <div className="absolute right-0 flex items-center sm:hidden">
      <button
        className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
        onClick={toggleMenu}
      >
        <span className="absolute -inset-0.5"></span>
        <span className="sr-only">Open main menu</span>
        <svg
          className={(menuOpened ? "hidden" : "block") + " h-6 w-6"}
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
        <svg
          className={(menuOpened ? "block" : "hidden") + " h-6 w-6"}
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};

const MobileMenu = ({ menuOpened }) => {
  return (
    <div className={"sm:hidden " + (!menuOpened ? "hidden" : "block")}>
      <div className="w-full space-y-1 px-2 pb-3 pt-2">
        <SearchBar />
        {navigation.map((link) => (
          <a
            key={link.name}
            href={link.href}
            className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            {link.name}
          </a>
        ))}
      </div>
    </div>
  );
};
