import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import {createPost} from '../api/post';
import axios from '../api/axiosInstance';
import '../styles/Write.css';

function Write() {
  const navigate = useNavigate();
  const { user } = useUser();

  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  // const [period, setPeriod] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [people, setPeople] = useState("");
  // 🚨 추가: category 상태와 setCategory 함수 선언
  const [category, setCategory] = useState('');

  const [totalSlots, setTotalSlots] = useState('');


  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected && !selected.type.startsWith("image/")) {
      alert("이미지 파일만 업로드할 수 있습니다.");
      return;
    }
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };


  const handleSubmit = (e) => {
    const period = `${startDate} ~ ${endDate}`;

    e.preventDefault();
    const newErrors = {};
    if (!author.trim()) newErrors.author = "작성자를 입력해주세요.";
    if (!title.trim()) newErrors.title = "제목을 입력해주세요.";
    if (!content.trim()) newErrors.content = "내용을 입력해주세요.";
    if (!period.trim()) newErrors.period = "모집 기간을 입력해주세요.";
    // 🚨 추가: category 유효성 검사
    if (!category.trim()) newErrors.category = "카테고리를 입력해주세요.";
    // 🚨 추가: totalSlots 유효성 검사
    if (!totalSlots || isNaN(totalSlots) || parseInt(totalSlots) <= 0) {
      newErrors.totalSlots = "유효한 모집 인원 (숫자)을 입력해주세요.";
    }


    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (!people.trim()) newErrors.people = "모집 인원을 입력해주세요.";

    setErrors({});
    setLoading(true);

    setTimeout(() => {
      navigate("/detail", {
        state: {
          author,
          title,
          content,
          period,
          people,
          category, // 🚨 추가: category 값도 state에 포함
          totalSlots, // 🚨 추가: totalSlots 값도 state에 포함
          imageUrl: preview,
        },
      });
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="write-layout">
      {/* 사이드바 */}
      {/* <aside className="sidebar">
        <h2>KNUNNECT :</h2>
        <input placeholder="Search..." />
        <p className="sidebar-label">동아리 모집 게시판</p>
      </aside> */}

      {/* 메인 */}
      <main className="write-main">
        <div className="form-wrapper">
          <h3 className="form-title">글 작성하기</h3>
          <form onSubmit={handleSubmit} className="write-form">
            <label>작성자</label>
            <input value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="작성자 이름"/>
            {errors.author && <p className="error-msg">{errors.author}</p>}

            <label>제목</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} />
            {errors.title && <p className="error-msg">{errors.title}</p>}

            <label>카테고리</label>
            <input
              value={category} // 🚨 이제 category가 정의됨
              onChange={(e) => setCategory(e.target.value)} // 🚨 이제 setCategory가 정의됨
              placeholder="예: 동아리, 스터디, 공모전 등"
            />
            {errors.category && <p className="error-msg">{errors.category}</p>}

            <label>모집 인원 (숫자)</label>
            <input
              type="number"
              value={totalSlots} // 🚨 이제 totalSlots가 정의됨
              onChange={(e) => setTotalSlots(e.target.value)} // 🚨 이제 setTotalSlots가 정의됨
            />
            {errors.totalSlots && <p className="error-msg">{errors.totalSlots}</p>}

            <label>내용</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            {errors.content && <p className="error-msg">{errors.content}</p>}

            {/* <label>모집 기간</label>
            <input
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              placeholder="예: 2025.06.01 ~ 2025.06.30"
            />
            {errors.period && <p className="error-msg">{errors.period}</p>} */}
            <label>모집 기간</label>
            <div className="date-range">
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="date-input"
              />
              <span className="tilde">~</span>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="date-input"
              />
            </div>
            {errors.startDate && <p className="error-msg">{errors.startDate}</p>}
            {errors.endDate && <p className="error-msg">{errors.endDate}</p>}
            {/* <label>모집 인원</label>
            <input
              value={people}
              onChange={(e) => setPeople(e.target.value)}
              placeholder="예: 10명"
            />
            {errors.people && (
              <p className="error-msg">{errors.people}</p>
            )} */}

            <label>이미지 파일 첨부</label>
            <input type="file" accept="image/*" onChange={handleFileChange} />

            {preview ? (
              <img src={preview} alt="미리보기" className="preview" />
            ) : (
              <p className="no-image">선택된 이미지가 없습니다</p>
            )}

            <div className="button-box">
              <button type="submit" className="btn primary" disabled={loading}>
                {loading ? "등록 중..." : "글 등록하기"}
              </button>
              <button
                type="button"
                className="btn secondary"
                onClick={() => navigate("/club")}
              >
                목록보기
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default Write;