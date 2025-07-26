export class BiometricDevice {
  id: string;
  type: string;
  location: string;
  status: "online" | "offline";
  lastSeen: Date;
  uptime: number; // Number of successful reports
  downtime: number; // Number of missed reports (mocked)
}
