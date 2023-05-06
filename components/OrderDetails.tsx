import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";

export const OrderDetails = ({ total, cash, setCash, createOrder }: any) => {
  const [customer, setCustomer] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
const OrderPlaced=()=>{
    createOrder({ customer, address,phone, total, method: 0 });
    setCash(false);
}
  return (
    <div>
      <Transition appear show={cash} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-[1000]"
          onClose={() => setCash(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex h-full items-center w-full justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg flex justify-center items-center font-medium leading-6 text-gray-900"
                  >
                    You will pay ${total} after delivery.
                  </Dialog.Title>
                  <div className="mt-2">
                    <div className="">
                      <div className="px-3">
                        <div className="flex flex-col  justify-center items-start w-full text-gray-700 ">
                          <label className="py-3">Name Surname</label>
                          <input
                            placeholder="John Doe"
                            type="text"
                            className=" h-9 px-2 border-gray-500 border w-full rounded-md outline-none"
                            onChange={(e) => setCustomer(e.target.value)}
                          />
                        </div>
                        <div className="flex flex-col  justify-center items-start w-full text-gray-700 ">
                          <label className="py-3">Phone Number</label>
                          <input
                            type="text"
                            placeholder="+1 234 567 89"
                            onChange={(e) => setPhone(e.target.value)}
                            className="h-9 px-2 border-gray-500 border w-full rounded-md outline-none"
                          />
                        </div>
                        <div className="flex flex-col  justify-center items-start w-full text-gray-700">
                          <label className="py-3">Address</label>
                          <textarea
                            rows={5}
                            placeholder="Elton St. 505 NY"
                            className=" px-2 border-gray-500 border w-full rounded-md outline-none"
                            onChange={(e) => setAddress(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex justify-center items-center gap-10 px-3">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-res-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                      onClick={() => setCash(false)}
                    >
                      Cancel
                    </button>
                    <button onClick={() => OrderPlaced()} className="inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2">Order Place</button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};
