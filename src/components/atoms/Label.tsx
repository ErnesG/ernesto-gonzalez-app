import LabelProps from "../../models/label.props";
import { getLabelColor } from '../../utils/labelColors';

function Label({ name }: LabelProps) {
  const colorClass = getLabelColor(name);
  
  return (
    <span className={`${colorClass} px-2 py-1 text-sm rounded-md mr-2`}>
      {name}
    </span>
  );
}

export default Label;
