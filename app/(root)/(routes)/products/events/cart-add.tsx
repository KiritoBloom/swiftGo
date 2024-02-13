// Import necessary modules and components
import axios from "axios";
import { useEffect } from "react";
import prismadb from "@/lib/prismadb";

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

const FetchProductDetails: React.FC<{ productId: string | undefined }> = ({
  productId,
}) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (productId) {
          const productDetails = await axios.get<Product>(
            `https://api.escuelajs.co/api/v1/products/${productId}`
          );

          const { id, title, price, description } = productDetails.data;

          await prismadb.productId.create({
            data: {
              id: id.toString(),
              title,
              Price: price.toString(),
              description,
            },
          });

          console.log("Product added to the database successfully!");
        }
      } catch (error) {
        console.error("Error adding product to the database:", error);
      }
    };

    fetchData();
  }, [productId]);

  return null;
};

export default FetchProductDetails;
