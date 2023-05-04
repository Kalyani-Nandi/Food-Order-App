import React from 'react'
import PizzaCard from './PizzaCard'

function PizzaList({pizzaList}:any) {
  return (
    <div className="flex flex-col items-center py-[20px] px-[10px]">
    <h1 className="sm:text-left text-center">THE BEST PIZZA IN TOWN</h1>
    <p className="text-[24px] sm:text-left text-center text-[#444] w-[90%] sm:w-[70%]">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut blandit arcu
      in pretium molestie. Interdum et malesuada fames acme. Lorem ipsum dolor
      sit amet, consectetur adipiscing elit.
    </p>
    <div className="w-[100%] flex items-center justify-center flex-wrap">
      {pizzaList.map((pizza:any) => (
        <PizzaCard key={pizza._id} pizza={pizza} />
      ))}
    </div>
  </div>
  )
}

export default PizzaList