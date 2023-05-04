import axios from 'axios'
import React, { useState } from 'react'
import Image from 'next/image'
import { useDispatch } from 'react-redux';
import { addProduct } from '@/redux/cartSlice';
const Product = ({pizza}:any)=> {
  const [size, setSize] = useState(0);
  const [price, setPrice] = useState(pizza?.prices[0]);
  const [extras, setExtras] = useState([]);
  const [quantity, setQuantity] = useState(1);

const dispatch=useDispatch()
  const changePrice=(number:any)=>{
    setPrice(price + number)

  }

  const handleSize =(sizeIdex:any)=>{
    // console.log(pizza?.price[1]);
    
    const difference = pizza?.prices[sizeIdex] - pizza?.prices[size]
setSize(sizeIdex)
changePrice(difference)
  }

  const handleExtra=(e:any,option:any)=>{
    const checked= e.target.checked
    if(checked){
      changePrice(option?.price)
      setExtras((prev) => [...prev,option])
    }else{
      changePrice(-option?.price)
      setExtras(extras.filter((extra:any)=>extra._id !== option._id))
    }

  }

  const handleClick=() => {
    dispatch(addProduct({...pizza,extras,price,quantity}))
  }
  return (
    <div className=" flex sm:text-left text-center sm:flex-row flex-col mt-[20px] sm:mt-0 contain sm:container">
      <div className="flex flex-1 h-[100%] items-center justify-center">
        <div className="sm:w-[80%] w-[70vw] h-[70vw] sm:h-[80%] relative">
          <Image src={pizza?.img} className='object-contain ' width="400" height="400" alt="" />
        </div>
      </div>
      <div className="flex-1 p-[20px]">
        <h1 className="sm:m-0 m-[5px]">{pizza.title}</h1>
        <span className="text-[#d1411e] text-[24px] font-normal border-b-solid border-b-[1px] border-b-[#d1411e]">${price}</span>
        <p className="">{pizza.desc}</p>
        <h3 className="">Choose the size</h3>
        <div className="sm:w-[40%] w-[100%] px-[20px] sm:px-0 flex justify-between">
          <div className="w-[30px] h-[30px] relative cursor-pointer size" 
          onClick={() => handleSize(0)}
          >
            <Image src="/img/size.png" layout="fill" alt="" />
            <span className="absolute top-[-5px] right-[-20px] text-white bg-teal-400 text-[12px] px-[5px] rounded-[10px]">Small</span>
          </div>
          <div className="w-[30px] h-[30px] relative cursor-pointer size"
           onClick={() => handleSize(1)}
           >
            <Image src="/img/size.png" layout="fill" alt="" />
            <span className="absolute top-[-5px] right-[-20px] text-white bg-teal-400 text-[12px] px-[5px] rounded-[10px]">Medium</span>
          </div>
          <div className="w-[30px] h-[30px] relative cursor-pointer size" 
          onClick={() => handleSize(2)}
          >
            <Image src="/img/size.png" layout="fill" alt="" />
            <span className="absolute top-[-5px] right-[-20px] text-white bg-teal-400 text-[12px] px-[5px] rounded-[10px]">Large</span>
          </div>
        </div>
        <h3 className="">Choose additional ingredients</h3>
        <div className="flex mb-[30px] sm:flex-row flex-col ">
          {pizza?.extraOption?.map((option:any) => (
            <div className="m-[10px] sm:text-[14px] sm:m-0 text-[18px] flex items-center mr-[10px] font-medium " key={option._id}>
              <input
                type="checkbox"
                id={option.text}
                name={option.text}
                className="w-[25px] sm:w-[20px] h-[25px] sm:h-[20px] "
                onChange={(e) => handleExtra(e, option)}
              />
              <label htmlFor="double">{option.text}</label>
            </div>
          ))}
        </div>
        <div className="">
          <input
            value={quantity}

            onChange={(e) => setQuantity(e.target.value)}
            type="number"
            className="w-[50px] h-[50px] sm:px-0 px-[20px] py-[10px] sm:py-0  sm:h-[30px]"
          />
          <button className=" ml-[10px] bg-[#d1411e] text-white border-none font-medium cursor-pointer sm:px-0 px-[20px] py-[10px] sm:py-0 sm:h-[30px] h-[50px] " 
          onClick={handleClick}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps = async ({params}:any)=>{
  console.log(params);
  
 const res = await axios.get(`http://localhost:3000/api/products/${params.id}`);
 return {
    props:{
        pizza: res.data
    }
 }

}

export default Product;