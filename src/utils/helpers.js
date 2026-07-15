export function formatDate(dateString) {
  const options = { year: 'numeric', month: 'short', day: 'numeric' }
  return new Date(dateString).toLocaleDateString('en-US', options)
}

export function formatPrice(price) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

export function formatDateRange(checkIn, checkOut) {
  const start = new Date(checkIn)
  const end = new Date(checkOut)
  const options = { month: 'short', day: 'numeric' }
  return `${start.toLocaleDateString('en-US', options)} - ${end.toLocaleDateString('en-US', options)}`
}

export function getNightsCount(checkIn, checkOut) {
  const start = new Date(checkIn)
  const end = new Date(checkOut)
  const diffTime = Math.abs(end - start)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}

export function generateStars(rating) {
  const fullStars = Math.floor(rating)
  const halfStar = rating % 1 >= 0.5 ? 1 : 0
  const emptyStars = 5 - fullStars - halfStar
  return { fullStars, halfStar, emptyStars }
}

export function getImageWithFallback(url, fallbackColor = '#1e293b') {
  if (!url) return `https://via.placeholder.com/800x600/${fallbackColor.replace('#', '')}/ffffff?text=No+Image`
  return url
}

export function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

export function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function truncateText(text, maxLength) {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trim() + '...'
}

export function calculateDiscount(originalPrice, discountedPrice) {
  const discount = Math.round(((originalPrice - discountedPrice) / originalPrice) * 100)
  return Math.max(0, discount)
}

export function getStatusColor(status) {
  switch (status) {
    case 'confirmed':
      return 'text-green-400 bg-green-400/10'
    case 'pending':
      return 'text-yellow-400 bg-yellow-400/10'
    case 'cancelled':
      return 'text-red-400 bg-red-400/10'
    case 'completed':
      return 'text-blue-400 bg-blue-400/10'
    default:
      return 'text-gray-400 bg-gray-400/10'
  }
}

export function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

export function isValidPhone(phone) {
  const re = /^\+?[\d\s-]{10,}$/
  return re.test(phone)
}
