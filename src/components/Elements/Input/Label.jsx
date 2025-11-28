function Label(props) {
  const { children, htmlfor } = props;

  return (
    <label htmlFor={htmlfor} className="text-sm font-semibold text-gray-800">
      {children}
    </label>
  );
}

export default Label;
