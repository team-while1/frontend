// import { useNavigate } from 'react-router-dom';
// import './Home.css'; // 👈 CSS 분리

// export default function Home() {
//   const navigate = useNavigate();

// const categories = [
//   {
//     title: (
//       <>
//         Student<br />
//         Organization
//       </>
//     ),
//     path: "/club",
//     content: "동아리",
//   },
//   {
//     title: (
//       <>
//         Study<br />
//         Group
//       </>
//     ),
//     path: "/study",
//     content: "스터디",
//   },
//   {
//     title: "Contest",
//     path: "/competition",
//     content: "공모전",
//   },
//   {
//     title: "Others",
//     path: "/etc",
//     content: "기 타",
//   },
// ];

//   return (
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
//   <div className="sub-container">
//     {categories.map((cat)=> (
//      <div
//        key={cat.path} 
//        className="category-card-sub" 
//        onClick={() => navigate(cat.path)}>
//     </div>
//     ))}
//   </div>
//   <footer className="footer">
//   <div className="footer-content">
//     <div className="footer-left">
//       <h4>KUNNECT</h4>
//       <p>한국교통대학교 학생들을 위한 모임 플랫폼</p>
//       <p>팀 While(1) | 프로젝트명: KUNNECT</p>
//       <p>문의: kunnect.team@gmail.com</p>
//       <p>&copy; 2025 KUNNECT. All rights reserved.</p>
//     </div>
//     <div className="footer-right">

//       <p>주소: 충청북도 충주시 대소원면 대학로 50</p>
//       <p>창립: 2012년 3월, 충주시</p>
//       <p>학생 수: 8,254 (2020년)</p>
//       <p>전화번호: 043-841-5114</p>
//       <p>영업시간: 오전 9:00에 영업 시작</p>
//       <p>종류: 국립 대학교</p>
//       <p>총장: 윤승조</p>
//       <p>표어: CONNECT THE WORLD</p>
//     </div>
//   </div>
// </footer>
// </>
//   );
// }


import { useNavigate } from 'react-router-dom';
import './Home.css'; 
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
    <div className="home-container">
      {categories.map((cat) => (
        <div
          key={cat.path}
          className="category-card"
          onClick={() => navigate(cat.path)}
        >
          <div className="category-emoji">{cat.emoji}</div>
          <div className="category-title">{cat.title}</div>
        </div>
      ))}
    </div>
  );
}
