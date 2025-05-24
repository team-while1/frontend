
// ✅ 2. src/hooks/useCategoryFromPath.js
import { useLocation } from "react-router-dom";

export default function useCategoryFromPath() {
  const location = useLocation();
  return location.pathname.replace("/", "");
}
