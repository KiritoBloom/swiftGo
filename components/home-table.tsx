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
import { useRouter } from "next/navigation";

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

export const HomeTable = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const router = useRouter();
  const handleOnClick = (productId: number) => {
    router.push(`/products/${productId}/`);
  };

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

  const truncateDescription = (description: string, limit: number) => {
    return description.length > limit
      ? `${description.slice(0, limit)}...`
      : description;
  };

  return (
    <>
      <div className="items-center justify-center flex mt-5">
        <Card className="w-[90%] h-[350px] bg-cyan-500">
          <CardTitle className="flex justify-center text-center mt-10 text-[35px] text-white md:text-[48px]">
            Your go-to to the best products
          </CardTitle>
          <CardContent className="flex justify-center mt-5 text-[38px] font-bold md:text-[40px] lg:text-[70px] text-center">
            Check out our new hit Products!
          </CardContent>
        </Card>
      </div>
      <div className="flex justify-center mt-5">
        <h1 className="font-bold underline text-[30px]">Hit Products!</h1>
      </div>
      <div className="grid grid-flow-col grid-rows-9 justify-center gap-x-2 items-center md:grid-rows-2 gap-y-5 mt-10">
        {products.slice(1, 6).map((product) => (
          <Card
            onClick={() => handleOnClick(product.id)}
            key={product.id}
            className="w-[95%] h-full md:w-[20vw] md:h-[30vh] lg:h-[60vh] m-auto mt-10 hover:scale-105 transition-all duration-400 cursor-pointer"
          >
            <CardTitle className="mt-5 flex justify-center text-lg text-center">
              {product.title}
            </CardTitle>
            <Separator className="mt-2" />
            <div className="flex flex-wrap justify-center">
              {product.images.slice(2).map((imageUrl, index) => (
                <Image
                  key={index}
                  src={imageUrl.replace(/[\[\]"]+/g, "")} // Remove square brackets and quotes from the URL
                  width={200}
                  height={200}
                  alt={`Product Image for ${product.title}`}
                  className="w-[30vw] md:w-[10vw] aspect-auto m-2 ring-2 ring-offset-2 rounded-md"
                />
              ))}
            </div>
            <CardDescription className="ml-2 mt-2 font-bold text-[10px]">
              {truncateDescription(product.description, 250)}
            </CardDescription>
            <Separator className="mt-10" />
            <CardDescription className="text-md ml-5 mt-2">
              Price: ${product.price}
            </CardDescription>
          </Card>
        ))}
      </div>
    </>
  );
};
