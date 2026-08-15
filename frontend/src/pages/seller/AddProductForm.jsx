import React, { useState } from "react";
import axios from "axios";
import { CategoryListData } from "../../data/CategoryList.data";

function AddProductForm() {
  const Backend_url = import.meta.env.VITE_BACKEND_URL;
  const [productName, setproductName] = useState("");
  const [ModelNo, setModelNo] = useState("");
  const [Price, setPrice] = useState("");
  const [Quantity, setQuantity] = useState("");
  const [Category, setCategory] = useState("");
  const [Desc, setDesc] = useState("");
  const [DiscountPercent, setDiscountPercent] = useState("");
  const [loading, setloading] = useState(false);
  const [Images, setImages] = useState([]);

  const handleOpenWidget = () => {
    if (Images.length >= 4) {
      alert("You can only upload a maximum of 4 images.");
      return;
    }
    const myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: "db2lak2ea",
        uploadPreset: "product_unsigned",
        sources: ["local"],
        multiple: true,
        maxFiles: 4,
        clientAllowedFormats: ["png"],
        cropping: true,
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          console.log("Done! Here is the image info: ", result.info);
          const newImageData = {
            public_id: result.info.public_id,
            url: result.info.secure_url,
          };
          setImages((prev) => {
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
    setloading(true);

    const productData = {
      productName: productName,
      modelNo: ModelNo,
      price: Number(Price),
      description: Desc,
      category: Category,
      stock: Number(Quantity),
      images: Images,
      discount_percentage: Number(DiscountPercent),
    };

    try {
      const res = await axios.post(`${Backend_url}/api/products`, productData, {
        withCredentials: true,
      });

      if (res.status === 201 || res.status === 200) {
        alert("Product added successfully!");

        setproductName("");
        setModelNo("");
        setPrice("");
        setQuantity("");
        setDiscountPercent("");
        setCategory("");
        setDesc("");
        setImages([]);
      }
    } catch (err) {
      console.error("Submission error:", err);
      alert(err.response?.data?.message || "Failed to add product");
    } finally {
      setloading(false);
    }
  };

  return (
    <div className="flex h-full w-full items-start justify-center overflow-y-auto">
      <div className="w-full rounded-xl border border-neutral-200 bg-white p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500">
          Inventory
        </p>
        <h2 className="mt-1 text-2xl font-semibold text-neutral-900">
          Add new product
        </h2>

        <form className="mt-7 space-y-6" onSubmit={OnSubmit}>
          {/* Row 1: Product Name & Model No */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="flex flex-col">
              <label className="mb-1.5 text-sm font-medium text-neutral-700">
                Product name
              </label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setproductName(e.target.value)}
                placeholder="e.g. Wireless Headphones"
                maxLength="100"
                className="rounded-lg border border-neutral-300 p-2.5 text-sm text-neutral-900 outline-none transition focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-1.5 text-sm font-medium text-neutral-700">
                Model number
              </label>
              <input
                type="text"
                value={ModelNo}
                onChange={(e) => setModelNo(e.target.value)}
                maxLength="20"
                placeholder="e.g. WH-1000XM4"
                className="rounded-lg border border-neutral-300 p-2.5 text-sm text-neutral-900 outline-none transition focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
              />
            </div>
          </div>

          {/* Row 2: Price & Stock */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="flex flex-col">
              <label className="mb-1.5 text-sm font-medium text-neutral-700">
                Base price (₹)
              </label>
              <input
                type="number"
                value={Price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0.00"
                min="0"
                step="0.01"
                className="rounded-lg border border-neutral-300 p-2.5 text-sm text-neutral-900 outline-none transition focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-1.5 text-sm font-medium text-neutral-700">
                Stock quantity
              </label>
              <input
                type="number"
                placeholder="Quantity in hand"
                value={Quantity}
                onChange={(e) => setQuantity(e.target.value)}
                min="1"
                step="1"
                className="rounded-lg border border-neutral-300 p-2.5 text-sm text-neutral-900 outline-none transition focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
              />
            </div>
          </div>

          {/* Row 3: Category & Discount */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="flex flex-col">
              <label className="mb-1.5 text-sm font-medium text-neutral-700">
                Category
              </label>
              <select
                className="rounded-lg border border-neutral-300 bg-white p-2.5 text-sm text-neutral-900 outline-none transition focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
                value={Category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select category</option>
                {CategoryListData.slice()
                  .sort((a, b) => a.CategoryName.localeCompare(b.CategoryName))
                  .map((cat, index) => (
                    <option key={index} value={cat.CategoryName}>
                      {cat.CategoryName}
                    </option>
                  ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label className="mb-1.5 text-sm font-medium text-neutral-700">
                Discount %{" "}
                <span className="font-normal text-neutral-400">(optional)</span>
              </label>
              <input
                type="number"
                placeholder="0%"
                value={DiscountPercent}
                onChange={(e) => setDiscountPercent(e.target.value)}
                min="0"
                step="1"
                className="rounded-lg border border-neutral-300 p-2.5 text-sm text-neutral-900 outline-none transition focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
              />
            </div>
          </div>

          {/* Row 4: Image Upload */}
          <div className="flex flex-col gap-3">
            <label className="text-sm font-medium text-neutral-700">
              Product images{" "}
              <span className="font-normal text-neutral-400">
                ({Images.length}/4 · PNG only)
              </span>
            </label>

            {Images.length > 0 && (
              <div className="flex flex-wrap gap-3">
                {Images.map((img, index) => (
                  <img
                    key={img.public_id}
                    src={img.url}
                    alt={`Preview ${index}`}
                    className="h-24 w-24 rounded-lg border border-neutral-200 object-cover"
                  />
                ))}
              </div>
            )}

            {Images.length < 4 && (
              <div
                onClick={handleOpenWidget}
                className="flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-neutral-300 bg-neutral-50 p-8 transition hover:border-neutral-400 hover:bg-neutral-100"
              >
                <svg
                  className="mb-2 h-6 w-6 text-neutral-400"
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
                <p className="text-sm text-neutral-500">
                  Click to upload product image ({Images.length}/4)
                </p>
              </div>
            )}
          </div>

          {/* Row 5: Description */}
          <div className="flex flex-col">
            <div className="mb-1.5 flex items-baseline justify-between">
              <label className="text-sm font-medium text-neutral-700">
                Product description
              </label>
              <span className="text-xs text-neutral-400">
                {Desc.length} / 1000
              </span>
            </div>
            <textarea
              rows="4"
              maxLength="1000"
              value={Desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Describe the features and specifications…"
              className="resize-none rounded-lg border border-neutral-300 p-2.5 text-sm text-neutral-900 outline-none transition focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
            ></textarea>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full rounded-full py-3 text-sm font-semibold text-white transition ${
              loading
                ? "cursor-not-allowed bg-neutral-300"
                : "bg-neutral-900 hover:bg-neutral-800"
            }`}
          >
            {loading ? "Saving…" : "Save product"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddProductForm;
