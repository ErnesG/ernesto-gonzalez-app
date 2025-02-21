import { ListProps } from "../../models/list.props";
import Loader from "../atoms/Loader";
import Text from "../atoms/Text";
import GitCard from "../molecules/GitCard";

function PullRequestList({ pullRequests, loading, error }: ListProps) {
  if (loading) {
    return <Loader />;
  }
  if (error) {
    return (
      <>
        <Text variant="body" className="text-red-500">
          Error fetching pull request from Github
        </Text>
      </>
    );
  }

  return (
    <div>
      {pullRequests.map((pr) => (
        <GitCard key={pr.id} pullRequest={pr} />
      ))}
    </div>
  );
}

export default PullRequestList;
