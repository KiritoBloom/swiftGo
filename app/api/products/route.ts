import prismadb from "@/lib/prismadb";
import { auth, useAuth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  try {
    const { userId } = auth(); // Destructure and provide a default value
    if (!userId) {
      // Handle the case where userId is not available
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const product = await req.json();
    await prismadb.productId.create({
      data: {
        userId: userId,
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
    const { userId } = auth();
    const products = await prismadb.productId.findMany({
      where: {
        userId: userId?.toString()
      },
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
    const { userId } = auth();
    await prismadb.productId.delete({
      where: {
        id: productId,
        userId: userId?.toString()
      }
  })
  return new NextResponse("Sucess", {status: 200})
  }
  catch(error){
    console.log(`Internal Error ${productId}`)
    return new NextResponse("Internal Error DELETE", {status: 500})
  }
}
