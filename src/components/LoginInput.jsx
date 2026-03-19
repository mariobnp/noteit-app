import Button from "./Button";
import useInput from "../hooks/useInput";
import PropTypes from "prop-types";
import { useContext } from "react";
import LocaleContext from "../contexts/LocaleContext";

const LoginInput = ({ onLogin }) => {
  const [email, handleEmailChange] = useInput("");
  const [password, handlePasswordChange] = useInput("");
  const { locale } = useContext(LocaleContext);

  const submitHandler = (event) => {
    event.preventDefault();

    onLogin({
      email,
      password,
    });
  };

  return (
    <form onSubmit={submitHandler} className="flex flex-col gap-5">
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
        className="bg-transparent border border-blue-500 text-blue-500 py-3 rounded-lg font-bold hover:bg-blue-500 hover:text-white w-full flex justify-center mt-2 transition-all duration-300"
      >
        {locale === "id" ? "Masuk" : "Login"}
      </Button>
    </form>
  );
};

LoginInput.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default LoginInput;
