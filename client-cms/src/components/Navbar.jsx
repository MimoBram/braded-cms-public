import { useNavigate, Link } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="flex justify-between items-center bg-white border-b-4 border-black px-6 py-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sticky top-0 z-50">
      <Link to="/dashboard" className="no-underline text-black">
        <h1 className="text-xl font-black uppercase tracking-tighter italic m-0">
          ⚡ BRANDED CMS
        </h1>
      </Link>
      <div className="flex items-center gap-4">
        <Link 
          to="/add" 
          className="bg-yellow-300 text-black px-4 py-2 font-black border-2 border-black text-xs uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:text-yellow-300 transition-all no-underline"
        >
          + Add Product
        </Link>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 font-black border-2 border-black text-xs uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-white hover:text-black transition-all cursor-pointer"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;