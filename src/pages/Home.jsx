import { useNavigate } from 'react-router-dom';
import './Home.css'; // 👈 CSS 분리

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

  return (
  <div className="home-container">
    {categories.map((cat)=> (
     <div className="category-card-home" onClick={() => navigate(cat.path)}>
      <div className="card-inner">
        <div className="category-title">{cat.title}</div>
        <div className="category-content">{cat.content}</div>
      </div>
    </div>
    ))}
  </div>
  
  );
}