@@ .. @@
-'use client'
-
 import React from 'react'
 import { useImageStore } from '../../store/image-store'
 
@@ .. @@
         <select
           value={resizeMode}
           onChange={(e) => setResizeMode(e.target.value as any)}
-          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
+          className="w-full p-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
         >
           <option value="none">不调整尺寸</option>
@@ .. @@
           <input
             type="number"
             value={maxWidth || ''}
             onChange={(e) => setMaxWidth(e.target.value ? parseInt(e.target.value) : null)}
             placeholder="最大宽度"
-            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
+            className="w-full p-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
           />
         </div>
@@ .. @@
           <input
             type="number"
             value={maxHeight || ''}
             onChange={(e) => setMaxHeight(e.target.value ? parseInt(e.target.value) : null)}
             placeholder="最大高度"
-            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
+            className="w-full p-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
           />
         </div>