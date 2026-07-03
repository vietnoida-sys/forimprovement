import { Sparkles } from "lucide-react";
import ComingSoon from "../components/ComingSoon";

export default function AIFeatures() {
  return (
    <ComingSoon
      icon={Sparkles}
      title="AI Features"
      features={[
        "AI course recommendation based on student profile",
        "AI university recommendation & shortlist ranking",
        "AI resume analysis with feedback",
        "AI SOP review with structured suggestions",
        "AI IELTS score prediction from a practice test",
      ]}
    />
  );
}
