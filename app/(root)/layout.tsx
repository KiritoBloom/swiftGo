import { HomeTable } from "@/components/home-table";
import Navbar from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";

export default function Home({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex flex-col">
        <Navbar />
        <div className="flex">
          <Sidebar />
          <div className="flex flex-col w-full">{children}</div>
        </div>
      </div>
    </>
  );
}
