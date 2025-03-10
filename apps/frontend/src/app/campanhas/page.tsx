import { CampaignCard } from "@/components/CampaignCard";
import { fetchCampaigns } from "../lib/api/campaigns";

export default async function CampaignsPage() {
  const campaigns = await fetchCampaigns();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Campanhas</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {campaigns.map((campaign) => (
          <CampaignCard key={campaign.id} campaign={campaign} />
        ))}
      </div>
    </div>
  );
}
