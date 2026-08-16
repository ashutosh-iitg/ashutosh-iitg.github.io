import { useEffect, useState } from "react";
import { profile } from "@/data/profile";

type GitHubProfile = {
  public_repos: number;
  followers: number;
};

type GitHubEvent = {
  type: string;
  payload: {
    size?: number;
    action?: string;
  };
};

type Stats = {
  repos: number;
  followers: number;
  commits: number;
  prs: number;
  reviews: number;
};

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status}`);
  return (await res.json()) as T;
}

export default function GitHubStats() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const [user, events] = await Promise.all([
          fetchJson<GitHubProfile>(`https://api.github.com/users/${profile.handle}`),
          fetchJson<GitHubEvent[]>(`https://api.github.com/users/${profile.handle}/events/public?per_page=100`),
        ]);

        const commits = events
          .filter((e) => e.type === "PushEvent")
          .reduce((sum, e) => sum + (e.payload.size ?? 0), 0);
        const prs = events.filter(
          (e) => e.type === "PullRequestEvent" && e.payload.action === "opened",
        ).length;
        const reviews = events.filter(
          (e) => e.type === "PullRequestReviewEvent" && e.payload.action === "submitted",
        ).length;

        if (!cancelled) {
          setStats({ repos: user.public_repos, followers: user.followers, commits, prs, reviews });
        }
      } catch {
        if (!cancelled) setError(true);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="border border-border bg-card p-4">
      <p className="mb-3 text-xs text-muted-foreground" aria-hidden="true">
        &gt; gh stats --user={profile.handle}
      </p>
      {error ? (
        <p className="text-sm text-muted-foreground">
          Stats unavailable.{" "}
          <a
            href={`https://github.com/${profile.handle}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 hover:text-foreground"
          >
            View on GitHub →
          </a>
        </p>
      ) : stats ? (
        <dl className="grid grid-cols-2 gap-3">
          <Stat label="repos" value={stats.repos} />
          <Stat label="followers" value={stats.followers} />
          <Stat label="commits (90d)" value={stats.commits} />
          <Stat label="PRs (90d)" value={stats.prs} />
          <Stat label="reviews (90d)" value={stats.reviews} />
        </dl>
      ) : (
        <p className="text-sm text-muted-foreground">loading…</p>
      )}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="border border-border p-3">
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className="mt-1 font-display text-2xl font-semibold tabular-nums">{value.toLocaleString()}</dd>
    </div>
  );
}
