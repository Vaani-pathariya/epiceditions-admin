import { connect } from "@/dbConfig/dbConfig";
import Book from "@/models/bookModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;
    try {
        const result = await Book.findByIdAndDelete(id);
        if (!result) {
            return NextResponse.json({ message: "Book not found" }, { status: 404 });
        }
        return NextResponse.json({ message: "Book deleted successfully" });
    } catch (error: any) {
        return NextResponse.json({ message: "Error deleting book" }, { status: 500 });
    }
}
