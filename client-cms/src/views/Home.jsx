import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../constant/url";
import Navbar from "../components/Navbar";
import Card from "../components/Card";

function Home() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("asc"); 
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, [navigate]);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL.PRODUCTS);
      const jsonData = await response.json();

      if (response.ok) {
        if (jsonData && jsonData.data) {
          if (Array.isArray(jsonData.data)) {
            setProducts(jsonData.data);
          } else if (jsonData.data.products && Array.isArray(jsonData.data.products)) {
            setProducts(jsonData.data.products); 
          }
        } else if (Array.isArray(jsonData)) {
          setProducts(jsonData);
        }
      }
    } catch (error) {
      console.error("Gagal memuat data katalog:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    const initHome = async () => {
      if (isMounted) {
        await fetchProducts();
      }
    };
    initHome();
    return () => {
      isMounted = false;
    };
  }, [fetchProducts]);

  const filteredProducts = products.filter((prod) => {
    const productName = prod.name || "";
    const matchesSearch = productName.toLowerCase().includes(search.toLowerCase());
    
    const matchesCategory = categoryFilter
      ? prod.categoryId && String(prod.categoryId) === String(categoryFilter)
      : true;

    return matchesSearch && matchesCategory;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const nameA = a.name ? a.name.toLowerCase() : "";
    const nameB = b.name ? b.name.toLowerCase() : "";
    return sortOrder === "asc" ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
  });

  const itemsPerPage = 10;
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedProducts = sortedProducts.slice(startIndex, startIndex + itemsPerPage);

  // Fungsi Delete Bawaan Kodemu
  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        const baseUrl = API_URL.LOGIN.replace("/apis/auth/login", "");
        const deleteUrl = `${baseUrl}/apis/products/products/${id}`;

        const response = await fetch(deleteUrl, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
          },
        });

        if (response.ok) {
          alert("Product successfully deleted!");
          setProducts((prevProducts) => prevProducts.filter((prod) => prod.id !== id));
        } else {
          const errData = await response.json();
          alert(`Failed to delete: ${errData.message || "You are not authorized"}`);
        }
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20 font-black uppercase tracking-widest opacity-40 animate-pulse text-black">
        Loading Admin Catalog...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-black font-sans">
      <Navbar />
      
      <div className="p-6 max-w-7xl mx-auto">
        <div className="bg-white border-4 border-black p-4 mb-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col md:flex-row gap-4 justify-between items-center box-border">
          <div className="w-full md:w-1/3">
            <label className="block text-[10px] font-black uppercase mb-1 tracking-wider">Search Product</label>
            <input 
              type="text"
              placeholder="Type name here..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1); 
              }}
              className="w-full border-2 border-black p-2 font-bold focus:outline-none text-sm placeholder-gray-400"
            />
          </div>
          <div className="w-full md:w-1/4">
            <label className="block text-[10px] font-black uppercase mb-1 tracking-wider">Filter Category</label>
            <select
              value={categoryFilter}
              onChange={(e) => {
                setCategoryFilter(e.target.value);
                setCurrentPage(1); 
              }}
              className="w-full border-2 border-black p-2 font-bold focus:outline-none bg-white text-sm"
            >
              <option value="">All Categories</option>
              <option value="1">1 - Clothing & Apparel</option>
              <option value="2">2 - Electronics & Gadgets</option>
              <option value="3">3 - Luxury Accessories</option>
            </select>
          </div>
          <div className="w-full md:w-1/4">
            <label className="block text-[10px] font-black uppercase mb-1 tracking-wider">Sort Alphabet</label>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="w-full border-2 border-black p-2 font-bold focus:outline-none bg-white text-sm"
            >
              <option value="asc">A - Z (Ascending)</option>
              <option value="desc">Z - A (Descending)</option>
            </select>
          </div>
        </div>
        <div className="mb-6">
          <h3 className="text-xl font-black uppercase tracking-tight">
            Inventory Management ({sortedProducts.length} Items Found)
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
          {displayedProducts.length === 0 ? (
            <div className="col-span-full text-center py-12 uppercase tracking-widest font-bold opacity-40">
              No items match your search criteria.
            </div>
          ) : (
            displayedProducts.map((prod) => (
              <Card 
                key={prod.id} 
                product={prod} 
                onDelete={handleDelete} 
                onRefresh={fetchProducts}
              />
            ))
          )}
        </div>
        {sortedProducts.length > 0 && (
          <div className="flex justify-center items-center gap-4 mt-8 mb-12">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`border-2 border-black px-4 py-2 font-black uppercase text-xs shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all ${
                currentPage === 1 ? "bg-gray-200 opacity-30 cursor-not-allowed shadow-none" : "bg-white hover:bg-gray-100 cursor-pointer"
              }`}
            >
              ◀️ Prev
            </button>
            <span className="font-mono font-black text-sm border-2 border-black bg-yellow-300 px-4 py-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              PAGE {currentPage} OF {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((prev) => (currentPage < totalPages ? prev + 1 : prev))}
              disabled={currentPage >= totalPages}
              className={`border-2 border-black px-4 py-2 font-black uppercase text-xs shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all ${
                currentPage >= totalPages ? "bg-gray-200 opacity-30 cursor-not-allowed shadow-none" : "bg-white hover:bg-gray-100 cursor-pointer"
              }`}
            >
              Next ▶️
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

export default Home;