import { connect } from "@/dbConfig/dbConfig";
import Book from "@/models/bookModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;
    const reqBody = await request.json();
    try {
        const updatedBook = await Book.findByIdAndUpdate(id, reqBody, { new: true });
        if (!updatedBook) {
            return NextResponse.json({ message: "Book not found" }, { status: 404 });
        }
        return NextResponse.json({ message: "Book updated successfully", data: updatedBook });
    } catch (error: any) {
        return NextResponse.json({ message: "Error updating book" }, { status: 500 });
    }
}
