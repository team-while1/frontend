import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import axios from "../api/axiosInstance";
import "../styles/Write.css";

function Write() {
  const navigate = useNavigate();
  const { user } = useUser();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [category, setCategory] = useState("");
  const [totalSlots, setTotalSlots] = useState("");
  const [status, setStatus] = useState("RECRUITING"); // 기본값 설정

  // ✅ 오류 수정된 부분: 파일 선택 핸들러 함수 선언
  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected && !selected.type.startsWith("image/")) {
      alert("이미지 파일만 업로드할 수 있습니다.");
      return;
    }
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!title.trim()) newErrors.title = "제목을 입력해주세요.";
    if (!content.trim()) newErrors.content = "내용을 입력해주세요.";
    if (!category.trim()) newErrors.category = "카테고리를 선택해주세요.";
    if (!startDate) newErrors.startDate = "시작일을 입력해주세요.";
    if (!endDate) newErrors.endDate = "마감일을 입력해주세요.";
    if (!totalSlots || isNaN(totalSlots) || parseInt(totalSlots) <= 0)
      newErrors.totalSlots = "모집 인원을 숫자로 입력해주세요.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    const postData = {
      member_id: user?.id || 1,
      title,
      content,
      categoryId: category,
      startDate,
      endDate,
      totalSlots: Number(totalSlots),
      status,
    };

    try {
      const postRes = await axios.post("/api/posts", postData);
      const postId = postRes.data?.post_id;

      if (file && postId) {
        const formData = new FormData();
        formData.append("post_id", postId);
        formData.append("file", file);

        const fileRes = await axios.post("/api/files", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        const fileId = fileRes.data.file_id;
        console.log("📸 파일 업로드 완료 - file_id:", fileId);
        // imageUrl = fileRes.data[0]?.filePath || ""; 

        // if (imageUrl) {
        //   await axios.patch(`/api/posts/${postId}`, {
        //     image: imageUrl, // 🔄 'image'가 실제 백엔드 필드명인지 확인!
        //   });
        // }
        await axios.patch(`/api/posts/${postId}`, {
          file_id: fileId, // ✅ 백엔드에서 이 필드를 받아야 함
        });
      }

      alert("모집 글이 등록되었습니다.");
      navigate(`/${category}`);
    } catch (err) {
      console.error("등록 실패:", err);
      alert("등록 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="write-layout">
      <main className="write-main">
        <div className="form-wrapper">
          <h3 className="form-title">글 작성하기</h3>
          <form onSubmit={handleSubmit} className="write-form">

            <label>제목</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} />
            {errors.title && <p className="error-msg">{errors.title}</p>}

            <label>카테고리</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="">카테고리 선택</option>
              <option value="club">동아리</option>
              <option value="study">스터디·비교과</option>
              <option value="competition">공모전</option>
              <option value="etc">기타</option>
            </select>
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
            {errors.startDate && <p className="error-msg">{errors.startDate}</p>}
            {errors.endDate && <p className="error-msg">{errors.endDate}</p>}

            <label>모집 상태</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="RECRUITING">모집 중</option>
              <option value="ENDED">모집 종료</option>
            </select>

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