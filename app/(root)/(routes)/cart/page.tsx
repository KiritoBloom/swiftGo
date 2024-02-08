import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function Page() {
  return (
    <div className="mr-10 mt-10 flex justify-center">
      <div className="bg-primary/5 w-[500px] h-[500px] rounded-md">
        <h1 className="text-xl ml-5 mt-10">Cart Summary</h1>
        <div className="flex justify-center items-center mt-10">
          <Separator className=" w-[90%] bg-black" />
        </div>
        <div className="ml-5 mt-10">
          <h2 className="mt-0">Order Total:</h2>
          <div className="mt-5">
            <p>Product Name: $34.87</p>
            <p>Product Name: $34.87</p>
            <p>Product Name: $34.87</p>
            <h2 className="mt-10 text-xl font-bold flex justify-end">
              Total: Mock Price
            </h2>
          </div>
        </div>
        <div className="flex justify-center">
          <Button className="mt-10 w-[90%]">CheckOut</Button>
        </div>
      </div>
    </div>
  );
}
