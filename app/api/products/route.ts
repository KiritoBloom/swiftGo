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
