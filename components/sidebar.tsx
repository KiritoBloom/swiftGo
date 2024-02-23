"use client";
import { cn } from "@/lib/utils";
import { Home, Settings, ShoppingBasket } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export const Sidebar = () => {
  const pathName = usePathname();
  const router = useRouter();

  const routes = [
    {
      icon: Home,
      href: "/",
      label: "Home",
      pro: false,
    },
    {
      icon: ShoppingBasket,
      href: "/products/all",
      label: "Products",
      pro: true,
    },
    {
      icon: Settings,
      href: "/settings",
      label: "Settings",
      pro: false,
    },
  ];

  const onNavigate = (url: string, pro: boolean) => {
    return router.push(url);
  };

  return (
    <div className="bg-gray-200 h-full w-[100px] border-t hidden md:block">
      {routes.map((route) => (
        <div
          onClick={() => onNavigate(route.href, route.pro)}
          key={route.href}
          className={cn(
            "text-muted-foreground text-xl group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-primary hover:bg-primary/10 rounded-xl transition mt-2",
            pathName === route.href && "bg-primary/10 text-primary"
          )}
        >
          <div className="flex items-center justify-center ">
            <route.icon className="h-10 w-5 mr-2" />
            <h1 className="text-[12px] font-bold">{route.label}</h1>
          </div>
        </div>
      ))}
    </div>
  );
};
