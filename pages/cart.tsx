import Image from 'next/image'
import React from 'react'
import { useSelector } from 'react-redux'

function cart() {
    const cart =useSelector((state)=>state?.cart)
  return (
    <div className="sm:p-[50px] p-[20px] sm:flex-row flex-col flex">
      <div className="flex-2">
        <table className="w-full sm:flex sm:items-center sm:justify-center  sm:flex-col border-spacing-[20px]">
          <tbody>
            <tr className="">
              <th>Product</th>
              <th>Name</th>
              <th>Extras</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </tbody>
          <tbody>
            {cart.products.map((product:any) => (
              <tr className=""key={product._id}>
                <td>
                  <div className=" w-[35vw] sm:w-[100px] h-[35vw] sm:h-[100px] relative">
                    <Image
                      src={product.img}
                      layout="fill"
                      objectFit="cover"
                      alt=""
                    />
                  </div>
                </td>
                <td>
                  <span className="font-medium text-[18px] text-[#d1411e]">{product.title}</span>
                </td>
                <td>
                  <span className="">
                    {product.extras.map((extra:any) => (
                      <span key={extra._id}>{extra.text}, </span>
                    ))}
                  </span>
                </td>
                <td>
                  <span className="">${product.price}</span>
                </td>
                <td>
                  <span className="">{product.quantity}</span>
                </td>
                <td>
                  <span className="font-medium text-[18px]">
                    ${product.price * product.quantity}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex-1">
        <div className="w-[90%] sm:w-[40%] max-h-[300px] bg-[#333] p-[50px] pt-[10px] flex flex-col justify-between text-white">
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
          {/* {open ? (
            <div className={styles.paymentMethods}>
              <button
                className={styles.payButton}
                onClick={() => setCash(true)}
              >
                CASH ON DELIVERY
              </button>
              <PayPalScriptProvider
                options={{
                  "client-id":
                    "ATTL8fDJKfGzXNH4VVuDy1qW4_Jm8S0sqmnUTeYtWpqxUJLnXIn90V8YIGDg-SNPaB70Hg4mko_fde4-",
                  components: "buttons",
                  currency: "USD",
                  "disable-funding": "credit,card,p24",
                }}
              >
                <ButtonWrapper currency={currency} showSpinner={false} />
              </PayPalScriptProvider>
            </div>
          ) : ( */}
            <button 
            // onClick={() => setOpen(true)} 
            className="h-[30px] text-[#d1411e] font-bold cursor-pointer mt-[20px] ">
              CHECKOUT NOW!
            </button>
          {/* )} */}
        </div>
      </div>
      {/* {cash && <OrderDetail total={cart.total} createOrder={createOrder} />} */}
    </div>
  )
}

export default cart