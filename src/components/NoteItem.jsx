import { Link } from "react-router-dom";
import { showFormattedDate } from "../utils";
import PropTypes from "prop-types";

const NoteItem = ({ id, title, body, createdAt }) => {
  return (
    <div className="bg-bg-card border border-border-main rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full">
      <h3 className="text-xl font-bold text-text-main mb-1 truncate">
        <Link
          to={`/notes/${id}`}
          className="hover:text-blue-500 transition-colors"
        >
          {title}
        </Link>
      </h3>

      <p className="text-sm text-text-muted mb-4">
        {showFormattedDate(createdAt)}
      </p>

      <p className="text-text-main line-clamp-3 leading-relaxed mb-4 flex-grow">
        {body}
      </p>
    </div>
  );
};

NoteItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
};

export default NoteItem;
