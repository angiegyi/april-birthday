export default function WinMessage({ creator, message }) {
  if (!message) return null
  return (
    <div className="mt-8 border border-gray-200 rounded-2xl p-8 bg-gradient-to-br from-yellow-50 to-amber-50 text-center shadow-sm">
      <p className="text-[11px] uppercase tracking-[0.25em] text-gray-400 mb-3 font-semibold">A message from {creator}</p>
      <p className="text-lg font-semibold text-black leading-snug">"{message}"</p>
      <p className="text-3xl mt-4">🎂🎉🎈</p>
    </div>
  )
}
