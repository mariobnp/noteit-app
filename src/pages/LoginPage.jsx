import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import LoginInput from "../components/LoginInput";
import Swal from "sweetalert2";
import { useContext } from "react";
import LocaleContext from "../contexts/LocaleContext";
import ThemeContext from "../contexts/ThemeContext"; 

const LoginPage = ({ loginSuccess }) => {
  const { loginHandler } = useAuth();
  const { locale } = useContext(LocaleContext);
  const { theme } = useContext(ThemeContext); 

  const swalBackground = theme === "dark" ? "#202124" : "#ffffff";
  const swalColor = theme === "dark" ? "#ffffff" : "#111827";

  async function onLoginHandler(user) {
    const { error, data, message } = await loginHandler(user);
    if (!error) {
      Swal.fire({
        icon: "success",
        title: locale === "id" ? "Berhasil Masuk!" : "Login Successful!",
        text:
          locale === "id"
            ? "Selamat datang kembali di NoteIt."
            : "Welcome back to NoteIt.",
        background: swalBackground, 
        color: swalColor, 
        timer: 1500,
        showConfirmButton: false,
      });
      loginSuccess(data);
    } else {
      Swal.fire({
        icon: "error",
        title: locale === "id" ? "Gagal Masuk" : "Login Failed",
        text:
          message ||
          (locale === "id"
            ? "Email atau password salah."
            : "Invalid email or password."),
        background: swalBackground, 
        color: swalColor, 
        confirmButtonColor: "#ef4444",
      });
    }
  }

  return (
    <section className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md p-8 bg-bg-card border border-border-main rounded-2xl shadow-lg transition-all duration-300">
        <h2 className="text-3xl font-bold text-center mb-8 text-text-main">
          {locale === "id" ? "Masuk ke NoteIt" : "Login to NoteIt"}
        </h2>

        <LoginInput onLogin={onLoginHandler} />

        <p className="text-center text-text-muted text-sm mt-6">
          {locale === "id" ? "Belum punya akun?" : "Don't have an account?"}{" "}
          <Link
            to="/register"
            className="text-blue-500 font-semibold hover:underline"
          >
            {locale === "id" ? "Daftar di sini" : "Register here"}
          </Link>
        </p>
      </div>
    </section>
  );
};

export default LoginPage;
