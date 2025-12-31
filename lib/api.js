const BASE_URL = 'https://api.sansekai.my.id/api/melolo';

export const fetchAPI = async (endpoint) => {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, { 
      cache: 'no-store',
      headers: {
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15',
      }
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (e) {
    return null;
  }
};

export const getTrending = () => fetchAPI('/trending');
export const getLatests = () => fetchAPI('/latest');
export const getDetail = (bookId) => fetchAPI(`/detail?bookId=${bookId}`);
export const getStream = (videoId) => fetchAPI(`/stream?videoId=${videoId}`);
export const searchDramas = (query) => fetchAPI(`/search?query=${encodeURIComponent(query)}&limit=10&offset=0`);
