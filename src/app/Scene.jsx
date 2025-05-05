"use client"

import { useState, useEffect, Suspense, lazy } from 'react'
import { Canvas } from '@react-three/fiber'
import { Html, useProgress } from '@react-three/drei'
import { motion, AnimatePresence } from 'framer-motion'

// Lazy-load Experience component
const Experience = lazy(() => import('./Experience'))

// Inline Loader component
function Loader() {
  const { progress } = useProgress()
  return (
    <div className='flex flex-col justify-center items-center gap-2'>
      <div className='text-primary text-xl bg-black bg-opacity-60 p-4 rounded-lg'>
        Loading {progress.toFixed(0)}%
      </div>
      <span className='h-2 rounded-lg bg-primary text-left' style={{width: `${progress.toFixed(0)}%`}}></span>
    </div>
  )
}

export default function Scene() {
  const [showLoader, setShowLoader] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setShowLoader(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {/* Fullscreen overlay loader (before clipPath animation) */}
      <AnimatePresence>
        {showLoader && (
          <motion.div
            className='flex flex-col items-center justify-center fixed inset-0 z-50 bg-black text-white text-2xl'
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p>Please Wait...</p>
            <Loader />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reveal animation with framer-motion */}
      <motion.div
        initial={{ clipPath: 'polygon(90% 0%, 100% 25%, 75% 100%, 80% 75%)' }}
        animate={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }}
        transition={{ duration: 3, delay: 2, ease: 'easeInOut' }}
        className='absolute inset-0 z-10 bg-transparent'
      >
        <Canvas
          dpr={0.8}
          gl={{ powerPreference: 'high-performance', antialias: false, stencil: false }}
          shadows
          camera={{ position: [0, 0, 10], zoom: 1, fov: 90 }}
        >
          <Suspense fallback={''}>
            <Experience />
          </Suspense>
        </Canvas>
      </motion.div>
    </>
  )
}

