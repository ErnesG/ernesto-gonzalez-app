import LabelProps from "../../models/label.props";

function Label({ name }: LabelProps) {
  return (
    <span className="bg-gray-200 text-gray-700 px-2 py-1 text-sm rounded-md mr-2">
      {name}
    </span>
  );
}

export default Label;
