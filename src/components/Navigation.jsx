import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FiHome,
  FiArchive,
  FiPlus,
  FiLogOut,
  FiLogIn,
  FiMoon,
  FiSun,
  FiUserPlus,
} from "react-icons/fi";
import { MdLanguage } from "react-icons/md";
import ThemeContext from "../contexts/ThemeContext";
import LocaleContext from "../contexts/LocaleContext";
import PropTypes from "prop-types";

const Navigation = ({ name, logout }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { locale, toggleLocale } = useContext(LocaleContext);
  const location = useLocation();

  const isActionsVisible = name !== null && logout !== null;

  const iconClass =
    "text-2xl hover:text-blue-500 transition-colors duration-200 flex items-center justify-center";

  return (
    <nav className="flex items-center justify-between w-full">
      <ul className="flex items-center gap-5">
        <li>
          <button
            onClick={toggleLocale}
            className="flex items-center gap-1.5 text-2xl hover:text-blue-500 transition-colors duration-200"
            title={locale === "id" ? "Ubah Bahasa" : "Change Language"}
          >
            <MdLanguage />
            <span className="text-sm font-bold uppercase text-text-muted">
              {locale}
            </span>
          </button>
        </li>
        <li>
          <button
            onClick={toggleTheme}
            className={`${iconClass} hover:text-yellow-500`}
            title={locale === "id" ? "Ubah Tema" : "Change Theme"}
          >
            {theme === "dark" ? <FiSun /> : <FiMoon />}
          </button>
        </li>
      </ul>

      <ul className="flex items-center gap-6">
        {isActionsVisible ? (
          <>
            <li>
              <Link
                className={iconClass}
                title={locale === "id" ? "Beranda" : "Home"}
                to="/"
              >
                <FiHome />
              </Link>
            </li>
            <li>
              <Link
                to="/archive"
                className={iconClass}
                title={locale === "id" ? "Arsip" : "Archive"}
              >
                <FiArchive />
              </Link>
            </li>
            <li>
              <Link
                className={iconClass}
                title={locale === "id" ? "Tambah Catatan" : "Add Note"}
                to="/notes/new"
              >
                <FiPlus />
              </Link>
            </li>
            <li>
              <button
                onClick={logout}
                className="flex items-center gap-2.5 hover:text-red-500 transition-colors duration-200 border border-border-main px-4 py-1.5 rounded-full bg-bg-card"
                title={locale === "id" ? "Keluar" : "Logout"}
              >
                <span className="text-sm font-medium text-text-main capitalize">
                  {name}
                </span>
                <FiLogOut className="text-xl text-red-500" />
              </button>
            </li>
          </>
        ) : (
          <>
            {location.pathname !== "/" && (
              <li>
                <Link
                  to="/"
                  className={`${iconClass} text-sm gap-2`}
                  title="Login"
                >
                  <FiLogIn /> {locale === "id" ? "Masuk" : "Login"}
                </Link>
              </li>
            )}
            {location.pathname !== "/register" && (
              <li>
                <Link
                  to="/register"
                  className={`${iconClass} text-sm gap-2`}
                  title="Register"
                >
                  <FiUserPlus /> {locale === "id" ? "Daftar" : "Register"}
                </Link>
              </li>
            )}
          </>
        )}
      </ul>
    </nav>
  );
};

Navigation.propTypes = {
  logout: PropTypes.func,
  name: PropTypes.string,
};

Navigation.defaultProps = {
  logout: null,
  name: null,
};

export default Navigation;
