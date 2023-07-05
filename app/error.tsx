'use client'
 
import { useEffect } from 'react'
 
export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
 
  return (
    <div  className="space-y-9">
      <h2>Something went wrong!</h2>
      <button className='bg-transparent hover:bg-amber-500 text-amber-700 font-semibold hover:text-black py-2 px-4 border border-amber-500 hover:border-transparent rounded'
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  )
}