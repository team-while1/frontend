import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Write from './pages/Write';
import ClubDetail from './pages/ClubDetail';

function ClubApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Write />} />
        <Route path="/detail" element={<ClubDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default ClubApp; 