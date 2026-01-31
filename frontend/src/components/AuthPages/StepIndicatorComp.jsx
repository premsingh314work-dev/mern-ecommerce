import React from "react";

function StepIndicatorComp({ steps, currentStep }) {
  return (
    <div className="w-full h-20 flex items-center justify-center gap-1 px-3">
      {steps.map((stepName, index) => (
        <div
          key={stepName}
          className="flex flex-col items-center justify-center text-center"
        >
          <h1
            className={`${
              index <= currentStep ? "text-amber-500" : "text-black"
            } text-sm font-semibold`}
          >
            {index + 1}
          </h1>

          <div
            className={`${
              index <= currentStep ? "bg-amber-500" : "bg-gray-300"
            } rounded-full h-8 w-20 flex items-center justify-center`}
          >
            <h2 className="text-xs font-medium">{stepName}</h2>
          </div>
        </div>
      ))}
    </div>
  );
}

export default StepIndicatorComp;
