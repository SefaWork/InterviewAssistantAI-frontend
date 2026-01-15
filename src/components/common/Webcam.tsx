import { useRef, useState, useEffect } from 'react'
import './Webcam.css'

interface WebcamProps {
    /**Callback for capturing image. */
    onCapture?: (imageSrc: string) => void

    /**Width of the viewport. */
    width?: number

    /**Height of the viewport. */
    height?: number

    /**Whether to show test controls. */
    showControls?: boolean

    /**Autostarts webcam view. */
    autoStart?: boolean
}

function Webcam({ 
  onCapture, 
  width = 640, 
  height = 480, 
  showControls = true,
  autoStart = false 
}: WebcamProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isStreaming, setIsStreaming] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const streamRef = useRef<MediaStream | null>(null)

  const startWebcam = async () => {
    try {
      setError(null)
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: width },
          height: { ideal: height }
        },
        audio: false
      })

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        streamRef.current = stream
        setIsStreaming(true)
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unable to access webcam'
      setError(errorMessage)
      console.error('Error accessing webcam:', err)
    }
  }

  const stopWebcam = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      streamRef.current = null
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null
    }
    setIsStreaming(false)
  }

  const captureImage = () => {
    /**
     * Using a system like this, we'll send frames of video to the server
     * for ai processing.
     */
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current
      const video = videoRef.current

      canvas.width = video.videoWidth
      canvas.height = video.videoHeight

      const context = canvas.getContext('2d')
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height)
        const imageSrc = canvas.toDataURL('image/jpeg', .5)
        setCapturedImage(imageSrc)
        
        if (onCapture) {
          onCapture(imageSrc)
        }
      }
    }
  }

  const clearCapture = () => {
    setCapturedImage(null)
  }

  useEffect(() => {
    if (autoStart) {
      startWebcam()
    }

    return () => {
      stopWebcam()
    }
  }, [autoStart])

  return (
    <div className="webcam-container" data-testid="Webcam">
      <div className="webcam-display">
        {error && (
          <div className="webcam-error">
            <p>Error: {error}</p>
            <button onClick={startWebcam}>Retry</button>
          </div>
        )}

        {!error && !capturedImage && (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="webcam-video"
            style={{ display: isStreaming ? 'block' : 'none' }}
          />
        )}

        {capturedImage && (
          <div className="webcam-captured">
            <img src={capturedImage} alt="Captured" className="webcam-image" />
          </div>
        )}

        {!isStreaming && !error && !capturedImage && (
          <div className="webcam-placeholder">
            <p>Webcam not started</p>
          </div>
        )}
      </div>

      <canvas ref={canvasRef} style={{ display: 'none' }} />

      {showControls && (
        <div className="webcam-controls">
          {!isStreaming && !capturedImage && (
            <button onClick={startWebcam} className="webcam-btn webcam-btn-start">
              Start Webcam
            </button>
          )}

          {isStreaming && !capturedImage && (
            <>
              <button onClick={captureImage} className="webcam-btn webcam-btn-capture">
                Capture
              </button>
              <button onClick={stopWebcam} className="webcam-btn webcam-btn-stop">
                Stop
              </button>
            </>
          )}

          {capturedImage && (
            <>
              <button onClick={clearCapture} className="webcam-btn webcam-btn-retake">
                Retake
              </button>
              <button onClick={stopWebcam} className="webcam-btn webcam-btn-stop">
                Close
              </button>
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default Webcam
