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
    return new NextResponse("Success", { status: 200 });
  } catch (error) {
    console.log("[PRODUCT_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(req: Request, res: Response) {
  try {
    const products = await prismadb.productId.findMany({
      select: {
        id: true,
        title: true,
        Price: true,
        description: true,
      }
    });

    return new NextResponse(JSON.stringify(products), { status: 200 });
  } catch (error) {
    console.log("PRODUCT_GET", error);
    return new NextResponse("Internal Error GET", { status: 500 });
  }
}

export async function DELETE(req: Request, res: Response) {
  const { id: productId } = await req.json()

  try{
    await prismadb.productId.delete({
      where: {
        id: productId
      }
  })
  return new NextResponse("Sucess", {status: 200})
  }
  catch(error){
    console.log(`Internal Error ${productId}`)
    return new NextResponse("Internal Error DELETE", {status: 500})
  }
}
