
export interface ScanResult {
  code: string;
  timestamp: string;
  isValid: boolean;
}

export interface EventData {
  id: string;
  name: string;
  date: string;
  time: string;
  location: string;
  seat: string;
  isAvailable: boolean;
}
