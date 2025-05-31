import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import { updateUserInfo, updateProfileImage } from "../api/user";
import "./EditProfile.css";

export default function EditProfile() {
  const { user, login } = useUser();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    college: "",
    major: "",
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [uploadImage, setUploadImage] = useState(null);

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        college: user.college || "",
        major: user.major || "",
      });
      setPreviewImage(user.profile_url || null);
    }
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
      setUploadImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    try {
      const res1 = await updateUserInfo(form);
      let updatedUser = res1.data.member;

      if (uploadImage) {
        const res2 = await updateProfileImage(uploadImage);
        updatedUser = res2.data.member;
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
    }
  };

  return (
    <div className="edit-profile-container">
      <h2>정보 수정</h2>
      <img
        src={previewImage || "/default-profile.png"}
        alt="Profile"
        width="100"
        height="100"
        style={{ borderRadius: "50%", objectFit: "cover", marginBottom: "1rem" }}
      />
      <input type="file" accept="image/*" onChange={handleImageChange} />

      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="이름"
      />
      <input
        name="college"
        value={form.college}
        onChange={handleChange}
        placeholder="소속(단과대)"
      />
      <input
        name="major"
        value={form.major}
        onChange={handleChange}
        placeholder="전공"
      />
      <button onClick={handleSave}>저장</button>
    </div>
  );
}