"use client";

import { Search } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTrigger,
} from "./ui/dialog";
import SearchInput from "./search-input";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Input } from "./ui/input";

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

const MobileSearch = () => {
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
    <div className="mr-3 hover:bg-foreground/10 rounded-md w-10 items-start flex md:hidden">
      <Dialog>
        <DialogTrigger>
          <Search />
        </DialogTrigger>
        <DialogContent className="h-[130px] w-[95%] rounded-md top-60">
          <DialogDescription className="rounded-md">
            <div className="flex justify-center items-center h-full">
              <div className="justify-center flex-wrap md:flex w-full max-w-[400px]">
                <div className="relative flex justify-center items-center w-full outline md:w-20">
                  <Search className="absolute h-4 w-4 top-3 left-4 text-muted-foreground" />
                  <Input
                    placeholder="Search..."
                    className="pl-10 bg-primary/1 w-full md:w-auto rounded-md"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="z-1 w-full absolute mt-20 left-0">
                  {searchTerm && (
                    <>
                      {filteredProducts.length > 0 ? (
                        <div className="bg-white rounded-md pt-2 pb-2 border overflow-y-auto h-[150px]">
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
                                <p className="ml-auto">
                                  Price: ${product.price}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center text-gray-500  bg-white border rounded-md">
                          No results found for "{searchTerm}".
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MobileSearch;
