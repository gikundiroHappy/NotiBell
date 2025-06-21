export const formatDate = (timestamp: number | null | undefined): string => {
  if (!timestamp || timestamp < 1000000000) return '';
  const date = new Date(timestamp * 1000); 
  return date.toDateString();
};

export const formatTime = (timestamp: number | null | undefined): string => {
  if (!timestamp || timestamp < 1000000000) return '';
  const date = new Date(timestamp * 1000);
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
};
