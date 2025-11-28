function Input(props) {
  const { names, type, id } = props;

  return <input type={type} name={names} id={id} className="w-full p-2 border border-gray-300 shadow-sm rounded-lg" />;
}

export default Input;
