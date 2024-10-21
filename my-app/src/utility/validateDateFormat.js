export const formatDate = (dateString) => {
    // Check if dateString is valid
  if (!dateString || isNaN(new Date(dateString).getTime())) {
    return "Invalid date";
  }

  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-GB', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }).format(date);
  };