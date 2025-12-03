function Link(props) {
  const { links, targets, children, classname } = props;

  return (
    <a href={links} target={targets} rel="noopener noreferrer" className={`relative inline-flex ${classname} hover:text-white`}>
      {children}
    </a>
  );
}

export default Link;
