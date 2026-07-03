import { useState } from 'react'
import { useAuth } from './hooks/useAuth'
import { SplashScreen } from './components/SplashScreen'
import HomePage from './pages/HomePage'
import { ScanPage } from './pages/ScanPage'
import { SavedScansPage } from './pages/SavedScansPage'
import { QuizPage } from './pages/QuizPage'
import { SettingsPage } from './pages/SettingsPage'
import { StatsPage } from './pages/StatsPage'
import { MapPage } from './pages/MapPage'

type AppScreen = 'home' | 'scan' | 'saved' | 'quiz' | 'settings' | 'stats' | 'map'

function App() {
  useAuth()

  const [showSplash, setShowSplash] = useState(true)

  const initialScreen = (): AppScreen => {
    const params = new URLSearchParams(window.location.search)
    const s = params.get('screen')
    if (s === 'quiz' || s === 'stats' || s === 'saved' || s === 'map') return s
    return 'home'
  }

  const [screen, setScreen] = useState<AppScreen>(initialScreen)

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />
  }

  if (screen === 'home') return (
    <HomePage
      onStartCamera={() => setScreen('scan')}
      onViewSaved={() => setScreen('saved')}
      onStartQuiz={() => setScreen('quiz')}
      onOpenSettings={() => setScreen('settings')}
      onOpenStats={() => setScreen('stats')}
      onOpenMap={() => setScreen('map')}
    />
  )

  if (screen === 'scan') return (
    <ScanPage onGoHome={() => setScreen('home')} />
  )

  if (screen === 'saved') return (
    <SavedScansPage onBack={() => setScreen('home')} />
  )

  if (screen === 'quiz') return (
    <QuizPage onExit={() => setScreen('home')} />
  )

  if (screen === 'settings') return (
    <SettingsPage onBack={() => setScreen('home')} />
  )

  if (screen === 'stats') return (
    <StatsPage onBack={() => setScreen('home')} onStartQuiz={() => setScreen('quiz')} />
  )

  if (screen === 'map') return (
    <MapPage onBack={() => setScreen('home')} />
  )
}

export default App