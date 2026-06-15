import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./views/Login";
import Home from "./views/Home";
import AddProduct from "./views/AddProduct";
import EditProduct from "./views/EditProduct";
import ProductDetail from "./views/ProductDetail";

function PatchImagePlaceholder() {
  return (
    <div className="p-12 font-sans text-center text-black">
      <div className="w-full max-w-md mx-auto border-4 border-black bg-white p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <h2 className="text-xl font-black uppercase tracking-tight mb-2">🖼️ Patch Image Gallery</h2>
        <p className="text-xs font-bold text-gray-400 uppercase mb-4">Under Construction</p>
        <div className="border-2 border-dashed border-black py-8 bg-gray-50 font-mono text-xs text-gray-500">
          Feature Coming Soon...
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Home />} />
        <Route path="/add" element={<AddProduct />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/edit/:id" element={<EditProduct />} />
        <Route path="/patch-image/:id" element={<PatchImagePlaceholder />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;