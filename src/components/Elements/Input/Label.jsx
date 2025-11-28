function Label(props) {
  const { children, htmlfor } = props;

  return (
    <label
      htmlFor={htmlfor}
      className="block mb-1
        text-sm font-semibold
        text-blue-400
        drop-shadow-[0_0_4px_rgba(59,130,246,0.6)]"
    >
      {children}
    </label>
  );
}

export default Label;
