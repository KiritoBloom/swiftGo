"use client";

import Image from "next/image";
import { Card, CardDescription, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

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

const RelatedItemCard = ({
  id,
  price,
  title,
  description,
  category,
  images,
}: Product) => {
  const [categoryId, setCategoryId] = useState<Product | null>(null);
  const [product, setProduct] = useState<Product | null>(null);
  const pathName = usePathname();
  const productId = Number(pathName.split("/").pop());

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        if (!isNaN(productId)) {
          const response = await axios.get<Product>(
            `https://api.escuelajs.co/api/v1/products/?${categoryId}`
          );
          setCategoryId(response.data);
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    // Fetch product details only if productId is a valid number
    if (!isNaN(productId)) {
      fetchProductDetails();
    } else {
      // Clear product details if productId is not a valid number
      setCategoryId(null);
    }
  }, [categoryId]); // Include productId in the dependency array

  const router = useRouter();
  const truncateDescription = (description: string, limit: number) => {
    return description.length > limit
      ? `${description.slice(0, limit)}...`
      : description;
  };

  const handleOnClick = (productId: number) => {
    router.push(`/products/${productId}`);
  };
  return (
    <Card
      onClick={() => handleOnClick(productId)}
      key={productId}
      className="w-[20vw] h-[53vh] mt-5 hover:scale-105 transition-all duration-400 cursor-pointer"
    >
      <CardTitle className="mt-5 flex justify-center text-lg">{}</CardTitle>
      <Separator className="mt-2" />
      <div className="flex flex-wrap justify-center"></div>
      <CardDescription className="ml-2 mt-2 font-bold text-[10px]">
        PlaceHolder
      </CardDescription>
      <Separator className="mt-10" />
      <CardDescription className="text-md ml-5 mt-2">
        Price: $PlaceHolder
      </CardDescription>
    </Card>
  );
};

export default RelatedItemCard;
