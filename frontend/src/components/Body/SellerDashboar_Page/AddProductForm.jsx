import React, { useEffect, useState } from "react";
import CATEGORY_LIST from "../../../data/CategoryNames";
import axios from "axios";
function AddProductForm() {
  const Backend_url = import.meta.env.VITE_BACKEND_URL;
  const [productName, setproductName] = useState("");
  const [ModelNo, setModelNo] = useState("");
  const [Price, setPrice] = useState("");
  const [Quantity, setQuantity] = useState("");
  const [Category, setCategory] = useState("");
  const [Desc, setDesc] = useState("");
  const [loading, setloading] = useState(false);
  const [Images, setImages] = useState([]);

  const handleOpenWidget = () => {
    if (Images.length >= 4) {
      alert("You can only upload a maximum of 4 images.");
      return;
    }
    const myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: "db2lak2ea", // Replace with your actual cloud name
        uploadPreset: "product_unsigned", // Replace with your unsigned preset name
        sources: [
          "local",
          //  "url",
          //  "camera"
        ], // Restrict where images come from
        multiple: true, // Set to true if you want multiple images
        maxFiles: 4,
        clientAllowedFormats: ["png"],
        cropping: true, // Allow users to crop the product image
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          console.log("Done! Here is the image info: ", result.info);
          const newImageData = {
            public_id: result.info.public_id,
            url: result.info.secure_url,
          };
          setImages((prev) => {
            // Double check to ensure we never exceed 4 even with multiple uploads
            if (prev.length >= 4) return prev;
            return [...prev, newImageData];
          });
        }
      },
    );
    myWidget.open();
  };
  const OnSubmit = async (e) => {
    e.preventDefault();
    setloading(true); // Disable button

    const productData = {
      productName: productName,
      modelNo: ModelNo,
      price: Number(Price), // Ensure numbers are sent as numbers
      description: Desc,
      category: Category,
      stock: Number(Quantity),
      images: Images,
    };

    try {
      const res = await axios.post(
        `${Backend_url}/api/products`,
        productData,
        { withCredentials: true }, // Important for Seller/Admin verification
      );

      if (res.status === 201 || res.status === 200) {
        alert("Product added successfully!");

        // 1. Clear all states to reset the form
        setproductName("");
        setModelNo("");
        setPrice("");
        setQuantity("");
        setCategory("");
        setDesc("");
        setImages([]); // Clear the Cloudinary image array
      }
    } catch (err) {
      console.error("Submission error:", err);
      alert(err.response?.data?.message || "Failed to add product");
    } finally {
      setloading(false); // Re-enable button
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-full p-4 overflow-y-auto">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full  border border-gray-200">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Add New Product
        </h2>

        <form className="space-y-1" onSubmit={OnSubmit}>
          {/* Row 1: Product Name & SKU */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="font-semibold mb-1">Product Name</label>
              <input
                type="text"
                value={productName}
                onChange={(e) => {
                  setproductName(e.target.value);
                }}
                placeholder="e.g. Wireless Headphones"
                maxLength="100"
                className="border rounded-md p-2 outline-none focus:ring-2 focus:ring-blue-400 border-gray-300"
              />
            </div>
            <div className="flex flex-col">
              <label className="font-semibold mb-1">Model Number</label>
              <input
                type="text"
                value={ModelNo}
                onChange={(e) => {
                  setModelNo(e.target.value);
                }}
                maxLength="20"
                placeholder="e.g. WH-1000XM4"
                className="border rounded-md p-2 outline-none focus:ring-2 focus:ring-blue-400 border-gray-300"
              />
            </div>
          </div>

          {/* Row 2: Price & Stock */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="font-semibold mb-1">Base Price (₹)</label>
              <input
                type="number"
                value={Price}
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
                placeholder="0.00"
                min="0"
                step="0.01"
                className="border rounded-md p-2 outline-none focus:ring-2 focus:ring-blue-400 border-gray-300"
              />
            </div>
            <div className="flex flex-col">
              <label className="font-semibold mb-1">Stock Quantity</label>
              <input
                type="number"
                placeholder="Quantity in hand"
                value={Quantity}
                onChange={(e) => {
                  setQuantity(e.target.value);
                }}
                min="1"
                step="1"
                className="border rounded-md p-2 outline-none focus:ring-2 focus:ring-blue-400 border-gray-300"
              />
            </div>
          </div>

          {/* Row 3: Full Width Category Select */}
          <div className="flex flex-col">
            <label className="font-semibold mb-1">Category</label>
            <select
              className="border rounded-md p-2 outline-none focus:ring-2 focus:ring-blue-400 border-gray-300 bg-white"
              value={Category}
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            >
              <option value="">Select Category</option>
              {CATEGORY_LIST.sort().map((cat, index) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Row 4: Image Upload Area */}
          <div className="flex flex-col">
            <label className="font-semibold mb-1">
              Product Images{" "}
              <span className="text-gray-400 font-normal">
                ({Images.length}/4 - PNG only)
              </span>
            </label>
          </div>
          <div className="flex flex-col gap-4">
            {/* 1. Preview Area */}
            <div className="flex flex-wrap gap-2">
              {Images.map((img, index) => (
                <div key={img.public_id} className="relative">
                  <img
                    src={img.url}
                    alt={`Preview ${index}`}
                    className="h-24 w-24 object-cover rounded-md border border-gray-200"
                  />
                  {/* Optional: Add a small remove button here later */}
                </div>
              ))}
            </div>

            {/* 2. The Upload Trigger Box */}
            {Images.length < 4 && (
              <div
                onClick={handleOpenWidget}
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 cursor-pointer transition"
              >
                <div className="text-gray-400 mb-2">
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </div>
                <p className="text-sm text-gray-600">
                  Click to upload product image ({Images.length}/4)
                </p>
              </div>
            )}
          </div>

          {/* Row 5: Description */}
          <div className="flex flex-col">
            <label className="font-semibold mb-1">
              Product Description{" "}
              <span className="text-right text-xs text-gray-500">
                {Desc.length} / 1000 characters
              </span>
            </label>
            <textarea
              rows="4"
              maxLength="1000"
              value={Desc}
              onChange={(e) => {
                setDesc(e.target.value);
              }}
              placeholder="Describe the features and specifications..."
              className="border rounded-md p-2 outline-none focus:ring-2 focus:ring-blue-400 border-gray-300 resize-none"
            ></textarea>
          </div>

          {/* Row 6: Toggles & Submit */}
          <div className="flex flex-col md:flex-row items-center justify-between mt-5">
            <button
              type="submit"
              disabled={loading}
              className={`${
                loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
              } text-white font-bold py-2 px-10 w-full rounded-lg transition-colors`}
            >
              {loading ? "Saving..." : "Save Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProductForm;
