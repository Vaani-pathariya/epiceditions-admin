import { connect } from "@/dbConfig/dbConfig";
import Book from "@/models/bookModel";
import { NextRequest, NextResponse } from "next/server";

// Ensure database connection
connect();

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const reqBody = await request.json();
    const {
      name,
      author,
      description,
      smallDescription,
      review,
      stars,
      series,
      buy,
      languages,
    } = reqBody;

    // Create new book instance
    const newBook = new Book({
      name,
      author,
      description,
      smallDescription,
      review,
      stars,
      series,
      buy,
      languages,
    });

    // Save the book to the database
    await newBook.save();

    // Send success response
    return NextResponse.json({
      message: "Book saved successfully",
      success: true,
    });
  } catch (error: any) {
    // Handle errors
    return NextResponse.json(
      {
        message: "Error saving book",
        error: error.message, // Send error details for debugging
      },
      { status: 500 }
    );
  }
}
