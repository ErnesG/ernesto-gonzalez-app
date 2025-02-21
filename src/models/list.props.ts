import { PullRequest } from "./pullrequest.model";

export interface ListProps {
    pullRequests: PullRequest[];
    loading: boolean;
    error: string | null
}