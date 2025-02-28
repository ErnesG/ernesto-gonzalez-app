import { PullRequestCardProps } from "../../models/pull.request.card.props";
import Label from "../atoms/Label";
import Link from "../atoms/Link";
import Text from "../atoms/Text";
function GitCard({ pullRequest }: PullRequestCardProps) {
  return (
    <div className="border p-4 rounded-lg shadow-md bg-white mb-4">
      <Link url={pullRequest.html_url}>{pullRequest.title}</Link>
      <div className="mt-2">
        {pullRequest.labels.map((label) => (
          <Label key={label.id} name={label.name} />
        ))}
      </div>
      <Text variant="body" className="text-gray-500 text-sm mt-2">
        Opened: {new Date(pullRequest.created_at).toLocaleDateString()} by{" "}
        <strong>{pullRequest.user.login}</strong>
      </Text>
    </div>
  );
}

export default GitCard;
