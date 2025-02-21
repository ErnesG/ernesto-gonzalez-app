interface PullRequest {
    id: number;
    number: number;
    title: string;
    state: "open" | "closed";
    html_url: string;
    user: {
      login: string;
      avatar_url: string;
      html_url: string;
    };
    created_at: string;
    updated_at: string;
    labels: {
      name: string;
      color: string;
    }[];
  }
  