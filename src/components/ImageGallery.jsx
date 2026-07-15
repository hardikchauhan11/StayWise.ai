import { useState } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

function ImageGallery({ images, title = 'Hotel Images' }) {
  const [currentImage, setCurrentImage] = useState(0)
  const [isLightbox, setIsLightbox] = useState(false)

  const safeImages = Array.isArray(images) && images.length > 0 ? images : ['https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800']

  const prevImage = () => {
    setCurrentImage((prev) => (prev === 0 ? safeImages.length - 1 : prev - 1))
  }

  const nextImage = () => {
    setCurrentImage((prev) => (prev === safeImages.length - 1 ? 0 : prev + 1))
  }

  return (
    <>
      <div className="glass rounded-2xl overflow-hidden">
        <div className="relative aspect-video md:aspect-[21/9] overflow-hidden group">
          <img
            src={safeImages[currentImage]}
            alt={`${title} ${currentImage + 1}`}
            onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800' }}
            className="w-full h-full object-cover cursor-pointer transition-transform duration-300 group-hover:scale-105"
            onClick={() => setIsLightbox(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-white/80 text-sm">
              {currentImage + 1} of {safeImages.length}
            </span>
            <span className="text-white/80 text-sm">Click to expand</span>
          </div>
        </div>

        {safeImages.length > 1 && (
          <div className="flex gap-2 p-4 overflow-x-auto">
            {safeImages.map((img, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                className={`relative w-24 h-16 rounded-lg overflow-hidden flex-shrink-0 transition-all ${
                  currentImage === index ? 'ring-2 ring-indigo shadow-lg' : 'ring-1 ring-white/10 hover:ring-white/30'
                }`}
              >
                 <img src={img} alt={`${title} ${index + 1}`} onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400' }} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {isLightbox && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4" onClick={() => setIsLightbox(false)}>
          <button
            onClick={() => setIsLightbox(false)}
            className="absolute top-4 right-4 p-2 text-white/70 hover:text-white transition-colors z-10"
          >
            <X className="w-8 h-8" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <img
            src={safeImages[currentImage]}
            alt={`${title} ${currentImage + 1}`}
            onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800' }}
            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          />

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {safeImages.map((_, index) => (
              <button
                key={index}
                onClick={(e) => { e.stopPropagation(); setCurrentImage(index); }}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  currentImage === index ? 'bg-white scale-125' : 'bg-white/40 hover:bg-white/60'
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default ImageGallery
