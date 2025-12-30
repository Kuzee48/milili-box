const BASE_URL = 'https://api.sansekai.my.id/api/melolo';

export const fetchAPI = async (endpoint) => {
  // Langsung tembak ke API asli dari server (Server-to-Server tidak ada CORS)
  const url = `${BASE_URL}${endpoint}`;

  try {
    const res = await fetch(url, {
      cache: 'no-store',
      headers: {
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
      }
    });

    if (!res.ok) throw new Error(`Fetch Gagal: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error("JOKERBOX API ERROR:", error.message);
    return null;
  }
};

export const getTrending = () => fetchAPI('/trending');
export const getLatests = () => fetchAPI('/latest');
export const getDetail = (bookId) => fetchAPI(`/detail?bookId=${bookId}`);
export const getStream = (videoId) => fetchAPI(`/stream?videoId=${videoId}`);
export const searchDramas = (query) => fetchAPI(`/search?query=${encodeURIComponent(query)}&limit=10&offset=0`);
