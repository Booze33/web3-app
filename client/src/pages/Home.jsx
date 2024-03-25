import React, { useState, useEffect, lazy, Suspense } from 'react';

const DisplayCampaigns = lazy(() => import('../components/DisplayCampaigns'));
const useStateContextPromise = lazy(() => import('../context').then(module => {
  return { default: module.useStateContext }
}));

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const useStateContext = Suspense.pending;

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const { getCampaigns } = await useStateContext;
    const data = await getCampaigns();
    setCampaigns(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (useStateContext !== Suspense.pending) fetchCampaigns();
  }, [useStateContext]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DisplayCampaigns
        title="All Campaigns"
        isLoading={isLoading}
        campaigns={campaigns}
      />
    </Suspense>
  );
};

export default Home;
