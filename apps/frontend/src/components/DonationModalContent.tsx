"use client";

import { useState } from "react";
import { createDonation } from "@/app/lib/api/donations";

type DonationModalContentProps = {
  campaignId: string;
  onSuccess: () => void;
  onClose: () => void;
};

export default function DonationModalContent({
  campaignId,
  onSuccess,
  onClose,
}: DonationModalContentProps) {
  const [amount, setAmount] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function handleDonation() {
    setError(null);

    const donationAmount = Number(amount);
    if (isNaN(donationAmount) || donationAmount <= 0) {
      setError("Invalid donation amount");
      return;
    }

    try {
      await createDonation(campaignId, { amount: donationAmount });
      setAmount("");
      onSuccess();
      onClose();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || "Donation failed");
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Doar para a Campanha #{campaignId}</h2>
      <input
        type="number"
        placeholder="Valor da doação"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="p-2 border w-full"
      />
      {error && <p className="text-red-600">{error}</p>}
      <div className="flex justify-end space-x-2">
        <button onClick={onClose} className="py-2 px-4 border rounded">
          Cancelar
        </button>
        <button
          onClick={handleDonation}
          className="py-2 px-4 bg-green-600 text-white rounded"
        >
          Doar
        </button>
      </div>
    </div>
  );
}
