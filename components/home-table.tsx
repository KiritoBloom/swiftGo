"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Separator } from "./ui/separator";
import Image from "next/image";

// Define the product interface
interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: {
    id: number;
    name: string;
    image: string;
  };
  images: string[];
}

// ... (previous imports)

export const HomeTable = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.escuelajs.co/api/v1/products"
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="items-center justify-center flex mt-5">
        <Card className="w-[90vw] h-[350px] bg-cyan-500">
          <CardTitle className="flex justify-center mt-10 text-[70px] text-white">
            Your go-to to the best products
          </CardTitle>
          <CardContent className="flex justify-center mt-10 text-[50px] font-bold">
            Check out our new hit Products!
          </CardContent>
        </Card>
      </div>
      <div className="flex justify-center mt-5">
        <h1 className="font-bold underline text-[30px]">Hit Products!</h1>
      </div>
      <div className="flex justify-center flex-wrap mt-5 gap-x-[20px]">
        {products.slice(0, 5).map((product) => (
          <Card
            key={product.id}
            className="w-[20vw] h-[45vh] mt-5 hover:scale-105 transition-all duration-400"
          >
            <CardTitle className="mt-5 flex justify-center text-lg">
              {product.title}
            </CardTitle>
            <Separator className="mt-2" />
            <div className="flex flex-wrap justify-center">
              <Image
                src={product.images[0]} // Use the first image from the images array
                width={200}
                height={200}
                alt={`Product Image for ${product.title}`}
                className="w-[10vw] aspect-auto m-2 ring-2 ring-offset-2 rounded-md"
              />
            </div>
            <CardDescription className="ml-5 mt-2 font-bold text-[1px]">
              {product.description}
            </CardDescription>
            <Separator className="mt-10" />
            <CardDescription className="text-md ml-5 mt-2">
              {product.price}
            </CardDescription>
          </Card>
        ))}
      </div>
    </>
  );
};
