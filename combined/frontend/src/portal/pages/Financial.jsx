import { Wallet } from "lucide-react";
import ComingSoon from "../components/ComingSoon";

export default function Financial() {
  return (
    <ComingSoon
      icon={Wallet}
      title="Financial Management"
      features={[
        "Application fee tracking per student",
        "Payment records with a payment gateway integration",
        "Invoice generation (PDF) per application or scholarship",
        "Refund management workflow",
      ]}
    />
  );
}
