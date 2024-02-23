"use client";

import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardDescription, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import Image from "next/image";

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

// ... (previous imports and interfaces)

const RelatedItems = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[] | null>(null);
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const pathName = usePathname();
  const productId = pathName.split("/").pop();
  const router = useRouter();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        if (productId) {
          const response = await axios.get<Product>(
            `https://api.escuelajs.co/api/v1/products/${productId}`
          );
          const productData = response.data;
          setProduct(productData);
          setCategoryId(productData.category.id);
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    // Fetch product details only if productId is a valid number
    if (productId) {
      fetchProductDetails();
    } else {
      // Clear product details and category ID if productId is not a valid number
      setProduct(null);
      setCategoryId(null);
    }
  }, [productId]);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        if (categoryId) {
          const response = await axios.get<Product[]>(
            `https://api.escuelajs.co/api/v1/products?category=${categoryId}`
          );
          const productData = response.data;
          setProducts(productData);
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    // Fetch product details only if categoryId is a valid number
    if (categoryId) {
      fetchProductDetails();
    } else {
      // Clear product details if categoryId is not a valid number
      setProducts(null);
    }
  }, [categoryId]);

  const truncateDescription = (description: string, limit: number) => {
    return description.length > limit
      ? `${description.slice(0, limit)}...`
      : description;
  };

  const handleOnClick = (productId: number) => {
    router.push(`/products/${productId}/`);
  };

  return (
    <div>
      <div className="flex justify-center flex-wrap mt-5 gap-x-[20px]">
        {products?.map((product) =>
          categoryId === product.category.id &&
          product.id.toString() !== productId ? (
            <Card
              key={product.id}
              className="md:w-[20vw] w-[95%] mt-5 hover:scale-105 transition-all duration-400 cursor-pointer"
              onClick={() => handleOnClick(product.id)}
            >
              <CardTitle className="mt-5 flex justify-center text-md">
                {product.title}-{product.category.id}
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
                    className="w-[50%] aspect-auto m-2 ring-2 ring-offset-2 rounded-md"
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
          ) : null
        )}
      </div>
    </div>
  );
};

export default RelatedItems;
