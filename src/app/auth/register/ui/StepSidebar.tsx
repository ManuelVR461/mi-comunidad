export const StepSidebar = ({ steps, currentStep }: { steps: { id: number; title: string }[]; currentStep: number }) => {
  return (

    <div className="text-white max-w-md space-y-4">
      <h1 className="text-4xl font-bold">Registro</h1>
      <ul className="space-y-2">
        {steps.map((step) => (
          <li
            key={step.id}
            className={`flex items-center space-x-3 ${step.id === currentStep ? "text-accent font-semibold" : "text-gray-300"
              }`}
          >
            <span
              className={`w-8 h-8 flex items-center justify-center rounded-full border ${step.id === currentStep ? "border-accent" : "border-gray-500"
                }`}
            >
              {step.id}
            </span>
            <span>{step.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
