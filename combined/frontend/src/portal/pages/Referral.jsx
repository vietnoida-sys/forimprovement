import { Gift } from "lucide-react";
import ComingSoon from "../components/ComingSoon";

export default function Referral() {
  return (
    <ComingSoon
      icon={Gift}
      title="Referral & Earn Module"
      features={[
        "Track referrals from existing students and partners",
        "Reward points ledger per referrer",
        "Commission reports for agents/counsellors",
        "Referral withdrawal request approvals",
      ]}
    />
  );
}
