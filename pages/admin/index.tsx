import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

const index = ({ orders, products }: any) => {
  const [productList, setProductList] = useState([]);
  const [orderList, setOrderList] = useState([]);
  const status = ["preparing", "on the way", "delivered"];

  useEffect (() => {setOrderList(orders);setProductList(products)},[orders,products])
  const DeleteProduct = async (id: any) => {
    try {
      const res = await axios.delete(
        "http://localhost:3000/api/products/" + id
      );
      const list=productList.filter((product: any) => {
       return product._id !== id;
      })
      setProductList(list);
    } catch (err) {
      console.log(err);
    }
  };

  const statusChange = async (id: any) => {
    const item:any = orderList.filter((order: any) => {
    return order._id === id;
    })[0];
    console.log(item);
    
    const currentStatus = item?.status;
    try {
      const res:any = await axios.put("http://localhost:3000/api/orders/" + id, {
        status: currentStatus + 1,
      });
      const list =orderList.filter((order: any) => {return order._id !== id})
      setOrderList(list)
      setOrderList([
        res.data,
        ...list,
      ]);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="w-full p-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-10 text-sm text-gray-700 ">
        <div>
          <h1 className="w-full flex justify-center items-center ">Products</h1>
          <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                  <table className="min-w-full text-left text-sm font-light">
                    <thead className="border-b font-medium dark:border-neutral-500">
                      <tr>
                        <th scope="col" className="px-6 py-4">
                          Image
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Id
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Title
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Price
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {productList.map((product: any, i: any) => {
                        return (
                          <tr
                            key={i}
                            className="border-b dark:border-neutral-500"
                          >
                            <td className=" px-6 py-4">
                              <Image
                                src={product.img}
                                width={50}
                                height={50}
                                objectFit="cover"
                                alt=""
                              />
                            </td>
                            <td className=" px-6 py-4">
                              {product?._id?.slice(0, 5)}...
                            </td>
                            <td className="px-6 py-4">{product?.title}</td>
                            <td className=" px-6 py-4">
                              ${product?.prices[0]}
                            </td>
                            <td className="flex gap-4 px-6 py-4">
                              <button className="w-fit p-1 px-2 rounded-md bg-green-300 text-green-700 text-sm font-semibold">
                                Edit
                              </button>
                              <button
                                onClick={() => DeleteProduct(product?._id)}
                                className="w-fit p-1 px-2 rounded-md bg-red-300 text-red-700 text-sm font-semibold"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h1 className="w-full flex justify-center items-center">Orders</h1>
          <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                  <table className="min-w-full text-left text-sm font-light">
                    <thead className="border-b font-medium dark:border-neutral-500">
                      <tr>
                        <th scope="col" className="px-6 py-4">
                          Id
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Customer
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Phone
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Total
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Payment
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Status
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {orderList.map((order: any, i: any) => {
                        return (
                          <tr
                            key={i}
                            className="border-b dark:border-neutral-500"
                          >
                            <td className="whitespace-nowrap px-6 py-4 font-medium">
                              {order._id?.slice(0, 5)}...
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {order.customer}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {order.phone}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              ${order.total}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {order.method === 0 ? (
                                <span>cash</span>
                              ) : (
                                <span>paid</span>
                              )}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {status[order.status]}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              <button
                                onClick={() => statusChange(order?._id)}
                                className="w-fit p-1 px-2 rounded-md bg-blue-300 text-blue-700 text-sm font-semibold"
                              >
                                Next Stage
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async () => {
  const products = await axios.get("http://localhost:3000/api/products");
  const orders = await axios.get("http://localhost:3000/api/orders");

  return {
    props: {
      orders: orders.data,
      products: products.data,
    },
  };
};
export default index;
