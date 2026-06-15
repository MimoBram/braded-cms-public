import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { API_URL } from "../constant/url";
import Navbar from "../components/Navbar";
import ProductForm from "../components/ProductForm";

function EditProduct() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    const fetchOldProduct = async () => {
      try {
        const baseUrl = API_URL.LOGIN.replace("/apis/auth/login", "");
        const response = await fetch(`${baseUrl}/apis/products/products/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
          },
        });
        const jsonData = await response.json();
        if (response.ok) {
          setInitialData(jsonData.data || jsonData);
        }
      } catch (error) {
        console.error("Gagal memuat data lama produk:", error);
      }
    };
    fetchOldProduct();
  }, [id]);

  const handleEditSubmit = async (formData) => {
    try {
      const baseUrl = API_URL.LOGIN.replace("/apis/auth/login", "");
      
      const adminUpdateUrl = `${baseUrl}/apis/products/products/${id}`;

      const cleanedData = {
        name: formData.name,
        description: formData.description,
        imgUrl: formData.imgUrl,
        price: Number(formData.price || 0),
        categoryId: formData.categoryId && formData.categoryId !== "" ? Number(formData.categoryId) : 1,
        stock: formData.stock ? Number(formData.stock) : 10
      };

      console.log("-> Menembak PUT ke URL:", adminUpdateUrl);
      console.log("-> Payload Update Bersih:", cleanedData);

      const response = await fetch(adminUpdateUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
        body: JSON.stringify(cleanedData),
      });

      const resData = await response.json();

      if (response.ok) {
        alert("Success updating product configuration!");
        navigate("/dashboard");
      } else {
        console.log("Response error dari server:", resData);
        alert(`Failed to update product: ${resData.message || JSON.stringify(resData)}`);
      }
    } catch (error) {
      console.error("Error updating product:", error);
      alert("An error occurred on the client side.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-black font-sans">
      <Navbar />
      <div className="p-6">
      <Link to="/dashboard" className="inline-block mb-6 bg-white border-2 border-black p-2 font-black uppercase text-xs shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-gray-100 transition-all">
        ⬅️ Back to Dashboard
      </Link>
        {initialData ? (
          <ProductForm 
            title="✏️ Edit Product Configuration" 
            onSubmit={handleEditSubmit} 
            initialData={initialData}
          />
        ) : (
          <div className="text-center py-10 font-bold animate-pulse">Loading Product Data...</div>
        )}
      </div>
    </div>
  );
}

export default EditProduct;