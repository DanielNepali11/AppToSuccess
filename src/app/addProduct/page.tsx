"use client";
import React, { useState } from "react";

// Define the type for the product item
type ProductItem = {
  name: string;
  newPrice: string;
  oldPrice: string;
  description: string;
  imageName: string;
};

function AddProduct() {
  const [list, setList] = useState<ProductItem[]>([]);
  const [newItem, setNewItem] = useState<ProductItem>({
    name: "",
    newPrice: "",
    oldPrice: "",
    description: "",
    imageName: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    setList([...list, newItem]);
    setNewItem({
      name: "",
      newPrice: "",
      oldPrice: "",
      description: "",
      imageName: "",
    });
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setNewItem({ ...newItem, [name]: value });
  };

  const handleSubmitList = async () => {
    try {
      const response = await fetch("/api/addProduct", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ list }),
      });

      const data = await response.json();
      if (data.error) {
        setError(data.error);
      } else {
        setSuccess("List saved successfully!");
        setList([]);
      }
    } catch (error) {
      setError("Network error occurred.");
    }
  };

  return (
    <div>
      <h2>Add Products to List</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
      <form onSubmit={handleAddItem}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            type="text"
            id="name"
            name="name"
            value={newItem.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="newPrice">New Price</label>
          <input
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            type="number"
            id="newPrice"
            name="newPrice"
            value={newItem.newPrice}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="oldPrice">Old Price</label>
          <input
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            type="number"
            id="oldPrice"
            name="oldPrice"
            value={newItem.oldPrice}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="description"
            name="description"
            value={newItem.description}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="imageName">Image Name</label>
          <input
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            type="text"
            id="imageName"
            name="imageName"
            value={newItem.imageName}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Add Product</button>
      </form>
      {list.length > 0 && (
        <div>
          <h3>Products List</h3>
          <ul>
            {list.map((item, index) => (
              <li key={index}>
                {item.name} - {item.newPrice} (Old Price: {item.oldPrice})
              </li>
            ))}
          </ul>
          <button onClick={handleSubmitList}>Submit List</button>
        </div>
      )}
    </div>
  );
}

export default AddProduct;
