import { UserButton } from "@clerk/nextjs";
import SearchInput from "./search-input";
import { ModeToggle } from "./mode-toggle";
import { ShoppingCart } from "lucide-react";

const Navbar = () => {
  return (
    <div className="bg-gray-200 w-full h-[50px] flex items-center border-b">
      <ShoppingCart className="ml-5 mr-2 w-5 h-5" />
      <h1 className="font-bold">SwiftGo</h1>
      <div className="flex-grow">
        <SearchInput />
      </div>
      <div className="mr-3">
        <ModeToggle />
      </div>
      <div className="flex items-center mr-2">
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
};

export default Navbar;
