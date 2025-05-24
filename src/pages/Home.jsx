import { useNavigate } from 'react-router-dom';
import './Home.css'; // 👈 CSS 분리

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