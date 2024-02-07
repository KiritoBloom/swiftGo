"use client";

import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

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
  // Add other properties as needed
}

const ProductId = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const router = useRouter();
  const pathName = usePathname();

  // Extract the last part of the URL as the product ID
  const productId = Number(pathName.split("/").pop());

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        if (!isNaN(productId)) {
          const response = await axios.get<Product>(
            `https://api.escuelajs.co/api/v1/products/${productId}`
          );
          setProduct(response.data);
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
      setProduct(null);
    }
  }, [productId]); // Include productId in the dependency array

  return (
    <div>
      {product ? (
        <>
          <div className="flex justify-center mt-5">
            <h2 className="text-2xl font-bold">{product.title}</h2>
          </div>
          {product.images.slice(0, 1).map((image, index) => (
            <Image
              key={index}
              src={image}
              width={200}
              height={200}
              alt={`Product Image ${index + 1} for ${product.title}`}
              className="w-[20vw] aspect-auto m-2 ring-2 ring-offset-2 rounded-md ml-5"
            />
          ))}

          <div className="flex-col justify-center mt-5 ml-5">
            <p className="text-md">{product.description}</p>
            <p className="text-md ">Price: ${product.price}</p>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProductId;
