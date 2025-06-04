import { useNavigate } from 'react-router-dom';
import './Home.css'; // 👈 CSS 분리
import emptyImg from '../assets/empty_img.png';

export default function Home() {
  const navigate = useNavigate();

  const categories = [
    { title: "동아리", path: "/club", emoji: "😊" },
    { title: "스터디·비교과", path: "/study", emoji: "📚" },
    { title: "공모전", path: "/competition", emoji: "🏆" },
    { title: "기타", path: "/etc", emoji: "🎨" },
  ];

  return (
    <>

      <section className="main-category-section-wrapper">
        <div className="logo-container">
          <img src="KNN.png" alt="KUNNECT Logo" width="150"/> 
        </div>
        <div className="home-container">
          {categories.map((cat) => (
            <div
              key={cat.path}
              className="category-card-home"
              onClick={() => navigate(cat.path)}
            >
              <div className="card-inner">
                <div className="category-title">{cat.title}</div>
                <div className="category-content">{cat.content}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="main-content-section-wrapper">
        <h2 className="section-title">최신 소식 및 추천 활동</h2>
        <div className="sub-container">
          {contentCardsData.map((item) => (
            <div
              key={item.id}
              className="category-card-sub"
              onClick={() => navigate(item.path)}
            >
              <div className="sub-card-content">
                <img
                  className="sub-card-image"
                  src={item.imageUrl}
                  alt={item.title}
                  onError={(e) => (e.target.style.display = 'none')}
                />
                <h3 className="sub-card-title">{item.title}</h3>
                <p className="sub-card-description">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 푸터 */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-left">
            <h4>KUNNECT</h4>
            <p>한국교통대학교 학생들을 위한 모임 플랫폼</p>
            <p>팀 While(1) | 프로젝트명: KUNNECT</p>
            <p>문의: kunnect.team@gmail.com</p>
            <p>&copy; 2025 KUNNECT. All rights reserved.</p>
          </div>
          <div className="footer-right">
            <p>주소: 충청북도 충주시 대소원면 대학로 50</p>
            <p>창립: 2012년 3월, 충주시</p>
            <p>학생 수: 8,254 (2020년)</p>
            <p>전화번호: 043-841-5114</p>
            <p>영업시간: 오전 9:00에 영업 시작</p>
            <p>종류: 국립 대학교</p>
            <p>총장: 윤승조</p>
            <p>표어: CONNECT THE WORLD</p>
          </div>
        </div>
      </footer>
    </>

//   <>
//   <div className="home-container">
//     {categories.map((cat)=> (
//      <div
//        key={cat.path} 
//        className="category-card-home" 
//        onClick={() => navigate(cat.path)}>
//       <div className="card-inner">
//         <div className="category-title">{cat.title}</div>
//         <div className="category-content">{cat.content}</div>
//       </div>
//     </div>
//     ))}
//   </div>
// </>

  );
}