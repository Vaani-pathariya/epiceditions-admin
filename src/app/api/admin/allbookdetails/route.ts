import Book from "@/models/bookModel";
import { connect } from "@/dbConfig/dbConfig";
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
    const books = await Book.find();
    return NextResponse.json({
      message: "Data shared successfully",
      success: true,
      data: books,
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Error getting books" },
      { status: 500 }
    );
  }
}
