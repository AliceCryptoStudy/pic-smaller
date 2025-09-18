@@ .. @@
-'use client'
-
 import React, { useState } from 'react'
-import { Download, Eye, Trash2, RotateCcw } from 'lucide-react'
 import { ImageItem } from '../../types/image'
 import { useImageStore } from '../../store/image-store'
 import { formatFileSize } from '../../lib/utils'