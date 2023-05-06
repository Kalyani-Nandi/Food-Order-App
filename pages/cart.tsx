import { PayPalButtons, PayPalScriptProvider, usePayPalScriptReducer } from '@paypal/react-paypal-js'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { reset } from "../redux/cartSlice"
import axios from 'axios'
import { OrderDetails } from '@/components/OrderDetails'
function cart() {
    const cart =useSelector((state)=>state?.cart)
    const [open,setOpen]=useState(false)
    const [cash,setCash]=useState(false)
    const amount = cart.total;

    const dispatch = useDispatch();
    const router = useRouter();

    const createOrder = async (data:any) => {
      try {
        const res = await axios.post("http://localhost:3000/api/orders", data);
        if (res.status === 201) {
          dispatch(reset());
          router.push(`/orders/${res.data._id}`);
        }
      } catch (err) {
        console.log(err);
      }
    };
    
  return (
    <div className=" p-[20px] sm:flex-row flex-col flex">
      <div className="w-[70%]">
        <table className="w-full flex items-center justify-center  flex-col ">
          <thead>
            <tr className="border-spacing-[10px]">
              <th className='p-5'>Product</th>
              <th className='p-5'>Name</th>
              <th className='p-5'>Extras</th>
              <th className='p-5'>Price</th>
              <th className='p-5'>Quantity</th>
              <th className='p-5'>Total</th>
            </tr>
          </thead>
          <tbody>
            {cart.products.map((product:any) => (
              <tr className="w-full" key={product._id}>
                <td className='p-5'>
                  <div className=" w-[35vw] sm:w-[100px] h-[35vw] sm:h-[100px] relative">
                    <Image
                      src={product.img}
                      layout="fill"
                      objectFit="cover"
                      alt=""
                    />
                  </div>
                </td>
                <td className='p-5'>
                  <span className="font-medium text-[18px] text-[#d1411e]">{product.title}</span>
                </td>
                <td className='p-5'>
                  <span className="">
                    {product.extras.map((extra:any) => (
                      <span key={extra._id}>{extra.text}, </span>
                    ))}
                  </span>
                </td>
                <td className='p-5'>
                  <span className="">${product.price}</span>
                </td>
                <td className='p-5'>
                  <span className="">{product.quantity}</span>
                </td>
                <td className='p-5'>
                  <span className="font-medium text-[18px]">
                    ${product.price * product.quantity}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="w-[30%]">
        <div className="w-[90%]  max-h-[300px] bg-[#333] p-[50px] pt-[10px] flex flex-col justify-between text-white">
          <h2 className="">CART TOTAL</h2>
          <div className="">
            <b className="mr-[10px]">Subtotal:</b>${cart.total}
          </div>
          <div className="">
            <b className="mr-[10px]">Discount:</b>$0.00
          </div>
          <div className="">
            <b className="mr-[10px]">Total:</b>${cart.total}
          </div>
          {open ? (
            <div className="">
              <button
                className=""
                onClick={() => setCash(true)}
              >
                CASH ON DELIVERY
              </button>
             
            </div>
          ) : (
            <button 
            onClick={() => setOpen(true)} 
            className="h-[30px] text-[#d1411e] font-bold cursor-pointer mt-[20px] ">
              CHECKOUT NOW!
            </button>
           )} 
        </div>
      </div>
      {cash && <OrderDetails total={cart.total} setCash={setCash} cash={cash} createOrder={createOrder} />}
    </div>
  )
}

export default cart