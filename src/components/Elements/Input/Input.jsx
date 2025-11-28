function Input(props) {
  const { names, type, id, placeHolder } = props;

  return (
    <input
      type={type}
      name={names}
      id={id}
      placeholder={placeHolder}
      className="w-full p-2
        bg-gray-200/50
        border border-blue-500/40
        rounded-lg
        shadow-[0_0_10px_rgba(59,130,246,0.3)]
        backdrop-blur-md
        transition-all duration-300
        focus:outline-none
        focus:border-blue-500
        focus:shadow-[0_0_20px_rgba(59,130,246,0.7)]"
    />
  );
}

export default Input;
