import ButtonProps from "../../models/button.props";

function Button({ label, onClick, active }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-md ${
        active ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
      }`}
    >
      {label}
    </button>
  );
}

export default Button;
