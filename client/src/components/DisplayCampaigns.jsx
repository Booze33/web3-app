import React from 'react';
import { UseNavigate} from 'react-router-dom';
import FundCard from './FundCard';
import { loader } from '../assets';

const DisplayCampaigns = ({ title, isLoading, campaigns }) => {
  const navigate = useNavigate();

  const handleNavigate = (campaign) => {
    navigate(`/campaign-details/${campaign.title}`, { state: campaign });
  }

  return(
    <div>
      <h1 calssName="font-epilogue font-semibold text-white text-left text-[18px]">{title} ({campaigns.length})</h1>

      <div className="flex flex-wrap mt-[20px] gap-[26px]">
        {isLoading && (
          <img src={loader} alt="loader" className="w-[100px] h-[100px] object-contain" />
        )}

        {isLoading && campaigns.length === 0 && (
          <p className="font-epilogue font-semibold text-[#818183] leading-[30px] text-[14px]">
            You Have not created any Campaigns yet.
          </p>
        )}

        {!isLoading && campaigns.length > 0 && campaigns.map ((campaign) => 
        <FundCard
          key={campaign.id}
          {...campaign}
          handleClick={() => handleNavigate(campaign)}
        />)}
      </div>
    </div>
  )
}

export default DisplayCampaigns;