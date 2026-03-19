import PropTypes from "prop-types";
import useInput from "../hooks/useInput";
import Button from "./Button";
import { useContext } from "react";
import LocaleContext from "../contexts/LocaleContext";

const RegisterInput = ({ onRegister }) => {
  const [name, handleNameChange] = useInput("");
  const [email, handleEmailChange] = useInput("");
  const [password, handlePasswordChange] = useInput("");
  const { locale } = useContext(LocaleContext);

  const submitHandler = (event) => {
    event.preventDefault();

    onRegister({
      name,
      email,
      password,
    });
  };

  return (
    <form onSubmit={submitHandler} className="flex flex-col gap-5">
      <input
        type="text"
        placeholder={locale === "id" ? "Nama Lengkap" : "Full Name"}
        value={name}
        onChange={handleNameChange}
        /* Menggunakan warna dinamis */
        className="p-3 bg-bg-card border border-border-main rounded-lg text-text-main placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-blue-500 w-full transition-colors duration-300"
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={handleEmailChange}
        className="p-3 bg-bg-card border border-border-main rounded-lg text-text-main placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-blue-500 w-full transition-colors duration-300"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={handlePasswordChange}
        className="p-3 bg-bg-card border border-border-main rounded-lg text-text-main placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-blue-500 w-full transition-colors duration-300"
      />

      <Button
        type="submit"
        className="bg-transparent border border-blue-500 text-blue-500 py-3 rounded-lg font-bold hover:bg-blue-500 hover:text-white w-full flex justify-center mt-2 transition-colors duration-300"
      >
        {locale === "id" ? "Daftar" : "Register"}
      </Button>
    </form>
  );
};

RegisterInput.propTypes = {
  onRegister: PropTypes.func.isRequired,
};

export default RegisterInput;
