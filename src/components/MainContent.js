import React from 'react'

function MainContent(props) {
  return (
    <>
      <main role="main" className="flex-shrink-0">
        <div className="container-fluid mainContent p-0">{props.children}</div>
      </main>
    </>
  )
}

export default MainContent
