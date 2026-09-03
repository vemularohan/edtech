import { createFileRoute } from "@tanstack/react-router";
import { CertificateVerification } from "@/components/codepath/CodepathApp";

export const Route = createFileRoute("/verify/$certificateId")({
  component: function CertificateVerificationRoute() {
    const { certificateId } = Route.useParams();
    return <CertificateVerification certificateId={certificateId} />;
  },
});
