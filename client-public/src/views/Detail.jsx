import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

function Detail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await fetch(`https://api.p2.gc01aio.foxhub.space/apis/pub/products/products/${id}`);
        const jsonData = await response.json();
        
        if (jsonData && jsonData.data) {
          setProduct(jsonData.data);
        }
      } catch (error) {
        console.error("Gagal mengambil detail produk:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center py-20 font-black uppercase tracking-widest opacity-40">
        Loading product detail...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-black uppercase mb-4">Product Not Found</h2>
        <Link to="/" className="bg-black text-white px-6 py-2 font-black border-2 border-black hover:bg-white hover:text-black transition-all text-sm uppercase">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="border-4 border-black p-6 md:p-10 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] bg-white max-w-4xl mx-auto mb-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="w-full h-96 bg-gray-100 border-2 border-black overflow-hidden flex items-center justify-center">
          {product.imgUrl ? (
            <img src={product.imgUrl} alt={product.name} className="w-full h-full object-cover" />
          ) : (
            <span className="font-black opacity-40">[ NO IMAGE ]</span>
          )}
        </div>
        <div className="flex flex-col justify-between">
          <div>
            <span className="bg-yellow-300 text-black px-3 py-1 text-xs font-black border-2 border-black uppercase tracking-wider inline-block mb-4">
              {product.Category?.name || "General"}
            </span>
            <h2 className="text-4xl font-black uppercase tracking-tight mb-2">{product.name}</h2>
            <p className="text-2xl font-black mb-6">
              Rp {Number(product.price).toLocaleString("id-ID")}
            </p>
            <div className="border-t-2 border-black pt-4">
              <h3 className="font-black text-sm uppercase mb-2 text-gray-500">Description</h3>
              <p className="font-bold text-sm leading-relaxed text-gray-800">
                {product.description || "No description available for this premium item."}
              </p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t-2 border-dashed border-gray-300 flex gap-4">
            <Link to="/" className="flex-1 text-center bg-white text-black py-3 font-black border-2 border-black hover:bg-black hover:text-white transition-all text-sm uppercase">
              Back to Catalogue
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detail;