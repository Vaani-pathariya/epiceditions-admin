import { connect } from "@/dbConfig/dbConfig";
import Book from "@/models/bookModel";
import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/helpers/verifyToken";
connect();

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get("token");
    const {valid,decoded,error}= await verifyToken(token);
    if(!valid){
      return NextResponse.json({
        message: "User not verified",
        success:false 
      },{status: 500});
    }
    const body = await request.json();
    const result = await Book.findByIdAndDelete(body.id);
    if (!result) {
      return NextResponse.json({ message: "Book not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Book deleted successfully" });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Error deleting book" },
      { status: 500 }
    );
  }
}
