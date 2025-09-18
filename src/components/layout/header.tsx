@@ .. @@
-'use client'
-
-import React from 'react'
-import { Moon, Sun, Github } from 'lucide-react'
+import React, { useState } from 'react'
 import { useTheme } from '../providers/theme-provider'
 
 export function Header() {
   const { theme, setTheme } = useTheme()
+  const [isDark, setIsDark] = useState(theme === 'dark')
+
+  const toggleTheme = () => {
+    const newTheme = isDark ? 'light' : 'dark'
+    setTheme(newTheme)
+    setIsDark(!isDark)
+  }
 
   return (
     <header className="glass sticky top-0 z-50 border-b">
@@ -18,7 +25,7 @@
         <div className="flex items-center space-x-4">
           <button
             onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
-            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
+            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
             aria-label="切换主题"
           >
-            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
+            {isDark ? '🌞' : '🌙'}
           </button>
           
           <a
@@ -28,7 +35,7 @@
             target="_blank"
             rel="noopener noreferrer"
-            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
+            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
             aria-label="GitHub 仓库"
           >
-            <Github className="h-5 w-5" />
+            📁
           </a>
         </div>