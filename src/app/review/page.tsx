"use client";

import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "../_components/Logo";

const Review = () => {
  const params = useSearchParams();
  const [data, setData] = useState<any[any]>([]); // Handle null for better initialization
  const [error, setError] = useState(""); // Add error state
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const id = params.get("id");

    if (!id) {
      setError("No ID provided in query params");
      setLoading(false);
      return;
    }

    const gettingData = async () => {
      try {
        const response = await axios.post("/api/admin/readbook/", {
          id : id
        });
        setData(response.data.data); 
        setError(""); 
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch data. Please try again.");
      } finally {
        setLoading(false); // Stop loading in all cases
      }
    };

    gettingData();
  }, [params]); // Include params as a dependency

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="font-poppins">
      <Logo/>
      <h1 className="text-center">Book Review</h1>
      {data ? (
        <div>
        <div className="bg-white p-2 m-2 border-2 border-chocolate rounded-md">
          <p><strong>Title:</strong> {data.name}</p>
          <p><strong>Author:</strong> {data.author}</p>
          <p><strong>Review:</strong> {data.review}</p>
          <p><strong>Created On:</strong> {data.addedOn}</p>
          <p><strong>Buy here:</strong> {data.buy}</p>
          <p><strong>Description:</strong> {data.description}</p>
          <p><strong>Languages:</strong> {data.languages}</p>
          <p><strong>Likes:</strong> {data.likes}</p>
          <p><strong>Series:</strong> {data.series}</p>
          <p><strong>Small description:</strong> {data.smallDescription}</p>
          <p><strong>Stars:</strong> {data.stars}</p>
          <p><strong>Views:</strong> {data.views}</p>
        </div>
        <button className="bg-chocolate text-white p-2 m-2 rounded-md">Delete Blog Review</button>
        <button className="bg-chocolate text-white p-2 m-2 rounded-md">Update Blog Review</button>
        
        </div>
      ) : (
        <div>No data available</div>
      )}
    </div>
  );
};

export default Review;