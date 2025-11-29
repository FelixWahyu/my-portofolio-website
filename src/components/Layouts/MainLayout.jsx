import Button from "../Elements/Button";

function LayoutMain(props) {
  const { children } = props;

  return <div className="min-h-screen bg-white">{children}</div>;
}

export default LayoutMain;
