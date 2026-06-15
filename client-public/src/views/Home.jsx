import { useState, useEffect } from "react";
import Card from "../components/Card";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchPublicProducts = async () => {
      try {
        const response = await fetch("https://api.p2.gc01aio.foxhub.space/apis/pub/products/products");
        const jsonData = await response.json();

        if (jsonData && jsonData.data) {
          const productData = jsonData.data.rows || jsonData.data;
          if (Array.isArray(productData)) {
            setProducts(productData);
          }
        }
      } catch (error) {
        console.error("Gagal mengambil data publik:", error);
      }
    };

    fetchPublicProducts();
  }, []);

  return (
    <div>
      <header className="mb-12">
        <h2 className="text-5xl font-black uppercase tracking-tighter">OUR CATALOGUE</h2>
        <p className="text-sm font-bold opacity-60 uppercase mt-1">EXPLORE PREMIUM BRANDED ITEMS</p>
      </header>

      {products.length === 0 ? (
        <div className="text-center py-20 font-black uppercase tracking-widest opacity-40">
          Loading products from server...
        </div>
      ) : (
        <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {products.map((product) => (
            <Card key={product.id} product={product} />
          ))}
        </main>
      )}
    </div>
  );
}

export default Home;