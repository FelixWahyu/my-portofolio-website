import Input from "./Input";
import Label from "./Label";

function InputForm(props) {
  const { type, label, name, textHolder } = props;

  return (
    <div className="mb-4">
      <Label htmlfor={name}>{label}</Label>
      <Input type={type} id={name} name={name} placeHolder={textHolder}></Input>
    </div>
  );
}

export default InputForm;
