import { InsuranceForm } from "@/components/form/InsuranceForm";
import { ContentCard } from "@/components/layout/ContentCard";
import { PageContainer } from "@/components/layout/PageContainer";

export default function InsurancePage() {
  return (
    <PageContainer>
      <ContentCard>
        <InsuranceForm />
      </ContentCard>
    </PageContainer>
  );
}
