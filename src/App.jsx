import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import CategoryPage from './pages/CategoryPage';
import PostDetail from './pages/PostDetail';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import FindAccount from './pages/FindAccount';
import NotFound from './pages/NotFound'; 
import Write from './pages/Write';
import MyPage from './pages/myPage';
import EditProfile from './pages/EditProfile'; 
import { UserProvider } from './contexts/UserContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/toast.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <>
      <UserProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/club" element={<CategoryPage title="동아리" />} />
          <Route path="/study" element={<CategoryPage title="스터디·비교과" />} />
          <Route path="/competition" element={<CategoryPage title="공모전" />} />
          <Route path="/etc" element={<CategoryPage title="기타" />} />
          <Route path="/create" element={<Write />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/edit" element={<EditProfile />} />
          <Route path="/:category/:postId" element={<PostDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/find" element={<FindAccount />} />
          <Route path="*" element={<NotFound />} />
          </Routes>
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          closeOnClick
          pauseOnHover
          draggable
          theme="light"
          toastClassName="toast-container"
/>        <Footer />
      </UserProvider>
    </>
  );
}

export default App;