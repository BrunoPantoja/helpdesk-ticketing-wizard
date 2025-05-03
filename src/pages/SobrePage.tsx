
import React from "react";

const SobrePage: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-support-darkblue mb-6">Sobre</h1>
        <div className="prose max-w-none">
          <p className="text-lg text-gray-700">
            Aplicativo de suporte técnico TI.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SobrePage;
