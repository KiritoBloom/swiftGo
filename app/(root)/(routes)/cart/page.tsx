"use client";

import { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import {
  Card,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

// Define a type for your product
interface Product {
  id: string;
  title: string;
  Price: string;
  description: string;
  // Add other properties as needed
}

export default function Page() {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get("/api/products");
        const fetchedCartItems: Product[] = response.data;
        setCartItems(fetchedCartItems); // Update state with fetched data
      } catch (error) {
        console.error("[CART_ITEMS]", error);
      }
    };

    fetchCartItems();
  }, []); // Empty dependency array to run the effect only once when the component mounts

  const truncateDescription = (description: string, limit: number) => {
    return description.length > limit
      ? `${description.slice(0, limit)}...`
      : description;
  };

  // Calculate the total price
  const total = cartItems.reduce(
    (acc, item) => acc + parseFloat(item.Price),
    0
  );

  const handleOnClick = async (productId: string) => {
    console.log(`Removing product with ID: ${productId}`);
    if (productId) {
      try {
        await axios.delete(`/api/products`, {
          data: { id: productId },
        });

        // Remove the deleted item from the cartItems state
        setCartItems((prevCartItems) =>
          prevCartItems.filter((item) => item.id !== productId)
        );

        toast({
          description: "Item removed from Cart",
          variant: "success",
        });
      } catch (error) {
        console.error("Error deleting product:", error);

        toast({
          description: "Something went Wrong!",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="bg-primary/10 w-full h-full overflow-y-auto">
      <div>
        <h1 className="font-bold ml-5 mt-5 text-[30px] flex justify-center items-center">
          Cart:
        </h1>
        <div className="flex justify-center items-center mt-2">
          <Separator className="bg-black w-[90%]" />
        </div>
        <div className="mt-5 flex justify-center flex-wrap">
          {cartItems.map((item) => (
            <Card
              className="mt-5 w-[90%] h-full mb-10 transition-all"
              key={item.id}
            >
              <CardTitle className="mt-5 ml-5 flex-wrap flex text-center items-center justify-between">
                <div>{item.title}</div>
                <div
                  className="bg-primary/20 rounded-xl flex flex-wrap p-1 cursor-pointer md:mr-5 md:mt-0 md:mb-0 mx-auto mt-5 mb-2"
                  onClick={() => handleOnClick(item.id)}
                >
                  <X />
                  <h1 className="ml-2">Remove Product</h1>
                </div>
              </CardTitle>
              <Separator className="w-[90%] m-auto mt-2" />
              <CardDescription className="ml-5 mt-2 mr-2">
                {item.description}
              </CardDescription>
              <Separator className="w-[90%] m-auto mt-5" />
              <CardFooter className="mt-5 font-bold text-[20px]">
                Price: ${item.Price}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
      <div className="md:w-[15%] w-[95%] bg-primary/20 rounded-md mb-10 m-auto p-5">
        <h2 className="text-xl font-bold">
          Total Cost: ${total.toFixed(2)} {/* Display the total price */}
        </h2>
      </div>
    </div>
  );
}
