function Button({ children, onClick, type = "button", className = "" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-black text-white px-4 py-2 font-black border-2 border-black uppercase text-xs tracking-wider transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-white hover:text-black cursor-pointer ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;