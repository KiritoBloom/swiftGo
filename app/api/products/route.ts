
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  try {
    const product = await req.json();
    await prismadb.productId.create({
      data: {
        id: product.id.toString(),
        title: product.title,
        Price: product.price.toString(),
        description: product.description,
      },
    });
    return new NextResponse("Sucess", {status:200})
  }
  catch(error){
    console.log("[PRODUCT_POST]", error);
    return new NextResponse("Internal Error", {status: 500})
  }
}


