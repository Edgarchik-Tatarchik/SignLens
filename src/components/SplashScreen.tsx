import { useEffect, useState } from 'react'

interface SplashScreenProps {
  onFinish: () => void
}

export function SplashScreen({ onFinish }: SplashScreenProps) {
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFadeOut(true), 1500)
    const finishTimer = setTimeout(onFinish, 2000)

    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(finishTimer)
    }
  }, [onFinish])

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-gray-900 transition-opacity duration-500 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <h1 className="text-6xl font-bold tracking-tight mb-3">
        <span className="text-white">Snap</span><span className="text-blue-400">GO</span>
      </h1>
      <p className="text-gray-400 text-sm">見て、撮って、覚える</p>
    </div>
  )
}