"use client";

import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "../_components/Logo";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const Review = () => {
  const params = useSearchParams();
  const [data, setData] = useState<any>(null); // Initial state to null
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [update, setUpdate] = useState(false);
  const [updatedData, setUpdatedData] = useState({
    name: "",
    author: "",
    review: "",
    buy: "",
    description: "",
    languages: "",
    series: "",
    smallDescription: "",
    stars: "",
  });

  const deleteBookReview = async () => {
    const id = params.get("id");
    toast.promise(
      axios
        .post("/api/admin/deletebook", { id })
        .then((response) => {
          console.log(response.data.message);
          router.push("/allbooks");
        })
        .catch((error) => {
          console.log("Error deleting book review:", error);
          throw new Error("Error")
        }),
      {
        loading: "Delete request initiated",
        success: "Book review deleted successfully",
        error: "Error deleting review",
      }
    );
  };

  const updateBookReview = async () => {
    const id = params.get("id");
    toast.promise(
      axios
        .post("/api/admin/updatebook", { id, data: updatedData })
        .then((response) => {
          setData(response.data.data);
          setUpdate(false);
        })
        .catch((error) => {
          console.log("Error updating book review:", error);
          throw new Error("Error")
        }),
      {
        loading: "Update request initiated",
        success: "Book review updated successfully",
        error: "Error updating review",
      }
    );
  };

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
          id,
        });
        if(!response.data.success){
          router.push("/")
        }
        else{
        setData(response.data.data);
        setUpdatedData(response.data.data); 
        setError("");
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    gettingData();
  }, [params]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="font-poppins">
      <Logo />
      <h1 className="text-center">Book Review</h1>
      {data ? (
        <div>
          <div className="bg-white p-2 m-2 border-2 border-chocolate rounded-md">
            <p>
              <strong>Title:</strong> {data.name}
            </p>
            <p>
              <strong>Author:</strong> {data.author}
            </p>
            <p>
              <strong>Review:</strong> {data.review}
            </p>
            <p>
              <strong>Created On:</strong> {data.addedOn}
            </p>
            <p>
              <strong>Buy here:</strong> {data.buy}
            </p>
            <p>
              <strong>Description:</strong> {data.description}
            </p>
            <p>
              <strong>Languages:</strong> {data.languages}
            </p>
            <p>
              <strong>Likes:</strong> {data.likes}
            </p>
            <p>
              <strong>Series:</strong> {data.series}
            </p>
            <p>
              <strong>Small description:</strong> {data.smallDescription}
            </p>
            <p>
              <strong>Stars:</strong> {data.stars}
            </p>
            <p>
              <strong>Views:</strong> {data.views}
            </p>
          </div>
          <button
            className="bg-chocolate text-white p-2 m-2 rounded-md"
            onClick={deleteBookReview}
          >
            Delete Blog Review
          </button>
          <button
            className="bg-chocolate text-white p-2 m-2 rounded-md"
            onClick={() => setUpdate(!update)}
          >
            {update ? "Cancel Update" : "Update Blog Review"}
          </button>
          {update && (
            <div className="bg-white p-4 border-2 border-chocolate rounded-md m-2">
              <h2>Update Review</h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  updateBookReview();
                }}
              >
                <input
                  type="text"
                  placeholder="Title"
                  value={updatedData.name}
                  onChange={(e) =>
                    setUpdatedData({ ...updatedData, name: e.target.value })
                  }
                  className="block w-full p-2 mb-2 border"
                />
                <input
                  type="text"
                  placeholder="Author"
                  value={updatedData.author}
                  onChange={(e) =>
                    setUpdatedData({ ...updatedData, author: e.target.value })
                  }
                  className="block w-full p-2 mb-2 border"
                />
                <textarea
                  placeholder="Review"
                  value={updatedData.review}
                  onChange={(e) =>
                    setUpdatedData({ ...updatedData, review: e.target.value })
                  }
                  className="block w-full p-2 mb-2 border"
                ></textarea>
                <input
                  type="text"
                  placeholder="Buy link"
                  value={updatedData.buy}
                  onChange={(e) =>
                    setUpdatedData({ ...updatedData, buy: e.target.value })
                  }
                  className="block w-full p-2 mb-2 border"
                />
                <textarea
                  placeholder="Description"
                  value={updatedData.description}
                  onChange={(e) =>
                    setUpdatedData({
                      ...updatedData,
                      description: e.target.value,
                    })
                  }
                  className="block w-full p-2 mb-2 border"
                ></textarea>
                <input
                  type="text"
                  placeholder="Languages"
                  value={updatedData.languages}
                  onChange={(e) =>
                    setUpdatedData({ ...updatedData, languages: e.target.value })
                  }
                  className="block w-full p-2 mb-2 border"
                />
                <input
                  type="text"
                  placeholder="Series"
                  value={updatedData.series}
                  onChange={(e) =>
                    setUpdatedData({ ...updatedData, series: e.target.value })
                  }
                  className="block w-full p-2 mb-2 border"
                />
                <textarea
                  placeholder="Small Description"
                  value={updatedData.smallDescription}
                  onChange={(e) =>
                    setUpdatedData({
                      ...updatedData,
                      smallDescription: e.target.value,
                    })
                  }
                  className="block w-full p-2 mb-2 border"
                ></textarea>
                <input
                  type="text"
                  placeholder="Stars"
                  value={updatedData.stars}
                  onChange={(e) =>
                    setUpdatedData({ ...updatedData, stars: e.target.value })
                  }
                  className="block w-full p-2 mb-2 border"
                />
                <button
                  type="submit"
                  className="bg-chocolate text-white p-2 rounded-md"
                >
                  Submit Updates
                </button>
              </form>
            </div>
          )}
        </div>
      ) : (
        <div>No data available</div>
      )}
    </div>
  );
};

export default Review;
