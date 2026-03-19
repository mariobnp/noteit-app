import PropTypes from "prop-types";

const Button = ({
  children,
  onClick,
  type = "button",
  className = "",
  ...rest
}) => {
  const baseStyle =
    "px-4 py-2 rounded-lg font-bold transition-all duration-200 flex items-center justify-center gap-2";

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyle} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.string,
  className: PropTypes.string,
};

export default Button;
