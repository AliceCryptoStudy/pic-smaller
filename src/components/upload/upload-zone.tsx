@@ .. @@
-'use client'
-
 import React, { useCallback, useState } from 'react'
-import { Upload, Image as ImageIcon } from 'lucide-react'
 import { useImageStore } from '../../store/image-store'
 
 export function UploadZone() {