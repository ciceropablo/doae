"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createCampaign } from "@/app/lib/api/campaigns";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";

export default function CreateCampaignPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [goal, setGoal] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await createCampaign({ title, description, goalAmount: Number(goal) });
      router.push("/campanhas");
    } catch {
      setError("Erro ao criar campanha. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Criar Nova Campanha</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="text"
          placeholder="Título da Campanha"
          value={title}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
          }
          required
        />
        <Textarea
          placeholder="Descrição da Campanha"
          value={description}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setDescription(e.target.value)
          }
          required
        />
        <Input
          type="number"
          placeholder="Meta de arrecadação (R$)"
          value={goal}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setGoal(e.target.value)
          }
          required
        />
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Criando..." : "Criar Campanha"}
        </Button>
      </form>
    </div>
  );
}
