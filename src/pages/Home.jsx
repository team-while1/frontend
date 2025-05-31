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
import './Home.css'; // 👈 CSS 분리
import emptyImg from '../assets/empty_img.png';

export default function Home() {
  const navigate = useNavigate();

  const categories = [
    {
      title: (
        <>
          Student<br />
          Organization
        </>
      ),
      path: "/club",
      content: "동아리",
    },
    {
      title: (
        <>
          Study<br />
          Group
        </>
      ),
      path: "/study",
      content: "스터디",
    },
    {
      title: "Contest",
      path: "/competition",
      content: "공모전",
    },
    {
      title: "Others",
      path: "/etc",
      content: "기 타",
    },
  ];

  // 하얀 카드에 들어갈 임시 데이터 (실제 데이터로 교체 필요)

const contentCardsData = [
  {
    id: 1,
    title: "팀원 모집: 웹 개발 스터디",
    description: "리액트 기반 웹 개발 스터디 팀원 모집합니다.",
    imageUrl: emptyImg,
    path: "/posts/1"
  },
  {
    id: 2,
    title: "새로운 공모전 정보",
    description: "2025년 전국 대학생 아이디어 공모전",
    imageUrl: emptyImg,
    path: "/posts/2"
  },
  {
    id: 3,
    title: "학생회 행사 안내",
    description: "새내기 환영회, 5월 15일!",
    imageUrl: emptyImg,
    path: "/posts/3"
  },
  {
    id: 4,
    title: "자율주행 동아리 모집",
    description: "AI 자율주행 기술 배우고 프로젝트 함께해요.",
    imageUrl: emptyImg,
    path: "/posts/4"
  },
  {
    id: 5,
    title: "취업 특강: 성공적인 이직 전략",
    description: "현직자의 생생한 경험담과 현실적인 조언.",
    imageUrl: emptyImg,
    path: "/posts/5"
  },
  {
    id: 6,
    title: "교내 시설 개선 건의",
    description: "도서관 좌석 추가 및 휴게 공간 확충 제안.",
    imageUrl: emptyImg,
    path: "/posts/6"
  },
  {
    id: 7,
    title: "봉사 활동 모집: 지역 아동 멘토링",
    description: "따뜻한 마음으로 아이들의 성장을 도와주세요.",
    imageUrl: emptyImg,
    path: "/posts/7"
  },
  {
    id: 8,
    title: "KUNNECT 앱 개발 해커톤",
    description: "혁신적인 아이디어로 KUNNECT의 미래를 만들어요.",
    imageUrl: emptyImg,
    path: "/posts/8"
  }
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