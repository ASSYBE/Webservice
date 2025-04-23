import React from 'react'

export const Fiche18CapaciteStyle = ({ capacites, styles }) => {
  return (
    <div>
      <div className="flex flex-nowrap gap-5 mt-2 justify-start">
        <div className="w-1/3 sm:w-1/3">
          <h2 className="text-sm font-medium">Capacité</h2>
          <ul className="list-disc text-black bg-white bg-opacity-80 rounded-md">
            {capacites && capacites.map((c) => (
              <div key={c.id} className=" py-1 px-5 w-full rounded-md">
                <span className="flex items-center gap-4 font-normal text-sm">
                  <div className='w-2 h-2 rounded-full bg-magenta'></div> {c.capacite_operationnelles}
                </span>
              </div>
            ))}
          </ul>
        </div>
        <div className="w-1/3 sm:w-1/3">
          <h2 className="text-sm font-medium">Style</h2>
          <ul className="list-disc text-black bg-white bg-opacity-80">
            {styles && styles.map((t) => (
              <div key={t.id} className=" py-1 px-5 w-full ">
                <span className="flex items-center gap-4 font-normal text-sm">
                  <div className='w-2 h-2 rounded-full bg-magenta'></div> {t.style_personnel}
                </span>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
