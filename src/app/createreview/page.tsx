"use client"
import { useState } from "react";
import axios from "axios";

export default function Book() {
  const [formData, setFormData] = useState({
    name: "",
    author: "",
    description: "",
    smallDescription: "",
    review: "",
    stars: "",
    series: "",
    buy: "",
    languages: "",
  });

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/admin/createbook", formData);
      console.log(response.data.message)
      // Optionally reset form data or redirect
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  return (
    <div>
      <h1>Add a New Book</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Author:
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Small Description:
          <input
            type="text"
            name="smallDescription"
            value={formData.smallDescription}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Review:
          <textarea
            name="review"
            value={formData.review}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Stars:
          <input
            type="number"
            name="stars"
            value={formData.stars}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Series:
          <input
            type="text"
            name="series"
            value={formData.series}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Buy Link:
          <input
            type="text"
            name="buy"
            value={formData.buy}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Languages:
          <input
            type="text"
            name="languages"
            value={formData.languages}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
}
