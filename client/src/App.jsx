import React, { lazy, Suspense } from 'react';
import { Route, Routes} from 'react-router-dom';
import { Sidebar, Navbar } from './components';

const CampaignDetails = lazy(() => import('./pages'));
const CreateCampaign = lazy(() => import('./pages'));
const Home = lazy(() => import('./pages'));
const Profile = lazy(() => import('./pages'));

const App = () => {
  return (
    <div className="relative sm:-8 p-4 bg-[#13131a] flex flex-row">
      <div className="sm:flex hidden mr-10 relative">
        <Sidebar />
      </div>
      <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
        <Navbar />

        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/campaign-details/:id" element={<CampaignDetails />} />
            <Route path="/create-campaign" element={<CreateCampaign />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  )
}

export default App;