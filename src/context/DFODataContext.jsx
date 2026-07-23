/**
 * DFODataContext — provides live DFO metric overrides across the app.
 *
 * When the DFO Metrics Entry form is submitted, it calls `updateDFOMetrics(dfoId, payload)`
 * which merges the new values into the override store.  DFODetailPage reads from this
 * context and merges overrides on top of the static base data from dfoDetailData.js.
 */
import { createContext, useContext, useState, useCallback } from 'react';

const DFODataContext = createContext(null);


export function DFODataProvider({ children }) {
  // overrides: { [dfoId]: { msmeCatered, queriesResolved, avgTAT, schemeApps, conversionRate, campaignsConducted, totalParticipants, budgetUtilised, remarks } }
  const [overrides, setOverrides] = useState({});

  const updateDFOMetrics = useCallback((dfoId, payload) => {
    setOverrides(prev => ({
      ...prev,
      [dfoId]: { ...(prev[dfoId] ?? {}), ...payload },
    }));
  }, []);

  const getOverride = useCallback((dfoId) => overrides[dfoId] ?? null, [overrides]);

  return (
    <DFODataContext.Provider value={{ overrides, updateDFOMetrics, getOverride }}>
      {children}
    </DFODataContext.Provider>
  );
}

export function useDFOData() {
  const ctx = useContext(DFODataContext);
  if (!ctx) throw new Error('useDFOData must be used inside DFODataProvider');
  return ctx;
}
