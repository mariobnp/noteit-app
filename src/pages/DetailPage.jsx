import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getDetailNote,
  archiveNote,
  unarchiveNote,
  deleteNote,
} from "../utils/api";
import { showFormattedDate } from "../utils";
import Button from "../components/Button";
import { FiArchive, FiTrash2, FiInbox, FiEdit } from "react-icons/fi";
import LocaleContext from "../contexts/LocaleContext";

const DetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const [initializing, setInitializing] = useState(true);
  const { locale } = useContext(LocaleContext);

  useEffect(() => {
    async function fetchNote() {
      const { error, data } = await getDetailNote(id);
      if (!error) {
        setNote(data);
      }
      setInitializing(false);
    }
    fetchNote();
  }, [id]);

  async function onArchiveNoteHandler() {
    if (note.archived) {
      await unarchiveNote(id);
    } else {
      await archiveNote(id);
    }
    navigate("/");
  }

  async function onDeleteNoteHandler() {
    await deleteNote(id);
    navigate("/");
  }

  if (initializing) {
    return (
      <section className="container mx-auto py-12 px-4 text-center text-text-main">
        <h2 className="text-2xl">
          {locale === "id" ? "Memuat catatan..." : "Loading note..."}
        </h2>
      </section>
    );
  }

  if (!note) {
    return (
      <section className="container mx-auto py-12 px-4 text-center text-text-main">
        <h2 className="text-2xl">
          {locale === "id" ? "Catatan tidak ditemukan." : "Note not found."}
        </h2>
      </section>
    );
  }

  return (
    <section className="container mx-auto py-12 px-4 max-w-3xl">
      <h2 className="text-4xl font-bold text-text-main mb-2 break-words">
        {note.title}
      </h2>

      <p className="text-text-muted mb-8 text-sm">
        {showFormattedDate(note.createdAt)}
      </p>

      <div className="text-text-main text-base sm:text-lg leading-relaxed whitespace-pre-wrap break-words">
        {note.body}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mt-8">
        <Button
          onClick={onArchiveNoteHandler}
          className="w-full sm:w-auto bg-transparent border border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white px-6 py-3"
        >
          {note.archived ? <FiInbox /> : <FiArchive />}
          {note.archived
            ? locale === "id"
              ? "Batalkan Arsip"
              : "Unarchive"
            : locale === "id"
              ? "Arsipkan"
              : "Archive"}
        </Button>

        <Button
          onClick={onDeleteNoteHandler}
          className="w-full sm:w-auto bg-transparent border border-red-500 text-red-500 hover:bg-red-500 hover:text-white px-6 py-3"
        >
          <FiTrash2 /> {locale === "id" ? "Hapus" : "Delete"}
        </Button>

        {/* saya non aktifkan fitur ini karena API tidak menyediakan endpointnya */}
        {/* <Button
          onClick={() => navigate(`/notes/${note.id}/edit`)}
          className="w-full sm:w-auto bg-transparent border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white px-6 py-3"
        >
          <FiEdit /> Edit
        </Button> */}
      </div>
    </section>
  );
};

export default DetailPage;
