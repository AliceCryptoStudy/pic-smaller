@@ .. @@
-'use client'
-
 import React from 'react'
-import { TrendingDown, FileImage, HardDrive } from 'lucide-react'
 import { useImageStore } from '../../store/image-store'
 import { formatFileSize } from '../../lib/utils'
 
@@ .. @@
         <div className="flex items-center space-x-2">
-          <FileImage className="h-5 w-5 text-blue-500" />
+          <span className="text-blue-500">📁</span>
           <span className="text-sm text-gray-600 dark:text-gray-400">总文件数</span>
@@ .. @@
         <div className="flex items-center space-x-2">
-          <HardDrive className="h-5 w-5 text-green-500" />
+          <span className="text-green-500">💾</span>
           <span className="text-sm text-gray-600 dark:text-gray-400">原始大小</span>
@@ .. @@
         <div className="flex items-center space-x-2">
-          <TrendingDown className="h-5 w-5 text-purple-500" />
+          <span className="text-purple-500">📉</span>
          <span className="text-sm text-gray-600 dark:text-gray-400">压缩后大小</span>