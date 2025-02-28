import LinkProps from "../../models/link.props";

function Link({ url, children }: LinkProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 font-semibold text-lg"
    >
      {children}
    </a>
  );
}

export default Link;
