"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import axios from "axios";

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
            {/* Map through cartItems and display each product */}
            {cartItems.map((item) => (
              <div key={item.id}>
                <p>{item.id}</p>
                <p>Product Name: {item.title}</p>
                <p>Product Price: ${item.Price}</p>
                <p>Product Description: {item.description}</p>
              </div>
            ))}
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
