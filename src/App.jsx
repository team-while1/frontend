import Header from './components/Header';
import Home from './pages/Home';
import CategoryPage from './pages/CategoryPage';
import ClubDetail from './pages/ClubDetail';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import FindAccount from './pages/FindAccount';
import NotFound from './pages/NotFound'; 
import Write from './pages/Write';
import MyPage from './pages/myPage';
import EditProfile from './pages/EditProfile'; 
import { UserProvider } from './contexts/UserContext'; // ✅ 정확한 경로 확인
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

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

        <Route path="/create" element={<Write />} />

        {/*마이 페이지*/}
        <Route path="/mypage" element={<MyPage />} />
        {/*정보 수정*/}
        <Route path="/edit" element={<EditProfile />} />
        {/* 모임 상세 */}
        <Route path="/:category/:id" element={<ClubDetail />} />

        {/* 인증 */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/find" element={<FindAccount />} />

        {/* 예외 */}
        <Route path="*" element={<NotFound />} /> {/* 선택사항 */}
      </Routes>
      <Footer /> {/* 항상 하단에 고정 */}
      </UserProvider>
    </>
  );
}

export default App;