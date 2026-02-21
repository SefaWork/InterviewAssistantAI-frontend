import { useEffect, useRef } from 'react'

function Webcam() {
  const videoReference = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    let currentStream: MediaStream | null = null;
    const currentRef = videoReference.current;
    if (!currentRef) return;

    if (navigator.mediaDevices) {
      navigator.mediaDevices.getUserMedia({video: true}).then((stream: MediaStream) => {
        currentStream = stream
        currentRef.srcObject = stream
      })
      .catch(() => {
        currentStream = null;
        console.log("Something went wrong!")
      })
    }

    // Cleanup function.
    return () => {
      if (currentStream) {
        console.log("Destroying stream.")
        currentStream.getTracks().forEach(track => track.stop())
        currentStream = null;
      }
      currentRef.srcObject = null
    }
  }, [])

  return (
    <video className='video-frame' autoPlay={true} id="videoElement" ref={videoReference} controls={false} />
  )
}

export default Webcam
