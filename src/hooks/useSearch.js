// ✅ 1. src/hooks/useSearch.js
export const normalize = (text) => text.toLowerCase().replace(/\s+/g, '');

export default function useSearch(data, keyword) {
  const normalizedKeyword = normalize(keyword);

  return data.filter((item) =>
    normalize(item.title).includes(normalizedKeyword) ||
    normalize(item.description).includes(normalizedKeyword) ||
    normalize(item.creator).includes(normalizedKeyword)
  );
}

