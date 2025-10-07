import { useEffect, useState } from 'react';
import { getKpis, getStreams, getAlerts } from '@/lib/mockApi';
import { KpiCard } from '@/components/dashboard/KpiCard';
import { VideoFeedCard } from '@/components/dashboard/VideoFeedCard';
import { AlertsFeed } from '@/components/dashboard/AlertsFeed';

import type { Kpi, Stream, Alert } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';
export function DashboardPage() {
  const [kpis, setKpis] = useState<Kpi[]>([]);
  const [streams, setStreams] = useState<Stream[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [kpisData, streamsData, alertsData] = await Promise.all([
          getKpis(),
          getStreams(),
          getAlerts(),
        ]);
        setKpis(kpisData);
        setStreams(streamsData);
        setAlerts(alertsData);
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Mission Control</h1>
      {/* KPI Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-[118px]" />)
        ) : (
          kpis.map((kpi) => <KpiCard key={kpi.title} kpi={kpi} />)
        )}
      </div>
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Video Feeds */}
        <div className="lg:col-span-9">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {loading ? (
              Array.from({ length: 12 }).map((_, i) => <Skeleton key={i} className="aspect-video" />)
            ) : (
              streams.map((stream) => <VideoFeedCard key={stream.id} stream={stream} />)
            )}
          </div>
        </div>
        {/* Alerts Feed */}
        <div className="lg:col-span-3">
          {loading ? <Skeleton className="h-full min-h-[500px]" /> : <AlertsFeed alerts={alerts} />}
        </div>
      </div>
    </div>
  );
}