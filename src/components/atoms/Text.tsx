import { TextProps } from "../../models/text.props";
import clsx from "clsx";
function Text({ children, variant = "body", className }: TextProps) {
  const baseStyles = "text-gray-900";

  const variantStyles = {
    title: "text-2xl font-bold",
    subtitle: "text-xl font-semibold",
    body: "text-base",
    caption: "text-sm text-gray-500",
  };

  return (
    <p className={clsx(baseStyles, variantStyles[variant], className)}>
      {children}
    </p>
  );
}
export default Text;
