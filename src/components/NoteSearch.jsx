import React, { useContext } from "react";
import PropTypes from "prop-types";
import LocaleContext from "../contexts/LocaleContext";

const NoteSearch = ({ keyword, keywordChange, title }) => {
  const { locale } = useContext(LocaleContext);

  return (
    <div className="w-full mb-8">
      <h2 className="text-3xl font-bold mb-6 text-text-main">{title}</h2>
      <input
        className="w-full bg-bg-card border border-border-main rounded-xl py-4 px-6 text-text-main placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 shadow-sm"
        type="text"
        placeholder={
          locale === "id" ? "Cari berdasarkan judul..." : "Search by title..."
        }
        value={keyword}
        onChange={(event) => keywordChange(event.target.value)}
      />
    </div>
  );
};

NoteSearch.propTypes = {  
  keyword: PropTypes.string.isRequired,
  keywordChange: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default NoteSearch;
