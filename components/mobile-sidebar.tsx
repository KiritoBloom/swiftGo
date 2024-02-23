import { Home, Menu, Search, Settings, ShoppingBasket } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const MobileSideBar = () => {
  const router = useRouter();
  const pathName = usePathname();

  const routes = [
    {
      icon: Home,
      href: "/",
      label: "Home",
    },
    {
      icon: ShoppingBasket,
      href: "/products/all",
      label: "Products",
    },
    {
      icon: Settings,
      href: "/settings",
      label: "Settings",
    },
  ];

  const onNavigate = (url: string) => {
    return router.push(url);
  };

  return (
    <div>
      <Sheet>
        <SheetTrigger>
          <Menu className="ml-2 mt-2" />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
          <SheetFooter>
            {routes.reverse().map((route) => (
              <div
                onClick={() => onNavigate(route.href)}
                key={route.href}
                className={cn(
                  "text-muted-foreground text-xl p-3 w-full font-medium cursor-pointer hover:text-primary hover:bg-primary/10 rounded-xl transition mt-2",
                  pathName === route.href && "bg-primary/10 text-primary"
                )}
              >
                <div className="flex items-center justify-center">
                  <route.icon className="h-10 w-5 mr-2" />
                  <h1 className="text-[12px] font-bold">{route.label}</h1>
                </div>
              </div>
            ))}
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileSideBar;
