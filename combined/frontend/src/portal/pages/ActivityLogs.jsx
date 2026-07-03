import { ShieldCheck } from "lucide-react";
import ComingSoon from "../components/ComingSoon";

export default function ActivityLogs() {
  return (
    <ComingSoon
      icon={ShieldCheck}
      title="Activity Logs"
      features={[
        "Login history per user with IP/device",
        "User action audit trail (create/edit/delete events)",
        "System logs for background jobs and errors",
        "Security monitoring for suspicious login attempts",
      ]}
    />
  );
}
