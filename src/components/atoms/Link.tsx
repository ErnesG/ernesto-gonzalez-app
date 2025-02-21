import LinkProps from "../../models/link.props";

function Link({ url, children }: LinkProps) {
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    className="text-blue-600"
  >
    {children}
  </a>;
}

export default Link;
