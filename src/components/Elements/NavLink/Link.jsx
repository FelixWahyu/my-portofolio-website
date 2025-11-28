function Link(props) {
  const { links, targets, children } = props;

  return (
    <a
      href={links}
      target={targets}
      rel="noopener noreferrer"
      className="relative inline-flex w-12 h-12 rounded-full border border-blue-500 items-center justify-center bg-gray-900 text-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)] hover:text-white hover:bg-blue-500 hover:shadow-[0_0_20px_rgba(59,130,246,0.8)] active:scale-95 transition-all duration-300"
    >
      {children}
    </a>
  );
}

export default Link;
