const BASE_URL = 'https://api.sansekai.my.id/api/melolo';

export const fetchAPI = async (endpoint) => {
  const isServer = typeof window === 'undefined';
  
  // Jika server, langsung ke target. Jika client, gunakan path relatif ke proxy internal
  const url = isServer 
    ? `${BASE_URL}${endpoint}` 
    : `/api/proxy?endpoint=${encodeURIComponent(endpoint)}`;

  try {
    const res = await fetch(url, {
      cache: 'no-store',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'application/json',
      }
    });

    if (!res.ok) throw new Error(`Status: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error("Fetch API Error:", error.message);
    return null; // Balikin null supaya tidak crash
  }
};

export const getTrending = () => fetchAPI('/trending');
export const getLatests = () => fetchAPI('/latest');
export const getDetail = (bookId) => fetchAPI(`/detail?bookId=${bookId}`);
export const getStream = (videoId) => fetchAPI(`/stream?videoId=${videoId}`);
export const searchDramas = (query) => fetchAPI(`/search?query=${query}&limit=10&offset=0`);
