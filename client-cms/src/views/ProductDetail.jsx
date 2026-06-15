import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { API_URL } from "../constant/url";
import Navbar from "../components/Navbar";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        setLoading(true);
        const baseUrl = API_URL.LOGIN.replace("/apis/auth/login", "");
        
        const response = await fetch(`${baseUrl}/apis/products/products/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
          },
        });
        
        const jsonData = await response.json();
        
        if (response.ok) {
          setProduct(jsonData.data || jsonData);
        } else {
          console.error("Gagal memuat detail produk:", jsonData);
        }
      } catch (error) {
        console.error("Error fetching detail:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center py-20 font-black uppercase tracking-widest opacity-40 animate-pulse text-black">
        Loading Product Details...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-20 font-black uppercase text-black">
        Product not found. <Link to="/dashboard" className="underline text-blue-600">Back to Dashboard</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-black font-sans">
      <Navbar />
      
      <div className="p-6 max-w-4xl mx-auto my-8">
        <Link to="/dashboard" className="inline-block mb-6 bg-white border-2 border-black p-2 font-black uppercase text-xs shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-gray-100 transition-all">
          ⬅️ Back to Dashboard
        </Link>
        <div className="bg-white border-4 border-black p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="border-4 border-black h-80 overflow-hidden bg-gray-100 flex items-center justify-center">
            {product.imgUrl ? (
              <img src={product.imgUrl} alt={product.name} className="w-full h-full object-cover" />
            ) : (
              <span className="text-xs font-bold opacity-30 uppercase">No Image</span>
            )}
          </div>
          <div className="flex flex-col justify-between">
            <div>
              {product.categoryId && (
                <span className="inline-block bg-black text-white text-[10px] font-black uppercase px-2 py-1 tracking-widest mb-2">
                  Category ID: {product.categoryId}
                </span>
              )}
              <h2 className="text-3xl font-black uppercase tracking-tight mb-4">{product.name || "No Name"}</h2>
              <div className="border-t-2 border-black my-2"></div>
              <p className="text-sm text-gray-600 font-medium leading-relaxed my-4">
                {product.description || "No description provided for this item."}
              </p>
            </div>
            <div className="border-2 border-black p-4 bg-gray-50 flex justify-between items-center font-mono">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Price</span>
              <span className="text-2xl font-black text-green-600">
                Rp {product.price ? product.price.toLocaleString("id-ID") : "0"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;