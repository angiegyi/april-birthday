export default function WinMessage({ creator, message }) {
  if (!message) return null
  return (
    <div className="mt-6 border-2 border-black rounded-2xl p-6 bg-yellow-50 text-center">
      <p className="font-ui text-xs uppercase tracking-widest text-gray-400 mb-2">A message from {creator}</p>
      <p className="playfair text-xl font-bold text-black leading-snug">"{message}"</p>
      <p className="text-3xl mt-3">🎂🎉🎈</p>
    </div>
  )
}
