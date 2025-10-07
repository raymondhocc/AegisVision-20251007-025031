import { Video, ShieldAlert, Users, AlertTriangle } from 'lucide-react';
import type { Kpi, Stream, Alert, TrafficDataPoint, DemographicsData, AlertsBySeverity } from '@/types';
const kpis: Kpi[] = [
  { title: 'Total Streams', value: '54', icon: Video, change: '+2', changeType: 'increase' },
  { title: 'Active Alerts', value: '7', icon: ShieldAlert, change: '-1', changeType: 'decrease' },
  { title: 'People Detected', value: '1,283', icon: Users, change: '+15%', changeType: 'increase' },
  { title: 'System Health', value: '99.8%', icon: AlertTriangle, change: '+0.1%', changeType: 'increase' },
];
const resolutions = ['1080p', '720p', '4K', '1440p'];
const streams: Stream[] = Array.from({ length: 12 }, (_, i) => ({
  id: `stream-${i + 1}`,
  name: `CAM-${String(i + 1).padStart(2, '0')}`,
  status: i % 4 === 0 ? 'Offline' : (i % 7 === 0 ? 'Warning' : 'Online'),
  location: `Zone ${String.fromCharCode(65 + (i % 4))}-${i % 3 + 1}`,
  thumbnailUrl: `https://picsum.photos/seed/${i + 1}/400/300`,
  resolution: resolutions[i % resolutions.length],
  rtspUrl: `rtsp://192.168.1.${100 + i}:554/stream1`,
}));
const alerts: Alert[] = [
  { id: 'alert-1', timestamp: '2m ago', severity: 'Critical', description: 'Perimeter breach detected.', streamName: 'CAM-07', location: 'Zone B-2', clipUrl: 'mock.mp4' },
  { id: 'alert-2', timestamp: '5m ago', severity: 'High', description: 'Unattended package identified.', streamName: 'CAM-02', location: 'Zone A-3', clipUrl: 'mock.mp4' },
  { id: 'alert-3', timestamp: '10m ago', severity: 'Medium', description: 'Anomalous crowd formation.', streamName: 'CAM-05', location: 'Zone B-1', clipUrl: 'mock.mp4' },
  { id: 'alert-4', timestamp: '12m ago', severity: 'Low', description: 'Loitering detected near entrance.', streamName: 'CAM-01', location: 'Zone A-1', clipUrl: 'mock.mp4' },
  { id: 'alert-5', timestamp: '15m ago', severity: 'High', description: 'Vehicle in restricted zone.', streamName: 'CAM-09', location: 'Zone C-1', clipUrl: 'mock.mp4' },
  { id: 'alert-6', timestamp: '20m ago', severity: 'Medium', description: 'Fall detected.', streamName: 'CAM-11', location: 'Zone D-3', clipUrl: 'mock.mp4' },
];
const trafficData: TrafficDataPoint[] = Array.from({ length: 12 }, (_, i) => ({
  time: `${String(i * 2).padStart(2, '0')}:00`,
  people: Math.floor(Math.random() * (150 - 20 + 1)) + 20,
}));
const demographicsData: DemographicsData[] = [
  { age: '0-17', male: 45, female: 55 },
  { age: '18-34', male: 120, female: 110 },
  { age: '35-54', male: 90, female: 105 },
  { age: '55+', male: 60, female: 75 },
];
const alertsBySeverity: AlertsBySeverity[] = [
  { name: 'Critical', value: 12 },
  { name: 'High', value: 34 },
  { name: 'Medium', value: 89 },
  { name: 'Low', value: 156 },
];
const severities: Alert['severity'][] = ['Critical', 'High', 'Medium', 'Low'];
const descriptions = [
  'Perimeter breach detected.', 'Unattended package identified.', 'Anomalous crowd formation.',
  'Loitering detected near entrance.', 'Vehicle in restricted zone.', 'Fall detected.',
  'Illegal parking.', 'Weapon detected.', 'Fire/Smoke detected.'
];
const historicalAlerts: Alert[] = Array.from({ length: 50 }, (_, i) => {
  const streamIndex = Math.floor(Math.random() * streams.length);
  const stream = streams[streamIndex];
  return {
    id: `hist-alert-${i + 1}`,
    timestamp: `${Math.floor(Math.random() * 58) + 2}m ago`,
    severity: severities[Math.floor(Math.random() * severities.length)],
    description: descriptions[Math.floor(Math.random() * descriptions.length)],
    streamName: stream.name,
    location: stream.location,
    clipUrl: 'mock.mp4',
  };
});
const api = {
  getKpis: async (): Promise<Kpi[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return kpis;
  },
  getStreams: async (): Promise<Stream[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return streams;
  },
  getAlerts: async (): Promise<Alert[]> => {
    await new Promise(resolve => setTimeout(resolve, 400));
    return alerts;
  },
  getTrafficData: async (): Promise<TrafficDataPoint[]> => {
    await new Promise(resolve => setTimeout(resolve, 600));
    return trafficData;
  },
  getDemographicsData: async (): Promise<DemographicsData[]> => {
    await new Promise(resolve => setTimeout(resolve, 700));
    return demographicsData;
  },
  getAlertsBySeverity: async (): Promise<AlertsBySeverity[]> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    return alertsBySeverity;
  },
  getHistoricalAlerts: async (): Promise<Alert[]> => {
    await new Promise(resolve => setTimeout(resolve, 900));
    return historicalAlerts;
  },
};
export default api;