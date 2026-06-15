import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="flex justify-between items-center py-6 border-b-4 border-black mb-12 bg-white">
      <h1 className="text-4xl font-black italic tracking-tighter">
        <Link to="/">BRANDED THINGS</Link>
      </h1>
      <div className="flex items-center gap-8 font-black text-sm tracking-wider uppercase">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/login" className="bg-black text-white px-4 py-2 border-2 border-black hover:bg-white hover:text-black transition-all font-black text-xs">LOGIN</Link>
      </div>
    </nav>
  );
}

export default Navbar;