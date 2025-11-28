import Button from "../components/Elements/Button";
import InputForm from "../components/Elements/Input/InputElement";

function Beranda() {
  return (
    <div className="max-w-md p-6 mx-auto border border-gray-300 shadow-md rounded-md mt-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Halaman Beranda</h2>
      <InputForm type="text" name="nama" label="Username" textHolder="Masukan Username"></InputForm>
    </div>
  );
}

export default Beranda;
