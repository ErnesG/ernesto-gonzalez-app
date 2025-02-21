import { useState } from "react";
import { useConnectToGit } from "../../hooks/useConnectToGit";
import PullRequestList from "../organisms/PullRequstList";
import FilterBar from "../molecules/FilterBar";
import Text from "../atoms/Text";
function Content() {
  const { pullRequests, loading, error } = useConnectToGit();
  const [filter, setFilter] = useState("");

  const labels = [
    ...new Set(
      pullRequests.flatMap((pullRequest) =>
        pullRequest.labels.map((label) => label.name)
      )
    ),
  ];
  const filteredPRs = filter
    ? pullRequests.filter((pullRequest) =>
        pullRequest.labels.some((label) => label.name === filter)
      )
    : pullRequests;
  return (
    <div className="max-w-4xl mx-auto mt-8">
      <Text variant="title" className="text-2xl font-bold mb-4 text-center">
        Pull request Bar
      </Text>
      <FilterBar labels={labels} onFilterChange={setFilter} />
      <PullRequestList
        pullRequests={filteredPRs}
        loading={loading}
        error={error}
      />
    </div>
  );
}
export default Content;
