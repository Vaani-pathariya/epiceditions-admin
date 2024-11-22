"use client"
import { useState } from "react";
import axios from "axios";
import Logo from "../_components/Logo";
import toast from "react-hot-toast";

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
    toast.promise(
      axios.post("/api/admin/createbook",formData).then((response)=>{
        console.log(response.data.message);
      }).catch((error)=>{
        console.log("Book review saving failed",error.message);
      }),{
      loading :"Initiated book review request",
      success:"Book review saved successfully",
      error:"Error saving book review"
    })
  };

  return (
    <div className="text-center font-poppins">
      <Logo/>
      <h1 className="mb-3 text-2xl">Add a New Book</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name<br></br>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="bg-white w-1/2 p-1 border-2 border-chocolate rounded-md"
          />
        </label>
        <br />
        <label>
          Author<br></br>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
            className="bg-white w-1/2 p-1 border-2 border-chocolate rounded-md"
          />
        </label>
        <br />
        <label>
          Description<br></br>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="bg-white w-1/2 p-1 border-2 border-chocolate rounded-md"
          />
        </label>
        <br />
        <label>
          Small Description<br></br>
          <input
            type="text"
            name="smallDescription"
            value={formData.smallDescription}
            onChange={handleChange}
            className="bg-white w-1/2 p-1 border-2 border-chocolate rounded-md"
          />
        </label>
        <br />
        <label>
          Review<br></br>
          <textarea
            name="review"
            value={formData.review}
            onChange={handleChange}
            className="bg-white w-1/2 p-1 border-2 border-chocolate rounded-md"
          />
        </label>
        <br />
        <label>
          Stars<br></br>
          <input
            type="number"
            name="stars"
            value={formData.stars}
            onChange={handleChange}
            className="bg-white w-1/2 p-1 border-2 border-chocolate rounded-md"
          />
        </label>
        <br />
        <label>
          Series<br></br>
          <input
            type="text"
            name="series"
            value={formData.series}
            onChange={handleChange}
            className="bg-white w-1/2 p-1 border-2 border-chocolate rounded-md"
          />
        </label>
        <br />
        <label>
          Buy Link<br></br>
          <input
            type="text"
            name="buy"
            value={formData.buy}
            onChange={handleChange}
            className="bg-white w-1/2 p-1 border-2 border-chocolate rounded-md"
          />
        </label>
        <br />
        <label>
          Languages<br></br>
          <input
            type="text"
            name="languages"
            value={formData.languages}
            onChange={handleChange}
            className="bg-white w-1/2 p-1 border-2 border-chocolate rounded-md"
          />
        </label>
        <br />
        <button type="submit" className="bg-chocolate text-white p-2 rounded-md my-4 ">Add Book</button>
      </form>
    </div>
  );
}
