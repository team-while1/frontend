import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import CategoryPage from './pages/CategoryPage';
import MeetingDetail from './pages/MeetingDetail';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import FindAccount from './pages/FindAccount';
import NotFound from './pages/NotFound'; // 선택
import CreateMeeting from './pages/CreateMeeting'; // ← import 추가
import { UserProvider } from './contexts/UserContext';


function App() {
  return (
    <>
      <UserProvider>
      <Header />
      <Routes>
        {/* 메인 */}
        <Route path="/" element={<Home />} />

        {/* 카테고리별 모임 목록 */}
        <Route path="/club" element={<CategoryPage title="동아리" />} />
        <Route path="/study" element={<CategoryPage title="스터디·비교과" />} />
        <Route path="/competition" element={<CategoryPage title="공모전" />} />
        <Route path="/etc" element={<CategoryPage title="기타" />} />

        <Route path="/create" element={<CreateMeeting />} />

        {/* 모임 상세 */}
        <Route path="/:category/:id" element={<MeetingDetail />} />

        {/* 인증 */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/find" element={<FindAccount />} />

        {/* 예외 */}
        <Route path="*" element={<NotFound />} /> {/* 선택사항 */}
      </Routes>
      </UserProvider>
    </>
  );
}

export default App;