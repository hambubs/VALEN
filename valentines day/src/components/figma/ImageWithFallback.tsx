import React, { useState } from 'react'
import { IMAGE_CONFIG } from '../../constants/animations';

const ERROR_IMG_SRC =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg=='

export function ImageWithFallback(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  const [didError, setDidError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const handleError = () => {
    setDidError(true)
    setIsLoading(false)
  }

  const handleLoad = () => {
    setIsLoading(false)
  }

  const { src, alt, style, className, ...rest } = props

  return didError ? (
    <div
      className={`inline-block bg-gray-100 text-center align-middle ${className ?? ''}`}
      style={style}
    >
      <div className="flex items-center justify-center w-full h-full">
        <img src={ERROR_IMG_SRC} alt="Error loading image" {...rest} data-original-url={src} />
      </div>
    </div>
  ) : (
    <div className="relative w-full h-full">
      {/* Blurred placeholder background while loading */}
      {isLoading && (
        <div
          className={`absolute inset-0 ${className ?? ''}`}
          style={{
            ...style,
            backgroundColor: IMAGE_CONFIG.PLACEHOLDER_BG_COLOR,
            backgroundImage: `url('${src}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: `blur(${IMAGE_CONFIG.BLUR_RADIUS}px)`,
            zIndex: 0,
          }}
        />
      )}
      {/* Actual image with fade-in transition */}
      <img
        src={src}
        alt={alt}
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        style={{
          ...style,
          transition: `opacity ${IMAGE_CONFIG.BLUR_DURATION}ms ease-in-out`,
          zIndex: isLoading ? -1 : 1,
          position: isLoading ? 'absolute' : 'relative',
        }}
        {...rest}
        onError={handleError}
        onLoad={handleLoad}
      />
    </div>
  )
}
