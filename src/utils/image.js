/**
 * Utility to get full image URL from backend path
 * @param {string} path - The relative path from the backend (e.g., /uploads/...)
 * @returns {string|null} - The full URL to the image
 */
export const getImageUrl = (path) => {
  if (!path) return null;
  
  // If path is already a full URL, return it as is
  if (path.startsWith('http')) return path;
  
  const baseUrl = import.meta.env.VITE_API_BASE_URL || '';
  // Ensure we don't have double slashes if baseUrl ends with /
  const sanitizedBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  
  // Ensure path starts with /
  const sanitizedPath = path.startsWith('/') ? path : `/${path}`;
  
  return `${sanitizedBaseUrl}${sanitizedPath}`;
};
