'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { ActivityCalendar, Activity } from 'react-activity-calendar';
import { Reveal } from '@/components/motion/Reveal';

interface GithubContributionsProps {
  username?: string;
}

export const GithubContributions: React.FC<GithubContributionsProps> = ({
  username = 'Zidanbz',
}) => {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState<number | 'last'>('last');
  const [data, setData] = useState<Activity[]>([]);
  const [totalCount, setTotalCount] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const availableYears: (number | 'last')[] = ['last', currentYear, currentYear - 1, currentYear - 2];

  const fetchContributions = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/github-contributions?username=${username}&year=${selectedYear}`);
      if (!res.ok) {
        throw new Error('Failed to load GitHub data');
      }
      const result = await res.json();
      if (result.error) {
        throw new Error(result.error);
      }
      setData(result.contributions || []);
      const count = result.total ? Object.values(result.total)[0] : null;
      setTotalCount(typeof count === 'number' ? (count as number) : null);
    } catch (err: any) {
      setError(err.message || 'Unable to fetch GitHub activity');
    } finally {
      setLoading(false);
    }
  }, [username, selectedYear]);

  useEffect(() => {
    fetchContributions();
  }, [fetchContributions]);

  const theme = {
    light: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
    dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
  };

  const getYearLabel = (yr: number | 'last') => (yr === 'last' ? 'Last Year' : String(yr));

  return (
    <section className="pt-4 pb-12 px-6 max-w-7xl mx-auto border-t-3 border-black">
      <Reveal>
        <div className="neo-card p-6 md:p-8 bg-slate-900 border-4 border-black shadow-brutal-lg rounded-3xl">
          {/* Header & Year Selector */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b-2 border-slate-800 pb-4">
            <div>
              <span className="badge-neo bg-[#A3E635] text-black shadow-brutal-sm mb-2 inline-block">
                GITHUB ACTIVITY 🚀
              </span>
              <h3 className="text-2xl md:text-4xl font-luckiest font-black text-white tracking-wide uppercase">
                {totalCount !== null ? `${totalCount} CONTRIBUTIONS` : 'CONTRIBUTION GRAPH'}
              </h3>
              <p className="text-xs font-semibold text-slate-400 mt-1">
                Public GitHub contributions for @{username}
              </p>
            </div>

            {/* Year Selector Buttons */}
            <div className="flex items-center gap-2 flex-wrap">
              {availableYears.map((year) => (
                <button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  className={`px-4 py-2 rounded-xl text-xs font-headline font-black border-2 border-black transition-all shadow-brutal-sm cursor-pointer ${
                    selectedYear === year
                      ? 'bg-[#00F0FF] text-black -translate-y-0.5'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {getYearLabel(year)}
                </button>
              ))}
            </div>
          </div>

          {/* GitHub Calendar Container */}
          <div className="overflow-x-auto pb-2 pt-2 flex justify-center text-slate-200 min-h-[160px] items-center">
            {loading ? (
              <p className="text-xs font-headline font-black text-slate-400 animate-pulse">
                LOADING GITHUB ACTIVITY... ⚡
              </p>
            ) : error ? (
              <div className="text-center">
                <p className="text-xs font-headline font-black text-rose-400 mb-2">{error}</p>
                <button
                  onClick={fetchContributions}
                  className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-xs font-headline font-black text-white border-2 border-black rounded-lg shadow-brutal-sm"
                >
                  RETRY
                </button>
              </div>
            ) : (
              <ActivityCalendar
                data={data}
                theme={theme}
                colorScheme="dark"
                blockSize={13}
                blockMargin={4}
                fontSize={14}
                labels={{
                  totalCount: '{{count}} contributions in {{year}}',
                }}
              />
            )}
          </div>
        </div>
      </Reveal>
    </section>
  );
};
