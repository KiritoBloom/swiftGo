"use client";

// Import necessary modules and components
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";

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

const ProductId = ({}) => {
  const [product, setProduct] = useState<Product | null>(null);
  const router = useRouter();
  const pathName = usePathname();

  // Extract the last part of the URL as the product ID
  const productId = pathName.split("/").pop();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        if (productId) {
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
    if (productId) {
      fetchProductDetails();
    } else {
      // Clear product details if productId is not a valid number
      setProduct(null);
    }
  }, [productId]); // Include productId in the dependency array

  const handleOnClick = async () => {
    if (product) {
      await axios.post("/api/products", {
        id: product.id,
        title: product.title,
        price: product.price,
        description: product.description,
      });
    }
  };

  return (
    <div>
      {product ? (
        <>
          <div className="flex justify-start mt-5 ml-5">
            <h2 className="text-[40px] font-bold">{product.title}</h2>
          </div>
          {product.images.slice(0, 1).map((image, index) => (
            <div className="flex ml-5 mt-5" key={index}>
              <div className="mr-5">
                {product.images.slice(2).map((imageUrl, index) => (
                  <Image
                    key={index}
                    src={imageUrl.replace(/[\[\]"]+/g, "")} // Remove square brackets and quotes from the URL
                    width={1000}
                    height={800}
                    alt={`Product Image for ${product.title}`}
                    className="aspect-auto m-2 ring-2 ring-offset-2 rounded-md"
                  />
                ))}
              </div>
              <div className="flex flex-col justify-center">
                <div className="bg-gray-200 border-4 rounded-sm mb-3 p-3">
                  <p className="text-md">{product.description}</p>
                </div>
                <div className="bg-primary/10 rounded-md max-w-max">
                  <p className="text-[35px] font-bold w-full p-3">
                    Price: ${product.price}
                  </p>
                </div>
                <Button
                  className="w-[15%] mt-10 rounded-xl"
                  onClick={() => handleOnClick()}
                >
                  Add To Cart <ShoppingBag className="ml-5" />
                </Button>
              </div>
            </div>
          ))}
          <div className="ml-5 mt-10">
            <h1 className="font-bold text-xl">Related Items</h1>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProductId;
