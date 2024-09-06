'use client'

import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'

const ScrollToTop = dynamic(() => import('react-scroll-to-top'), { ssr: false })

export default function ScrollToTopButton() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <ScrollToTop 
      smooth 
      color="white"
      style={{
        backgroundColor: '#1a1a1a',
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '40px',
        height: '40px',
      }}
    />
  )
}
