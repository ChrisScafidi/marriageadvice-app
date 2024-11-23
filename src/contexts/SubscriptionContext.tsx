import React, { createContext, useContext, useState } from 'react';

interface Plan {
  name: string;
  price: number;
  features: string[];
}

interface SubscriptionContextType {
  selectedPlan: Plan | null;
  setSelectedPlan: (plan: Plan | null) => void;
  isSubscribed: boolean;
  setSubscribed: (value: boolean) => void;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export function SubscriptionProvider({ children }: { children: React.ReactNode }) {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [isSubscribed, setSubscribed] = useState(false);

  return (
    <SubscriptionContext.Provider 
      value={{
        selectedPlan,
        setSelectedPlan,
        isSubscribed,
        setSubscribed,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscription() {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
}