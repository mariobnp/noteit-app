import React from "react";
import { getNote, editNote } from "../utils/local-data";
import { useNavigate, useParams } from "react-router-dom";
import NoteInput from "../components/NoteInput";

const EditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const note = getNote(id);

  function onEditNoteHandler(data) {
    editNote({
      id,
      title: data.title,
      body: data.body,
    });

    navigate(`/notes/${id}`);
  }

  return (
    <section className="container mx-auto py-8 px-4">
      <h2 className="text-2xl font-bold mb-6 text-white">Edit Catatan Baru</h2>
      <NoteInput
        initialTitle={note.title}
        initialBody={note.body}
        onSubmit={onEditNoteHandler}
        buttonLabel="Edit"
      />
    </section>
  );
};

export default EditPage;
