import { useNavigate, Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import RegisterInput from "../components/RegisterInput";
import Swal from "sweetalert2";
import { useContext } from "react";
import LocaleContext from "../contexts/LocaleContext";
import ThemeContext from "../contexts/ThemeContext";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { registerHandler } = useAuth();
  const { locale } = useContext(LocaleContext);
  const { theme } = useContext(ThemeContext); 

  const swalBackground = theme === "dark" ? "#202124" : "#ffffff";
  const swalColor = theme === "dark" ? "#ffffff" : "#111827";

  async function onRegisterHandler(user) {
    const { error, message } = await registerHandler(user);
    if (!error) {
      Swal.fire({
        icon: "success",
        title:
          locale === "id"
            ? "Pendaftaran Berhasil!"
            : "Registration Successful!",
        text:
          locale === "id"
            ? "Akun kamu sudah aktif. Silakan login."
            : "Your account is active. Please login.",
        background: swalBackground, 
        color: swalColor,
        confirmButtonColor: "#3b82f6",
      });
      navigate("/");
    } else {
      Swal.fire({
        icon: "error",
        title: locale === "id" ? "Gagal Mendaftar" : "Registration Failed",
        text:
          message ||
          (locale === "id"
            ? "Terjadi kesalahan pada server."
            : "A server error occurred."),
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
          {locale === "id" ? "Daftar Akun Baru" : "Register New Account"}
        </h2>

        <RegisterInput onRegister={onRegisterHandler} />

        <p className="text-center text-text-muted text-sm mt-6">
          {locale === "id" ? "Sudah punya akun?" : "Already have an account?"}{" "}
          <Link to="/" className="text-blue-500 font-semibold hover:underline">
            {locale === "id" ? "Masuk di sini" : "Login here"}
          </Link>
        </p>
      </div>
    </section>
  );
};

export default RegisterPage;
