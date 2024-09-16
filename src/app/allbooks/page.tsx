"use client";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Allbooks() {
    const [books, setBooks] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const gettingData = async () => {
            try {
                const response = await axios.post("/api/admin/allbookdetails", {});
                setBooks(response.data.data);
            } catch (error: any) {
                setError("Error encountered while fetching books.");
                console.log("Error encountered ", error);
            } finally {
                setLoading(false);
            }
        };
        gettingData();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>Find all the books here</h1>
            {books.length === 0 ? (
                <p>No books available.</p>
            ) : (
                <ul>
                    {books.map((book) => (
                        <li key={book._id}>
                            <h2>{book.name}</h2>
                            <p><strong>Author:</strong> {book.author}</p>
                            <p><strong>Description:</strong> {book.description}</p>
                            <p><strong>Small Description:</strong> {book.smallDescription}</p>
                            <p><strong>Review:</strong> {book.review}</p>
                            <p><strong>Stars:</strong> {book.stars}</p>
                            <p><strong>Series:</strong> {book.series}</p>
                            <p><strong>Buy Link:</strong> {book.buy}</p>
                            <p><strong>Languages:</strong> {book.languages}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
