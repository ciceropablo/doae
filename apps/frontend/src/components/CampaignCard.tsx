import { Campaign } from "@/app/lib/types";

type CampaignProps = {
  campaign: Campaign;
};

export function CampaignCard({
  campaign: { id, title, goalAmount, currentAmount },
}: CampaignProps) {
  return (
    <div key={id} className="p-4 border rounded shadow">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-gray-600">Meta: R$ {goalAmount}</p>
      <p className="text-green-600">Arrecadado: R$ {currentAmount}</p>
      <a href={`/campanhas/${id}`} className="text-blue-600 underline">
        Ver detalhes
      </a>
    </div>
  );
}
