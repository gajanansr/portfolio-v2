import { ModeToggle } from "./ThemeSwitcher";
import NavLink from "./NavLink";
import { headerItems } from "@/config/headerItems";

const Header = () => {
  return (
    <header className="fixed z-40 container right-0 left-0 w-full max-sm:px-2">
      <nav className="relative mx-auto z-40 flex flex-row justify-center items-center py-3 max-sm:py-2">
        <ul className="flex-center max-w-full p-2 px-5 max-sm:p-1.5 max-sm:px-1.5 border border-neutral-300 dark:border-neutral-700 shadow-lg shadow-black/10 dark:shadow-black/60 backdrop-blur-xl bg-white/85 dark:bg-neutral-900/85 rounded-full gap-1 max-sm:gap-0">
          {headerItems.map((link, index) => (
            <li key={index}>
              <NavLink route={link.route} label={link.label} />
            </li>
          ))}

          <li className="pr-2 max-sm:pr-0 max-sm:pl-1 logo cursor-pointer">
            <ModeToggle />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
