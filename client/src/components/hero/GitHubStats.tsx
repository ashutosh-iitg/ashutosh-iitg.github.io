import { profile } from "@/data/profile";

export default function GitHubStats() {
  const url =
    `https://github-stats-alpha.vercel.app/api?username=${profile.handle}` +
    "&cc=0a0a0a&tc=f5f5f5&ic=f5f5f5&bc=0000";

  return (
    <div className="overflow-hidden border border-border bg-card p-4">
      <p className="mb-3 text-xs text-muted-foreground" aria-hidden="true">
        &gt; gh stats --user={profile.handle}
      </p>
      <img
        src={url}
        alt={`GitHub statistics for ${profile.handle}: repositories, stars, forks, contributions, and issues`}
        className="w-full"
        width={495}
        height={195}
        loading="lazy"
      />
    </div>
  );
}
