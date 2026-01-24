"use client";

import { useMemo, useState, useEffect } from "react";
import { ScrollAnimation } from "@/components/ui/scroll-animation";

const GITHUB_USERNAME = "MuhammadNoman3405";

export function GitHubActivity() {
  const [contributions, setContributions] = useState<{ date: string; count: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGitHubContributions() {
      try {
        // Fetch contribution data from GitHub API
        const response = await fetch(`https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`);
        const data = await response.json();

        if (data.contributions) {
          const contributionData = data.contributions.map((contrib: any) => ({
            date: contrib.date,
            count: contrib.count,
          }));
          setContributions(contributionData);
        } else {
          // Fallback to empty data if API fails
          generateFallbackData();
        }
      } catch (error) {
        console.error("Failed to fetch GitHub contributions:", error);
        generateFallbackData();
      } finally {
        setLoading(false);
      }
    }

    function generateFallbackData() {
      const data: { date: string; count: number }[] = [];
      const today = new Date();

      for (let i = 364; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        data.push({
          date: date.toISOString().split('T')[0],
          count: 0,
        });
      }
      setContributions(data);
    }

    fetchGitHubContributions();
  }, []);

  const getColor = (count: number) => {
    if (count === 0) return "bg-secondary";
    if (count <= 3) return "bg-primary/30";
    if (count <= 6) return "bg-primary/50";
    if (count <= 9) return "bg-primary/70";
    return "bg-primary";
  };

  // Group by weeks
  const weeks = useMemo(() => {
    const result: { date: string; count: number }[][] = [];
    let currentWeek: { date: string; count: number }[] = [];

    contributions.forEach((day, index) => {
      const date = new Date(day.date);
      const dayOfWeek = date.getDay();

      if (index === 0) {
        // Pad the first week
        for (let i = 0; i < dayOfWeek; i++) {
          currentWeek.push({ date: '', count: -1 });
        }
      }

      currentWeek.push(day);

      if (dayOfWeek === 6 || index === contributions.length - 1) {
        result.push(currentWeek);
        currentWeek = [];
      }
    });

    return result;
  }, [contributions]);

  const totalContributions = contributions.reduce((sum, day) => sum + day.count, 0);

  return (
    <section id="github" className="py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollAnimation delay={200}>
          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-all group cursor-pointer"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                GitHub Contributions
              </h3>
              <span className="text-sm text-muted-foreground">
                {loading ? "Loading..." : `${totalContributions} contributions in the last year`}
              </span>
            </div>

            {/* Contribution Graph */}
            <div className="overflow-x-auto pb-2">
              <div className="flex gap-1 min-w-max">
                {weeks.map((week, weekIndex) => (
                  <div key={weekIndex} className="flex flex-col gap-1">
                    {week.map((day, dayIndex) => (
                      <div
                        key={`${weekIndex}-${dayIndex}`}
                        className={`w-3 h-3 rounded-sm ${day.count === -1 ? "bg-transparent" : getColor(day.count)
                          }`}
                        title={day.count >= 0 ? `${day.count} contributions on ${day.date}` : ""}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Legend */}
            <div className="flex items-center justify-end gap-2 mt-4">
              <span className="text-xs text-muted-foreground">Less</span>
              <div className="flex gap-1">
                <div className="w-3 h-3 rounded-sm bg-secondary" />
                <div className="w-3 h-3 rounded-sm bg-primary/30" />
                <div className="w-3 h-3 rounded-sm bg-primary/50" />
                <div className="w-3 h-3 rounded-sm bg-primary/70" />
                <div className="w-3 h-3 rounded-sm bg-primary" />
              </div>
              <span className="text-xs text-muted-foreground">More</span>
            </div>
          </a>
        </ScrollAnimation>
      </div>
    </section>
  );
}
