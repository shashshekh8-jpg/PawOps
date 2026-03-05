import React from 'react';

const steps = ["Rescued", "Medical Evaluation", "Treatment/Recovery", "Ready for Adoption"];

export default function MedicalTimeline({ currentStep }: { currentStep: number }) {
  return (
    <div className="space-y-8 relative before:absolute before:inset-0 before:ml-3 before:-translate-x-px before:h-full before:w-0.5 before:bg-white/10">
      {steps.map((step, idx) => (
        <div key={step} className="relative flex items-center space-x-6">
          {/* Glowing effect for active/completed steps [cite: 1] */}
          <div className={`w-6 h-6 rounded-full border-4 border-background z-10 ${idx <= currentStep ? 'bg-teal shadow-[0_0_10px_#4ECDC4]' : 'bg-gray-700'}`}></div>
          <div className="flex-1">
            <h4 className={`text-sm font-bold ${idx <= currentStep ? 'text-white' : 'text-gray-500'}`}>{step}</h4>
            <p className="text-[10px] text-gray-500 mt-0.5">Updated by Medical Team</p>
          </div>
        </div>
      ))}
    </div>
  );
}

