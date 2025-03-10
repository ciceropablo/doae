"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import DonationModalContent from "@/components/DonationModalContent";
import Modal from "@/components/ui/Modal";

export default function CampaignDetailPage() {
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);

  function handleDonationSuccess() {
    window.location.reload();
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Detalhes da campanha {id}</h1>
      <p>Informações completas da campanha aqui...</p>
      <button
        onClick={() => setShowModal(true)}
        className="mt-4 py-2 px-4 bg-blue-600 text-white rounded"
      >
        Fazer uma Doação
      </button>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <DonationModalContent
          campaignId={String(id)}
          onClose={() => setShowModal(false)}
          onSuccess={handleDonationSuccess}
        />
      </Modal>
    </div>
  );
}
