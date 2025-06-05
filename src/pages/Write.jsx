import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import axios from '../api/axiosInstance';
import '../styles/Write.css';

function Write() {
  const navigate = useNavigate();
  const { user } = useUser();

  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [people, setPeople] = useState('');
  const [category, setCategory] = useState('');
  const [totalSlots, setTotalSlots] = useState('');

  useEffect(() => {
    if (user && user.name) {
      setAuthor(user.name); // 자동 입력
    }
  }, [user]);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected && !selected.type.startsWith('image/')) {
      alert('이미지 파일만 업로드할 수 있습니다.');
      return;
    }
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    const period = `${startDate} ~ ${endDate}`;
  
    // 유효성 검사
    if (!author.trim()) newErrors.author = '작성자를 입력해주세요.';
    if (!title.trim()) newErrors.title = '제목을 입력해주세요.';
    if (!content.trim()) newErrors.content = '내용을 입력해주세요.';
    if (!startDate.trim() || !endDate.trim()) newErrors.period = '모집 기간을 입력해주세요.';
    if (!category.trim()) newErrors.category = '카테고리를 입력해주세요.';
    if (!totalSlots || isNaN(totalSlots) || parseInt(totalSlots) <= 0) {
      newErrors.totalSlots = '유효한 모집 인원 (숫자)을 입력해주세요.';
    }
    if (!people.trim()) newErrors.people = '모집 인원을 입력해주세요.';
  
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
  
    setErrors({});
    setLoading(true);
  
    try {
      const formData = new FormData();
      formData.append('author', author);
      formData.append('title', title);
      formData.append('content', content);
      formData.append('period', period);
      formData.append('people', people);
      formData.append('category', category);
      formData.append('totalSlots', totalSlots);
      if (file) formData.append('image', file); // 이미지도 함께 보냄
  
      await axios.post('/posts', formData); // 서버에 데이터 전송
  
      navigate(`/${category}`);
    } catch (error) {
      console.error('글 등록 실패:', error);
      alert('글 등록에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  
    setTimeout(() => {
      navigate(`/${category}`, {
        state: {
          author,
          title,
          content,
          period,
          people,
          category,
          totalSlots,
          imageUrl: preview,
        },
      });
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="write-layout">
      <main className="write-main">
        <div className="form-wrapper">
          <h3 className="form-title">글 작성하기</h3>
          <form onSubmit={handleSubmit} className="write-form">
            <label>작성자</label>
            <input value={author} disabled readOnly />

            <label>제목</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} />
            {errors.title && <p className="error-msg">{errors.title}</p>}

            <label>카테고리</label>
            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="예: 동아리, 스터디, 공모전 등"
            />
            {errors.category && <p className="error-msg">{errors.category}</p>}

            <label>모집 인원 (숫자)</label>
            <input
              type="number"
              value={totalSlots}
              onChange={(e) => setTotalSlots(e.target.value)}
            />
            {errors.totalSlots && <p className="error-msg">{errors.totalSlots}</p>}

            <label>내용</label>
            <textarea value={content} onChange={(e) => setContent(e.target.value)} />
            {errors.content && <p className="error-msg">{errors.content}</p>}

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
            {errors.period && <p className="error-msg">{errors.period}</p>}

            <label>모집 인원</label>
            <input
              value={people}
              onChange={(e) => setPeople(e.target.value)}
              placeholder="예: 10명"
            />
            {errors.people && <p className="error-msg">{errors.people}</p>}

            <label>이미지 파일 첨부</label>
            <input type="file" accept="image/*" onChange={handleFileChange} />

            {preview ? (
              <img src={preview} alt="미리보기" className="preview" />
            ) : (
              <p className="no-image">선택된 이미지가 없습니다</p>
            )}

            <div className="button-box">
              <button type="submit" className="btn primary" disabled={loading}>
                {loading ? '등록 중...' : '글 등록하기'}
              </button>
              <button
                type="button"
                className="btn secondary"
                onClick={() => navigate('/club')}
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