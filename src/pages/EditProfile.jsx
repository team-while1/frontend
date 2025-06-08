import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import { updateUserInfo, updateProfileImage } from "../api/user";
import "../styles/EditProfile.css";

export default function EditProfile() {
  const { user, login } = useUser();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    college: "",
    major: "",
  });

  // ⭐️ 추가: 초기 사용자 정보를 저장하여 변경 여부 비교
  const [initialUserForm, setInitialUserForm] = useState({
    name: "",
    college: "",
    major: "",
  });

  const colleges = {
    "미래융합대학": [
      "안전융합공학과",
      "건설방재융합공학과",
      "스포츠복지학과",
      "복지·경영학과",
      "스마트철도교통공학과",
      "이차전지공학과"
    ],
    "융합기술대학": [
      "기계공학과", "자동차공학과", "항공·기계설계학과", "전기공학과", "전자공학과",
      "컴퓨터공학과", "컴퓨터소프트웨어학과", "AI로봇공학과", "바이오메디컬융합학과", "정밀의료·의료기기학과"
    ],
    "공과대학": [
      "사회기반공학전공", "환경공학전공", "도시·교통공학전공", "화공생물공학과",
      "반도체신소재공학과", "나노화학소재공학과", "산업경영공학과", "안전공학과",
      "건축공학과", "건축학과", "산업디자인학과", "커뮤니케이션디자인학과"
    ],
    "인문대학": [
      "영어영문학과", "중국어학과", "한국어문학과", "음악학과",
      "스포츠의학과", "스포츠산업학과"
    ],
    "사회과학대학": [
      "행정학과", "행정정보융합학과", "경영학과", "융합경영학과",
      "국제무역학과", "사회복지학과", "항공서비스학과", "항공운항학과",
      "유아교육학과", "미디어&콘텐츠학과"
    ],
    "보건생명대학": [
      "간호학과", "물리치료학과", "응급구조학과", "식품공학전공", "식품영양학전공",
      "생명공학전공", "유아특수교육학과", "IT융합응용학과", "화장품산업학과", "천연물소재학과"
    ],
    "철도대학": [
      "철도경영·물류학과", "데이터사이언스전공", "인공지능전공",
      "철도운전시스템공학과", "철도차량시스템공학과", "철도인프라공학과", "철도전기정보공학과"
    ],
    "교양학부/자유전공학부/창의융합학부": [
      "교양학부", "자유전공학부", "창의융합학부"
    ]
  };

  const [previewImage, setPreviewImage] = useState(null);
  const [uploadImage, setUploadImage] = useState(null); // File 객체 자체를 저장

  useEffect(() => {
    if (user) {
      // ⭐️ 사용자 정보를 폼 필드에 초기 로드
      const currentUserForm = {
        name: user.name || "",
        college: user.college || "",
        major: user.major || "",
      };
      setForm(currentUserForm);
      setInitialUserForm(currentUserForm); // 초기값을 저장하여 나중에 변경 여부 비교
      setPreviewImage(user.profile_url || "/images/profile/anonymous.png");
    }
  }, [user]); // user 객체 의존성 유지

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result); // 미리보기 이미지로
      };
      reader.readAsDataURL(file);
      setUploadImage(file);  // ⭐️ File 객체 자체를 저장 (FormData에 추가하기 위함)
    };


  const handleSave = async () => {
    try {
      setLoading(true);
      let updatedUser = user; // 기본적으로 현재 사용자 정보로 시작

      // ⭐️ 변경된 필드만 추려내기
      const changedData = {};
      if (form.name !== initialUserForm.name) changedData.name = form.name;
      if (form.college !== initialUserForm.college) changedData.college = form.college;
      if (form.major !== initialUserForm.major) changedData.major = form.major;

      // 이름, 단과대, 전공 필드에 변경 사항이 있을 때만 API 호출
      if (Object.keys(changedData).length > 0) {
        const res1 = await updateUserInfo(changedData);
        updatedUser = res1.data.member;
      }

      // 프로필 이미지 변경 요청이 있을 때만 API 호출
      if (uploadImage) {
        const formData = new FormData();
        formData.append('profile_image', uploadImage); // 'profile_image'는 백엔드가 기대하는 필드명

        // updateProfileImage 함수는 이제 FormData를 받도록 수정됨 (user.js 확인)
        const res2 = await updateProfileImage(formData);
        updatedUser = res2.data.member; // 최신 사용자 정보로 업데이트
      }

      login(updatedUser);
      localStorage.setItem("loginUser", JSON.stringify(updatedUser));
      alert("정보가 수정되었습니다.");
      navigate("/mypage");
    } catch (err) {
      console.error("회원 정보 수정 실패:", err);
      alert(
        err.response?.data?.error ||
          "정보 수정 중 오류가 발생했습니다. 다시 시도해주세요."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <h2 className="titleWrap">프로필 수정</h2>

      <div className="contentWrap">
        <div className="inputTitle">프로필 이미지</div>
        <img
          src={previewImage || "/images/profile/anonymous.png"}
          alt="Profile"
          width="100"
          height="100"
          style={{ borderRadius: "50%", objectFit: "cover", marginBottom: "1rem" }}
        />
        <input type="file" accept="image/*" onChange={handleImageChange} />

        <div className="inputTitle">이름</div>
        <div className="inputWrap">
          <input
            className="input"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="이름"
          />
        </div>

        <div className="inputTitle">단과대</div>
        <div className="inputWrap">
          <select
            name="college"
            value={form.college}
            onChange={handleChange}
            className="input"
          >
            <option value="">단과대 선택</option>
            {Object.keys(colleges).map((college) => (
              <option key={college} value={college}>{college}</option>
            ))}
          </select>
        </div>

        <div className="inputTitle">전공</div>
        <div className="inputWrap">
          <select
            name="major"
            value={form.major}
            onChange={handleChange}
            className="input"
            disabled={!form.college}
          >
            <option value="">전공 선택</option>
            {form.college && colleges[form.college].map((major) => (
              <option key={major} value={major}>{major}</option>
            ))}
          </select>
        </div>

        <button className="bottomButton" onClick={handleSave} disabled={loading}>
          {loading ? "저장 중..." : "저장"}
        </button>
      </div>
    </div>
  );
}