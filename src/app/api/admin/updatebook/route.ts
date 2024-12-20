import { connect } from "@/dbConfig/dbConfig";
import Book from "@/models/bookModel";
import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/helpers/verifyToken";
connect();

export async function POST(request: NextRequest) {
  const token = request.cookies.get("token");
    const {valid,decoded,error}= await verifyToken(token);
    if(!valid){
      return NextResponse.json({
        message: "User not verified",
        success:false 
      },{status: 500});
    }
  const reqBody = await request.json();
  const id = reqBody.id;
  const body = reqBody.data;
  try {
    const updatedBook = await Book.findByIdAndUpdate(id, body, { new: true });
    if (!updatedBook) {
      return NextResponse.json({ message: "Book not found" }, { status: 404 });
    }
    return NextResponse.json({
      message: "Book updated successfully",
      data: updatedBook,
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Error updating book" },
      { status: 500 }
    );
  }
}
