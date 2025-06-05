import { useNavigate } from 'react-router-dom';
import '../styles/Home.css'; // 👈 CSS 분리
import emptyImg from '../assets/empty_img.png';
import PageLayout from '../components/PageLayout';

export default function Home() {
  const navigate = useNavigate();

  const categories = [
    { title: "동아리", content: "Student Organization",path: "/club", emoji: "😊" },
    { title: "스터디·비교과", content: "Study Group",path: "/study", emoji: "📚" },
    { title: "공모전", content: "Contest",path: "/competition", emoji: "🏆" },
    { title: "기타", content: "Others",path: "/etc", emoji: "🎨" },
  ];

  return (

      <section className="main-category-section-wrapper">
        <div className="logo-container">
          <img src="logo3.png" alt="KUNNECT Logo" width="150"/> 
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
  );
}