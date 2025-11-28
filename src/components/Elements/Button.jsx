function Button(props) {
  const { children, type } = props;

  return (
    <button
      type={type}
      className="relative inline-flex items-center justify-center px-4 py-2 font-semibold rounded-lg bg-gray-900 text-blue-400 border border-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.4)] transition-all duration-300 hover:text-white hover:bg-blue-600 hover:shadow-[0_0_20px_rgba(59,130,246,0.8)] active:scale-95"
    >
      {children}
    </button>
  );
}

export default Button;
