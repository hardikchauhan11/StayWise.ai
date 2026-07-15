export const CURRENCIES = [
  { code: 'USD', symbol: '$', name: 'US Dollar', rate: 1 },
  { code: 'EUR', symbol: '€', name: 'Euro', rate: 0.92 },
  { code: 'GBP', symbol: '£', name: 'British Pound', rate: 0.79 },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee', rate: 83.12 },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen', rate: 149.50 },
  { code: 'THB', symbol: '฿', name: 'Thai Baht', rate: 35.20 },
  { code: 'MVR', symbol: 'MVR', name: 'Maldivian Rufiyaa', rate: 15.40 },
  { code: 'IDR', symbol: 'Rp', name: 'Indonesian Rupiah', rate: 15600 },
]

export function convertPrice(amountInUSD, currency) {
  const selected = CURRENCIES.find(c => c.code === currency) || CURRENCIES[0]
  const converted = amountInUSD * selected.rate
  return {
    amount: converted,
    symbol: selected.symbol,
    code: selected.code,
  }
}

export function formatPrice(amountInUSD, currency = 'USD') {
  const { amount, symbol, code } = convertPrice(amountInUSD, currency)
  if (code === 'JPY' || code === 'IDR') {
    return `${symbol}${Math.round(amount).toLocaleString()}`
  }
  return `${symbol}${amount.toFixed(2)}`
}
