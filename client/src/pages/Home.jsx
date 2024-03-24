import React, { useState, useEffect, lazy, Suspense } from 'react';

const useStateContext = lazy(() => import('../context'));
const DisplayCampaigns = lazy(() => import('../components'));

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const { address, contract, getCampaigns } = useStateContext();

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getCampaigns();
    setCampaigns(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (contract) fetchCampaigns();
  }, [address, contract]);

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