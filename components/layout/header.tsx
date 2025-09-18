import React, { useState } from 'react'
import { useTheme } from '../providers/theme-provider'

export function Header() {
  const { theme, setTheme } = useTheme()
  const [isDark, setIsDark] = useState(theme === 'dark')

  const toggleTheme = () => {
    const newTheme = isDark ? 'light' : 'dark'
    setTheme(newTheme)
    setIsDark(!isDark)
  }

  return (
    <header className="glass sticky top-0 z-50 border-b">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <h1 className="text-xl font-bold">我的应用</h1>
        
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
            aria-label="切换主题"
          >
            {isDark ? '🌞' : '🌙'}
          </button>
          
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
            aria-label="GitHub 仓库"
          >
            📁
          </a>
        </div>
      </div>
    </header>
  )
}