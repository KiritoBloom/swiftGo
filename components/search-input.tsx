"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "./ui/input";
import axios from "axios";
import { useRouter } from "next/navigation";

type Product = {
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
};

const SearchInput = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
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

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleOnClick = (productId: number) => {
    router.push(`/products/${productId}/`);
    setSearchTerm("");
  };

  return (
    <div className="justify-center flex-wrap hidden md:flex">
      <div className="absolute flex justify-center items-center top-1">
        <Search className="absolute h-4 w-4 top-3 left-4 text-muted-foreground" />
        <Input
          placeholder="Search..."
          className="pl-10 bg-primary/10 flex justify-center items-center"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="z-1 w-[50%] h-[20%] absolute mt-8">
        {searchTerm && (
          <>
            {filteredProducts.length > 0 ? (
              <div className="bg-white rounded-md pt-2 pb-2 border overflow-y-auto h-full">
                {filteredProducts.map((product) => (
                  <div
                    onClick={() => handleOnClick(product.id)}
                    key={product.id}
                    className="cursor-pointer"
                  >
                    <div
                      key={product.id}
                      className="flex justify-center items-center flex-wrap m-auto border rounded-md p-4 shadow-lg 
                        bg-foreground/30 w-[95%] mt-2 mb-2"
                    >
                      <p className="font-bold">{product.title}</p>
                      <p className="ml-auto">Price: ${product.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500  bg-white border rounded-md">
                No results found for &quot;{searchTerm}&quot;.
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SearchInput;
