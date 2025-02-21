import ButtonProps from "../../models/button.props";
import { getLabelColor } from '../../utils/labelColors';

function Button({ label, onClick, active }: ButtonProps) {
  const baseColorClass = getLabelColor(label);
  const activeClass = active ? 'ring-2 ring-offset-1' : '';
  
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-md ${baseColorClass} ${activeClass}`}
    >
      {label}
    </button>
  );
}

export default Button;
