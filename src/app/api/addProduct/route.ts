import { NextRequest, NextResponse } from 'next/server';
import {connect} from '@/dbConfig/dbConfig';
import Product from '@/models/productList';

export async function POST(request: NextRequest) {
  await connect();

  try {
    const reqBody = await request.json();
    const { list } = reqBody;

    if (!list || !Array.isArray(list)) {
      return NextResponse.json({ error: "Invalid list data" }, { status: 400 });
    }

    const savedProducts = await Promise.all(
      list.map(async (item) => {
        const newProduct = new Product({
          name: item.name,
          newPrice: item.newPrice,
          oldPrice: item.oldPrice,
          description: item.description,
          imageName: item.imageName,
        });
        return await newProduct.save();
      })
    );

    return NextResponse.json({ message: "List saved successfully", savedProducts });
  } catch (error) {
    console.error("Error saving list:", error);
    return NextResponse.json({ error: "Error saving list" }, { status: 500 });
  }
}
