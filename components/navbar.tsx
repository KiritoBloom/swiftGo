"use client";

import { UserButton } from "@clerk/nextjs";
import SearchInput from "./search-input";
import { ModeToggle } from "./mode-toggle";
import { LucideShoppingBag, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const handleOnClick = () => {
    router.push("/cart");
  };

  return (
    <div className="bg-gray-200 w-full h-[50px] max-h-[50px] flex items-center border-b pb-2 pt-2">
      <ShoppingCart className="ml-5 mr-2 w-5 h-5" />
      <h1 className="font-bold">
        Swift<span className="text-red-700">G</span>
        <span className="text-cyan-700">O</span>
      </h1>
      <div className="flex-grow">
        <SearchInput />
      </div>
      <div className="mr-3">
        <ModeToggle />
      </div>
      <div className="flex items-center mr-2">
        <div
          className="mr-5 cursor-pointer hover:bg-primary/10 p-2 rounded-md transition-all"
          onClick={() => handleOnClick()}
        >
          <LucideShoppingBag size={20} />
        </div>
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
};

export default Navbar;
