import React, { useEffect, useState } from 'react'
import { FaAngleUp } from 'react-icons/fa'

function ToTop() {
  const [isVisible, setIsVisible] = useState(false)

  const toggleVisability = () => {
    if (window.pageYOffset > 500) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }

  const scrollTop = () => {
    window.scroll({
      top: 0,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    window.addEventListener('scroll', toggleVisability)
  }, [])
  return (
    <>
      {isVisible && (
        <div onClick={scrollTop}>
          <button id="scrollToTopBtn">
            <FaAngleUp
              style={{
                color: 'white',
                marginBottom: '4px',
                fontSize: '28px',
              }}
            />
          </button>
        </div>
      )}
    </>
  )
}

export default ToTop
