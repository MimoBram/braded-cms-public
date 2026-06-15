import { useState } from "react";
import { Link } from "react-router-dom";

function Card({ product, onDelete, onRefresh }) {
  const [currentImgUrl, setCurrentImgUrl] = useState(product.imgUrl);
  const [prevImgUrl, setPrevImgUrl] = useState(product.imgUrl);

  if (product.imgUrl !== prevImgUrl) {
    setCurrentImgUrl(product.imgUrl);
    setPrevImgUrl(product.imgUrl);
  }
  
  const handleImageChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
    if (!allowedExtensions.exec(selectedFile.name)) {
      alert("Format berkas ditolak! Server hanya menerima berkas gambar berformat .jpg, .jpeg, atau .png murni.");
      e.target.value = ""; 
      return;
    }

    const maxSizeInBytes = 200 * 1024; 
    if (selectedFile.size > maxSizeInBytes) {
      alert("Ukuran berkas terlalu besar! Silakan gunakan foto lain yang ukurannya di bawah 200 KB.");
      e.target.value = ""; 
      return;
    }

    const localPreviewUrl = URL.createObjectURL(selectedFile);
    setCurrentImgUrl(localPreviewUrl);

    const formData = new FormData();
    
    formData.append("file", selectedFile);

    try {
      const uploadUrl = `https://api.p2.gc01aio.foxhub.space/apis/products/products/${product.id}`;

      console.log("-> Menembak berkas biner form-data bersih ke rute resmi:", uploadUrl);

      const response = await fetch(uploadUrl, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
        body: formData, 
      });

      const resData = await response.json();
      console.log("=== RESPON RESMI SERVER BACKEND ===", resData);

      if (response.ok) {
        alert("Product image successfully saved and synced to database!");
        
        const dataProduk = resData.data || resData;
        const serverImgUrl = dataProduk.imgUrl || dataProduk.imageUrl || dataProduk.image;
        
        if (serverImgUrl) {
          setCurrentImgUrl(serverImgUrl);
        }

        if (onRefresh) onRefresh(); 
      } else {
        setCurrentImgUrl(product.imgUrl);
        alert(`Gagal mengunggah berkas: ${resData.message || JSON.stringify(resData)}`);
      }
    } catch (error) {
      console.error("Error pada upload file handler:", error);
      setCurrentImgUrl(product.imgUrl);
      alert("Network error, gagal terhubung dengan server pusat.");
    } finally {
      e.target.value = "";
    }
  };

  return (
    <div className="w-full h-full border-4 border-black p-4 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between font-sans text-black box-border">
      
      <div className="flex flex-col w-full">
        <div className="w-full h-48 border-2 border-black mb-4 overflow-hidden relative bg-gray-100 flex items-center justify-center box-border">
          {currentImgUrl ? (
            <img 
              src={currentImgUrl} 
              alt={product.name} 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = "https://placehold.co/600x400?text=No+Image+Found";
              }}
            />
          ) : (
            <span className="text-xs font-bold opacity-30 uppercase tracking-wider">No Image</span>
          )}
          <label className="absolute bottom-2 right-2 bg-yellow-400 hover:bg-yellow-500 border-2 border-black p-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] cursor-pointer active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all block z-30">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5 pointer-events-none">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
            </svg>
            <input 
              type="file" 
              accept=".jpg,.jpeg,.png" 
              onChange={handleImageChange} 
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
            />
          </label>
        </div>
        <div className="mb-4 w-full">
          <h4 className="text-lg font-black uppercase truncate mb-1">{product.name}</h4>
          <p className="text-xs text-gray-500 line-clamp-2 min-h-8 leading-relaxed">{product.description}</p>
          <div className="border-t-2 border-dashed border-black my-3"></div>
          <div className="flex justify-between items-center w-full">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Price</span>
            <span className="font-mono font-bold text-sm">Rp {product.price?.toLocaleString("id-ID")}</span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-1.5 w-full pt-2 mt-auto box-border">
        <Link 
          to={`/products/${product.id}`}
          className="bg-green-400 border-2 border-black py-2 px-1 text-center font-black uppercase text-[10px] tracking-tight shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-green-500 transition-colors truncate"
        >
          👁️ Detail
        </Link>
        <Link 
          to={`/edit/${product.id}`}
          className="bg-blue-400 border-2 border-black py-2 px-1 text-center font-black uppercase text-[10px] tracking-tight shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-blue-500 transition-colors truncate"
        >
          ✏️ Edit
        </Link>
        <button 
          type="button"
          onClick={() => onDelete(product.id)}
          className="bg-red-400 border-2 border-black py-2 px-1 text-center font-black uppercase text-[10px] tracking-tight shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-red-500 transition-colors cursor-pointer truncate"
        >
          🗑️ Delete
        </button>
      </div>
    </div>
  );
}

export default Card;