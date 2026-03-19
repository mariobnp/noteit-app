import { useContext } from "react";
import PropTypes from "prop-types";
import NoteItem from "./NoteItem";
import LocaleContext from "../contexts/LocaleContext";

const NoteList = ({ notes }) => {
  const { locale } = useContext(LocaleContext);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {notes.length > 0 ? (
        notes.map((note) => <NoteItem key={note.id} {...note} />)
      ) : (
        <p className="text-text-muted text-center col-span-full py-10 text-lg">
          {locale === "id" ? "Tidak ada catatan." : "No notes found."}
        </p>
      )}
    </div>
  );
};

NoteList.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default NoteList;
