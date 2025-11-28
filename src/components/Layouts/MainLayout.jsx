import Button from "../Elements/Button";

function LayoutMain(props) {
  const { children } = props;

  return (
    <div className="px-6 md:px-8 lg:px-12 h-screen flex items-center justify-left">
      <div className="max-w-5xl">{children}</div>
    </div>
  );
}

export default LayoutMain;
