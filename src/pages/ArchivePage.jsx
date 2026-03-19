import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import NoteSearch from "../components/NoteSearch";
import NoteList from "../components/NoteList";
import { getArchiveNotes } from "../utils/api";
import LocaleContext from "../contexts/LocaleContext";

const ArchivePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [notes, setNotes] = useState([]);
  const [initializing, setInitializing] = useState(true);
  const { locale } = useContext(LocaleContext);

  const [keyword, setKeyword] = useState(() => {
    return searchParams.get("keyword") || "";
  });

  useEffect(() => {
    async function fetchArchiveNotes() {
      const { error, data } = await getArchiveNotes();

      if (!error) {
        setNotes(data);
      }
      setInitializing(false);
    }

    fetchArchiveNotes();
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
      <div className="container px-4 py-8 text-white text-center">
        {locale === "id"
          ? "Menyiapkan catatan arsip..."
          : "Preparing archived notes..."}
      </div>
    );
  }

  return (
    <div className="container px-4 py-8">
      <NoteSearch
        title={locale === "id" ? "Catatan Arsip" : "Archived Notes"}
        keyword={keyword}
        keywordChange={onSearchNoteHandler}
      />
      <NoteList notes={filteredNotes} />
    </div>
  );
};

export default ArchivePage;
