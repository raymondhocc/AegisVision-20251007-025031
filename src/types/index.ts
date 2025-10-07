import { LucideIcon } from "lucide-react";
export interface Kpi {
  title: string;
  value: string;
  icon: LucideIcon;
  change: string;
  changeType: 'increase' | 'decrease';
}
export type StreamStatus = 'Online' | 'Offline' | 'Warning';
export interface Stream {
  id: string;
  name: string;
  status: StreamStatus;
  location: string;
  thumbnailUrl: string;
  resolution: string;
  rtspUrl:string;
}
export interface Alert {
  id: string;
  timestamp: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  description: string;
  streamName: string;
  location: string;
  clipUrl: string;
}
// New types for Phase 3
export interface TrafficDataPoint {
  time: string;
  people: number;
}
export interface DemographicsData {
  age: string;
  male: number;
  female: number;
}
export interface AlertsBySeverity {
  name: 'Critical' | 'High' | 'Medium' | 'Low';
  value: number;
}