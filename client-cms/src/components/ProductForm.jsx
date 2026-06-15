import { useState, useEffect } from "react";

function ProductForm({ onSubmit, initialData = null, title = "Form Title" }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [categoryId, setCategoryId] = useState("");

  useEffect(() => {
    const fillFormData = () => {
      if (initialData) {
        setName(initialData.name || "");
        setDescription(initialData.description || "");
        setPrice(initialData.price || "");
        setImgUrl(initialData.imgUrl || "");
        setCategoryId(initialData.categoryId || "");
      }
    };

    fillFormData();
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ 
      name, 
      description, 
      price: Number(price), 
      imgUrl, 
      categoryId: Number(categoryId) 
    });
  };

  return (
    <div className="w-full max-w-lg border-4 border-black p-6 bg-white shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] mx-auto">
      <h2 className="text-2xl font-black uppercase tracking-tight border-b-4 border-black pb-2 mb-6 italic text-black">
        {title}
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 font-sans text-sm text-black">
        <div>
          <label className="block text-xs font-black uppercase mb-1">Product Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-2.5 border-2 border-black font-bold focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-black uppercase mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows="3"
            className="w-full p-2.5 border-2 border-black font-bold focus:outline-none resize-none"
          />
        </div>
        <div>
          <label className="block text-xs font-black uppercase mb-1">Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="w-full p-2.5 border-2 border-black font-bold focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-black uppercase mb-1">Image URL</label>
          <input
            type="url"
            value={imgUrl}
            onChange={(e) => setImgUrl(e.target.value)}
            className="w-full p-2.5 border-2 border-black font-bold focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-black uppercase mb-1">Category</label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            required
            className="w-full p-2.5 border-2 border-black font-bold bg-white focus:outline-none"
          >
            <option value="">-- Choose Category --</option>
            <option value="1">1 - Clothing</option>
            <option value="2">2 - Electronics</option>
            <option value="3">3 - Shoes</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-black text-white p-3 font-black border-2 border-black uppercase text-xs tracking-wider mt-2 hover:bg-yellow-300 hover:text-black transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] cursor-pointer"
        >
          Submit Product Configuration
        </button>
      </form>
    </div>
  );
}

export default ProductForm;