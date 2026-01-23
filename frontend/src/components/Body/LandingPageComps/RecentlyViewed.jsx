import React from 'react'

function RecentlyViewed() {
  return (
    <>
              {/* Recently viewed COMPONENT */}
            <h1 className="text-3xl text-gray-950 font-semibold w-fit p-2">
              Recently viewed
            </h1>
            <div className="h-[40vh] flex flex-row gap-4 p-2 overflow-x-auto overflow-y-hidden">
              <div className="bg-red-700 h-full w-100 shrink-0"></div>
              <div className="bg-red-700 h-full w-100 shrink-0"></div>
              <div className="bg-red-700 h-full w-100 shrink-0"></div>
              <div className="bg-red-700 h-full w-100 shrink-0"></div>
              <div className="bg-red-700 h-full w-100 shrink-0"></div>
              <div className="bg-red-700 h-full w-100 shrink-0"></div>
              <div className="bg-red-700 h-full w-100 shrink-0"></div>
            </div>
    </>
  )
}

export default RecentlyViewed