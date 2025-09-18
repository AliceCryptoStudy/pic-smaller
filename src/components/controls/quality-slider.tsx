@@ .. @@
-'use client'
-
 import React from 'react'
 import { useImageStore } from '../../store/image-store'
 
@@ .. @@
         <input
           type="range"
           min="0.1"
           max="1"
           step="0.01"
           value={quality}
           onChange={(e) => setQuality(parseFloat(e.target.value))}
-          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
+          className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
         />
         <div className="flex justify-between text-xs text-gray-500 mt-1">