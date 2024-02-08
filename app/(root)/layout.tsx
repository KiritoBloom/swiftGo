import Navbar from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";

export default function Home({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-full">
      <Navbar />
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex flex-col w-full h-full">{children}</div>
      </div>
    </div>
  );
}
