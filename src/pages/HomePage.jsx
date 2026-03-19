import { useContext, useEffect, useState } from "react";
import NoteSearch from "../components/NoteSearch";
import NoteList from "../components/NoteList";
import { useSearchParams } from "react-router-dom";
import { getNotes } from "../utils/api";
import LocaleContext from "../contexts/LocaleContext";

const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [notes, setNotes] = useState([]);
  const [initializing, setInitializing] = useState(true);
  const [keyword, setKeyword] = useState(() => {
    return searchParams.get("keyword") || "";
  });
  const { locale } = useContext(LocaleContext);

  useEffect(() => {
    async function fetchNotes() {
      const { error, data } = await getNotes();

      if (!error) {
        setNotes(data);
      }
      setInitializing(false);
    }
    fetchNotes();
  }, []);

  function onSearchNoteHandler(keyword) {
    setKeyword(keyword);
    setSearchParams({ keyword });
  }

  const filteredNotes = notes.filter((note) => {
    return note.title.toLowerCase().includes(keyword.toLowerCase());
  });

  if (initializing) {
    return (
      <div className="container mx-auto px-4 py-8 text-text-main text-center">
        {locale === "id" ? "Menyiapkan catatan..." : "Preparing notes..."}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <NoteSearch
        title={locale === "id" ? "Catatan Aktif" : "Active Notes"}
        keyword={keyword}
        keywordChange={onSearchNoteHandler}
      />{" "}
      <NoteList notes={filteredNotes} />
    </div>
  );
};

export default HomePage;
