import { useState, useContext } from "react";
import PropTypes from "prop-types";
import Button from "./Button";
import LocaleContext from "../contexts/LocaleContext";

const NoteInput = ({
  initialTitle = "",
  initialBody = "",
  onSubmit,
  buttonLabel,
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [body, setBody] = useState(initialBody);
  const { locale } = useContext(LocaleContext);

  const submitHandler = (event) => {
    event.preventDefault();
    onSubmit({ title, body });
  };

  return (
    <form onSubmit={submitHandler} className="flex flex-col gap-6 my-4">
      <input
        type="text"
        placeholder={locale === "id" ? "Judul catatan..." : "Note title..."}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="p-4 bg-bg-card border border-border-main rounded-xl text-text-main placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 shadow-sm w-full font-bold text-lg"
      />

      <textarea
        placeholder={
          locale === "id"
            ? "Tuliskan catatanmu di sini..."
            : "Write your note here..."
        }
        value={body}
        onChange={(e) => setBody(e.target.value)}
        className="p-4 bg-bg-card border border-border-main rounded-xl text-text-main placeholder-text-muted min-h-[300px] resize-y focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 shadow-sm w-full leading-relaxed"
      />

      <Button
        type="submit"
        className="bg-transparent border border-blue-500 text-blue-500 py-3 px-8 rounded-xl font-bold hover:bg-blue-500 hover:text-white w-fit flex items-center gap-2 transition-colors duration-300"
      >
        {buttonLabel}
      </Button>
    </form>
  );
};

NoteInput.propTypes = {
  initialTitle: PropTypes.string,
  initialBody: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  buttonLabel: PropTypes.string.isRequired,
};

export default NoteInput;
