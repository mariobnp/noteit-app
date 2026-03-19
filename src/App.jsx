import { useEffect, useState, useMemo } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Navigation from "./components/Navigation";
import HomePage from "./pages/HomePage";
import AddPage from "./pages/AddPage";
import DetailPage from "./pages/DetailPage";
import ArchivePage from "./pages/ArchivePage";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { getUserLogged, putAccessToken } from "./utils/api";
import ThemeContext from "./contexts/ThemeContext";
import LocaleContext from "./contexts/LocaleContext";

const App = () => {
  const [authedUser, setAuthedUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "dark",
  );
  const [locale, setLocale] = useState(
    () => localStorage.getItem("locale") || "id",
  );

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "dark" ? "light" : "dark";
      localStorage.setItem("theme", newTheme);
      return newTheme;
    });
  };

  const toggleLocale = () => {
    setLocale((prevLocale) => {
      const newLocale = prevLocale === "id" ? "en" : "id";
      localStorage.setItem("locale", newLocale);
      return newLocale;
    });
  };

  const themeContextValue = useMemo(() => ({ theme, toggleTheme }), [theme]);
  const localeContextValue = useMemo(
    () => ({ locale, toggleLocale }),
    [locale],
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    async function fetchUser() {
      const { error, data } = await getUserLogged();
      if (!error) {
        setAuthedUser(data);
      }
      setInitializing(false);
    }
    fetchUser();
  }, []);

  const onLoginSuccess = async ({ accessToken }) => {
    putAccessToken(accessToken);
    const { data } = await getUserLogged();
    setAuthedUser(data);
  };

  const onLogout = () => {
    setAuthedUser(null);
    putAccessToken("");
  };

  if (initializing) {
    return (
      <div className="min-h-screen bg-bg-main text-text-main flex justify-center items-center">
        Loading...
      </div>
    );
  }

  const appClassName =
    "min-h-screen bg-bg-main text-text-main transition-colors duration-300";

  return (
    <ThemeContext.Provider value={themeContextValue}>
      <LocaleContext.Provider value={localeContextValue}>
        <div className={appClassName}>
          <header className="p-5 border-b border-border-main bg-bg-card sticky top-0 z-50 transition-colors">
            <div className="container mx-auto flex justify-between items-center gap-6">
              <Link to="/">
                <h1 className="font-[var(--font-logo)] text-3xl font-semibold text-text-main">
                  Note<span className="text-blue-600">It</span>
                </h1>
              </Link>
              <Navigation
                logout={authedUser ? onLogout : null}
                name={authedUser ? authedUser.name : null}
              />
            </div>
          </header>

          <main>
            {authedUser === null ? (
              <Routes>
                <Route
                  path="/*"
                  element={<LoginPage loginSuccess={onLoginSuccess} />}
                />
                <Route path="/register" element={<RegisterPage />} />
              </Routes>
            ) : (
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/archive" element={<ArchivePage />} />
                <Route path="/notes/new" element={<AddPage />} />
                <Route path="/notes/:id" element={<DetailPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            )}
          </main>
        </div>
      </LocaleContext.Provider>
    </ThemeContext.Provider>
  );
};

export default App;
