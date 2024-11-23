import User from "@/models/userModel";
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
    const users = await User.find({role:'User'},"username email createdOn status");
    return NextResponse.json({
      message: "Data shared successfully",
      success: true,
      data: users,
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Error getting users",success:false},
      { status: 500 }
    );
  }
}
