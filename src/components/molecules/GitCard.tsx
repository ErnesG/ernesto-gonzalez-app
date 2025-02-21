import { PullRequestCardProps } from "../../models/pull.request.card.props";
import Label from "../atoms/Label";
import Text from "../atoms/Text";
function GitCard({ pullRequest }: PullRequestCardProps) {
  return (
    <div className="border p-4 rounded-lg shadow-md bg-white mb-4">
      <a
        href={pullRequest.html_url}
        target="_blank"
        className="text-blue-600 font-semibold text-lg"
      >
        {pullRequest.title}
      </a>
      <div className="mt-2">
        {pullRequest.labels.map((label) => (
          <Label key={label.id} name={label.name} />
        ))}
      </div>
      <Text variant="body" className="text-gray-500 text-sm mt-2">
        Opened: {new Date(pullRequest.created_at).toLocaleDateString()}
      </Text>
    </div>
  );
}

export default GitCard;
