import { Link } from "react-router-dom";

function Card({ product }) {
  return (
    <div className="border-2 border-black p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white flex flex-col justify-between">
      <div>
        <div className="w-full h-64 bg-gray-100 border-2 border-black mb-4 overflow-hidden flex items-center justify-center">
          {product.imgUrl ? (
            <img src={product.imgUrl} alt={product.name} className="w-full h-full object-cover" />
          ) : (
            <span className="font-black opacity-40">[ NO IMAGE ]</span>
          )}
        </div>
        <h2 className="text-2xl font-black mb-1 uppercase truncate">{product.name}</h2>
        <p className="text-xs font-bold opacity-50 uppercase mb-4">
          {product.Category?.name || "General"}
        </p>
      </div>
      <div className="flex justify-between items-center mt-4">
        <span className="text-xl font-black">
          Rp {Number(product.price).toLocaleString("id-ID")}
        </span>
        <Link to={`/detail/${product.id}`} className="bg-black text-white px-6 py-2 font-black border-2 border-black hover:bg-white hover:text-black transition-all text-sm uppercase">VIEW</Link>
      </div>
    </div>
  );
}

export default Card;