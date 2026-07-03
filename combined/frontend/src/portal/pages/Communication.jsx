import { MessageSquare } from "lucide-react";
import ComingSoon from "../components/ComingSoon";

export default function Communication() {
  return (
    <ComingSoon
      icon={MessageSquare}
      title="Communication Center"
      features={[
        "Email notifications on lead & application status changes",
        "SMS notifications via a provider like Twilio",
        "Push notifications to the student/counsellor mobile app",
        "Bulk messaging to filtered lead or student segments",
      ]}
    />
  );
}
