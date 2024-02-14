"use client";

import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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

export default function Page() {
  const [products, setProducts] = useState<Product[]>([]);
  const router = useRouter();

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

  const handleOnClick = (productId: number) => {
    router.push(`/products/${productId}/`);
  };

  const truncateDescription = (description: string, limit: number) => {
    return description.length > limit
      ? `${description.slice(0, limit)}...`
      : description;
  };

  return (
    <div className="flex flex-col items-center overflow-y-auto">
      <h1 className="text-[50px] font-bold mt-5">Products</h1>
      <div className="flex justify-center flex-wrap mt-5 gap-x-[20px]">
        {products.slice(1, 31).map((product) => (
          <Card
            key={product.id}
            className="w-[20vw] mt-5 hover:scale-105 transition-all duration-400 cursor-pointer"
            onClick={() => handleOnClick(product.id)}
          >
            <CardTitle className="mt-5 flex justify-center text-md">
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
                  className="w-[10vw] aspect-auto m-2 ring-2 ring-offset-2 rounded-md"
                />
              ))}
            </div>

            <CardDescription className="ml-2 mt-2 font-bold text-[10px]">
              {truncateDescription(product.description, 250)}
            </CardDescription>
            <Separator className="mt-5" />
            <CardDescription className="text-md ml-5 mt-2">
              Price: ${product.price}
            </CardDescription>
          </Card>
        ))}
      </div>
    </div>
  );
}
