import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CommonButton from "../components/CommonButton";
import SearchBar from "../components/SearchBar";
import CategoryCard from "../components/CategoryCard";
import useSearch from "../hooks/useSearch";
import useCategoryFromPath from "../hooks/useCategoryFromPath";
import "../styles/CategoryPage.css";
import FilterPanel from "../components/FilterPanel";
import axios from "../api/axiosInstance";

export default function CategoryPage({ title }) {
  const navigate = useNavigate();
  const category = useCategoryFromPath();
  const [search, setSearch] = useState("");
  const [meetings, setMeetings] = useState([]);

  const categories = [
    { label: "동아리", path: "/club" },
    { label: "스터디·비교과", path: "/study" },
    { label: "공모전", path: "/competition" },
    { label: "기타", path: "/etc" },
  ];

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const response = await axios.get(`/api/posts?category=${category}`);
        console.log("✅ 불러온 모임 데이터:", response.data);
        setMeetings(response.data);
      } catch (err) {
        console.error("❌ 모임 데이터를 불러오는 데 실패했습니다:", err);
      }
    };

    fetchMeetings();
  }, [category]);

  const [filters, setFilters] = useState({
    onlySupported: false,
    onlyNotEnded: false,
    minHours: 0,
  });

  const filteredMeetings = useSearch(meetings, search);

  return (
    <div className="category-page">
      <div className="category-nav tab-group">
        {categories.map((cat) => (
          <button
            key={cat.path}
            className={`tab-button ${
              cat.path === `/${category}` ? "active" : ""
            }`}
            onClick={() => navigate(cat.path)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="category-header">
        <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} />
        <FilterPanel filters={filters} setFilters={setFilters} />
        <CommonButton onClick={() => navigate("/create")}>
          + 모임 추가
        </CommonButton>
      </div>

      <div className="line" />

      {filteredMeetings.length === 0 ? (
        <div className="empty-wrapper-inline">
          <p className="empty-text">아직 등록된 모임이 없습니다.</p>
        </div>
      ) : (
        <div className="category-list">
          {/* ✅ 게시글 카드 클릭 시 정확한 ID 기반으로 navigate */}
          {filteredMeetings.map((meeting) => {
            console.log("🧾 개별 meeting:", meeting);

            const id = meeting.post_id || meeting.id;

            return (
              <CategoryCard
                key={id}
                meeting={meeting}
                onClick={() => {
                  if (!id) {
                    console.warn("⚠️ 유효하지 않은 게시글 ID:", meeting);
                    alert("이 게시글은 이동할 수 없습니다.");
                    return;
                  }
                  console.log("➡️ 이동할 게시글 ID:", id);
                  navigate(`/${category}/${id}`);
                }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}