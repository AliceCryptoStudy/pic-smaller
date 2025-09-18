@@ .. @@
-'use client'
-
 import React from 'react'
 import { useImageStore } from '../../store/image-store'
 
@@ .. @@
         <select
           value={outputFormat}
           onChange={(e) => setOutputFormat(e.target.value as any)}
-          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
+          className="w-full p-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
         >
           <option value="original">保持原格式</option>