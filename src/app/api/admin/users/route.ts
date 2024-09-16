import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
connect();
export async function POST(request: NextRequest) {
  try {
    const users = await User.find();
    return NextResponse.json({
      message: "Data shared successfully",
      success: true,
      data: users,
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Error getting books" },
      { status: 500 }
    );
  }
}
