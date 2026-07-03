import { LayoutTemplate } from "lucide-react";
import ComingSoon from "../components/ComingSoon";

export default function CMS() {
  return (
    <ComingSoon
      icon={LayoutTemplate}
      title="Website Content Management"
      features={[
        "Manage homepage banners",
        "Publish and edit blog posts",
        "Manage testimonials shown on the public site",
        "FAQs and News & Events sections",
      ]}
    />
  );
}
