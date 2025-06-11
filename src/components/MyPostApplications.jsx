import React, { useEffect, useState } from "react";
import axios from "../api/axiosInstance";
import { useUser } from "../contexts/UserContext";

function MyPostApplications() {
  const [myPosts, setMyPosts] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    const fetchMyPosts = async () => {
      try {
        const res = await axios.get(`/api/member/${user.id}/posts`);
        setMyPosts(res.data);
      } catch (err) {
        console.error("내 게시글 신청 내역 불러오기 실패:", err);
      }
    };

    if (user?.id) fetchMyPosts();
  }, [user]);

  return (
    <div>
      <h3>내 게시글에 들어온 신청 목록</h3>
      <ul>
        {myPosts.map((post) => (
          <li key={post.id}>
            <strong>{post.title}</strong> - 신청자 수: {post.appliedCount || 0}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MyPostApplications;