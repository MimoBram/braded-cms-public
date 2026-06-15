import { useNavigate, Link } from "react-router-dom";
import { API_URL } from "../constant/url";
import Navbar from "../components/Navbar";
import ProductForm from "../components/ProductForm";

function AddProduct() {
  const navigate = useNavigate();

  const handleAddSubmit = async (formData) => {
    try {
      const baseUrl = API_URL.LOGIN.replace("/apis/auth/login", "");
      const adminAddUrl = `${baseUrl}/apis/products/products`;

      const cleanedData = {
        name: formData.name,
        description: formData.description,
        imgUrl: formData.imgUrl,
        price: Number(formData.price || 0),
        categoryId: formData.categoryId && formData.categoryId !== "" ? Number(formData.categoryId) : 1,
        stock: formData.stock ? Number(formData.stock) : 10
      };

      const token = localStorage.getItem("token") || "";

      const response = await fetch(adminAddUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(cleanedData),
      });

      const resData = await response.json();

      if (response.ok) {
        alert("Success adding new luxury product!");
        navigate("/dashboard");
      } else {
        console.log("Response error dari server:", resData);
        alert(`Failed to add: ${resData.error || resData.message || JSON.stringify(resData)}`);
      }
    } catch (error) {
      console.error("Error adding product:", error);
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
        <ProductForm 
          title="✨ Launch New Corporate Product" 
          onSubmit={handleAddSubmit} 
        />
      </div>
    </div>
  );
}

export default AddProduct;