import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import "./EditProfile.css";

export default function EditProfile() {
  const { user, login } = useUser();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    school: "",
    major: "",
    studentId: "",
    phone: "",
  });

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        school: user.school || "",
        major: user.major || "",
        studentId: user.studentId || "",
        phone: user.phone || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    const updatedUser = { ...user, ...form };
    localStorage.setItem("registeredUser", JSON.stringify(updatedUser));
    login(updatedUser); // context 갱신
    alert("정보가 수정되었습니다.");
    navigate("/mypage");
  };

  return (
    <div className="edit-profile-container">
      <h2>정보 수정</h2>
      <input name="name" value={form.name} onChange={handleChange} placeholder="이름" />
      <input name="school" value={form.school} onChange={handleChange} placeholder="학교" />
      <input name="major" value={form.major} onChange={handleChange} placeholder="학과" />
      <input name="studentId" value={form.studentId} onChange={handleChange} placeholder="학번" />
      <input name="phone" value={form.phone} onChange={handleChange} placeholder="전화번호" />
      <button onClick={handleSave}>저장</button>
    </div>
  );
}