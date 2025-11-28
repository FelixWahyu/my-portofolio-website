import Input from "./Input";
import Label from "./Label";

function InputForm(props) {
  const { type, label, name } = props;

  return (
    <div className="mb-4">
      <Label htmlFor={name}>{label}</Label>
      <Input type={type} id={name} name={name}></Input>
    </div>
  );
}

export default InputForm;
