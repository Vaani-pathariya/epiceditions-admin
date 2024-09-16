import { connect } from "@/dbConfig/dbConfig";
import Book from "@/models/bookModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;
    try {
        const book = await Book.findById(id);
        if (!book) {
            return NextResponse.json({ message: "Book not found" }, { status: 404 });
        }
        return NextResponse.json({ data: book });
    } catch (error: any) {
        return NextResponse.json({ message: "Error retrieving book" }, { status: 500 });
    }
}
