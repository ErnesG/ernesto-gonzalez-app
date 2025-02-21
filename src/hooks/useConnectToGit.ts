import { useEffect, useState } from "react";
import axios from "axios";
import { PullRequest } from "../models/pullrequest.model";
import { API_BASE, OWNER, PULLS, REPO } from "../utils/constants";


export function useConnectToGit() {
    const [pullRequests, setPullRequest] = useState<PullRequest[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(()=>{
        const fetchPullRequest = async (owner: string, repository: string) => {
            try {
                setLoading(true);
                const {data} = await axios.get(`${API_BASE}${owner}/${repository}/${PULLS}`,{
                    headers: {
                        Accept: "application/vnd.github.v3+json"
                    }
                });
                setPullRequest(data)

            } catch(err: unknown) {
                if (axios.isAxiosError(err)) {
                    setError(err.response?.data?.message || "Failed to fetch PRs.");
                  } else {
                    setError("An unexpected error occurred.");
                  }
            } finally {
                setLoading(false);
            }
        }
        fetchPullRequest(OWNER, REPO);
    },[]);

    return {pullRequests, loading, error}
}
