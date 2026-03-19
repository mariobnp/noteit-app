import { useNavigate } from "react-router-dom";
import { addNote } from "../utils/api";
import NoteInput from "../components/NoteInput";
import { useContext } from "react";
import LocaleContext from "../contexts/LocaleContext";

const AddPage = () => {
  const navigate = useNavigate();
  const { locale } = useContext(LocaleContext);

  async function addNoteHandler(note) {
    const { error } = await addNote(note);

    if (!error) {
      navigate("/");
    }
  }

  return (
    <section className="container mx-auto py-8 px-4 max-w-3xl">
      <h2 className="text-3xl font-bold mb-6 text-text-main">
        {locale === "id" ? "Buat Catatan Baru" : "Create New Note"}
      </h2>
      <NoteInput
        onSubmit={addNoteHandler}
        buttonLabel={locale === "id" ? "Tambah" : "Add"}
      />
    </section>
  );
};

export default AddPage;
