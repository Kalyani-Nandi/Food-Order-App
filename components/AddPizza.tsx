import { Dialog, Transition } from "@headlessui/react";
import { GetServerSideProps, NextPage } from "next";
import axios from "axios";
import { Fragment, useEffect, useState } from "react";
// import fs from "fs/promises";
import path from "path";
const AddPizza = ({ setClose, close }: any) => {
  const [file, setFile] = useState<File>()
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [prices, setPrices] = useState([]);
  const [extraOptions, setExtraOptions] = useState<any>([]);
  const [extra, setExtra] = useState({});
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedFile, setSelectedFile] = useState<File>();
  const changePrice = (e: any, i: any) => {
    const currentPrices: any = prices;
    currentPrices[i] = e.target.value;
    setPrices(currentPrices);
  };

  const handleExtraInput = (e: any) => {
    setExtra({ ...extra, [e.target.name]: e.target.value });
  };
  const handleExtra = (e: any) => {
    setExtraOptions((prev: any) => [...prev, extra]);
  };
  
  const CreatePizza = async () => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "uploads");
    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dsaaypxr9/image/upload",
        data
      );
      const { url } = uploadRes.data;
      const newProduct = {
        title,
        desc,
        prices,
        extraOptions,
        img: url,
      };

      await axios.post("http://localhost:3000/api/products", newProduct);
      setClose(false);
    } catch (e) {
      console.log(e);
      
    }
   
  };

  
//   const CreatePizza = async () => {
//     try {
    
//      const data = new FormData()
//      data.append('file', file)

//      const res = await fetch('/api/products/upload', {
//        method: 'POST',
//        body: data
//      })
//      console.log(file);
//      if (!res.ok) throw new Error(await res.text())
//       const newProduct = {
//         title,
//         desc,
//         prices,
//         extraOptions,
//         img: file,
//       };
//       console.log(newProduct);
      
//     //   await axios.post("http://localhost:3000/api/products", newProduct);
//     //   setClose(true);
//     } catch (e) {
//       console.log(e);
//     }
//   };
  return (
    <div>
      {" "}
      <Transition appear show={close} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-[1000]"
          onClose={() => setClose(false)}
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
                    className="text-lg px-3 flex w-full border-b-2 pb-4 border-b-solid border-gray-400 font-medium leading-6 text-gray-900"
                  >
                    <span className="flex w-full justify-start">
                      Add a new Pizza
                    </span>
                    <span
                      onClick={() => setClose(false)}
                      className="flex w-[10%] cursor-pointer justify-end items-end"
                    >
                      X
                    </span>
                  </Dialog.Title>
                  <div className="mt-2">
                    <div className="">
                      <div className="px-3">
                        <div className="flex flex-col  justify-center items-start w-full text-gray-700 ">
                          <label className="py-3 font-bold">
                            Choose an image
                          </label>
                          <input
                            type="file"
                            className="h-9 px-2 pt-0.5 border-gray-500 border w-full rounded-md outline-none"
                            onChange={(e) => setFile(e.target.files[0])}
                          />
                        </div>
                        <div className="flex flex-col  justify-center items-start w-full text-gray-700 ">
                          <label className="py-3  font-bold">Title</label>
                          <input
                            type="text"
                            onChange={(e) => setTitle(e.target.value)}
                            className="h-9 px-2 border-gray-500 border w-full rounded-md outline-none"
                          />
                        </div>
                        <div className="flex flex-col  justify-center items-start w-full text-gray-700">
                          <label className="py-3  font-bold">Description</label>
                          <textarea
                            rows={5}
                            placeholder="Elton St. 505 NY"
                            className=" px-2 border-gray-500 border w-full h-16 rounded-md outline-none"
                            onChange={(e) => setDesc(e.target.value)}
                          />
                        </div>
                        <div className="flex flex-col  justify-center items-start w-full text-gray-700 ">
                          <label className="py-3  font-bold">Price</label>
                          <div className="grid grid-cols-3 w-full gap-3">
                            <input
                              type="number"
                              placeholder="Small"
                              onChange={(e) => changePrice(e, 0)}
                              className="h-9 px-2 border-gray-500 border rounded-md outline-none"
                            />
                            <input
                              type="number"
                              placeholder="Medium"
                              onChange={(e) => changePrice(e, 1)}
                              className="h-9 px-2 border-gray-500 border  rounded-md outline-none"
                            />
                            <input
                              type="number"
                              placeholder="Large"
                              onChange={(e) => changePrice(e, 2)}
                              className="h-9 px-2 border-gray-500 border  rounded-md outline-none"
                            />
                          </div>
                        </div>
                        <div className="flex flex-col  justify-center items-start w-full text-gray-700">
                          <label className="py-3  font-bold">Extra</label>
                          <div className="grid grid-cols-3 w-full gap-3">
                            <input
                              className=" px-2 border-gray-500 border w-full rounded-md outline-none"
                              type="text"
                              placeholder="Item"
                              name="text"
                              onChange={handleExtraInput}
                            />
                            <input
                              className=" px-2 border-gray-500 border w-full rounded-md outline-none"
                              type="number"
                              placeholder="Price"
                              name="price"
                              onChange={handleExtraInput}
                            />
                            <button
                              className="inline-flex w-fit justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-res-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                              onClick={handleExtra}
                            >
                              Add
                            </button>
                          </div>
                          <div className="">
                            {extraOptions.map((option: any, i: any) => {
                              return (
                                <span key={i} className="">
                                  {option.text}
                                </span>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex justify-center items-center gap-10 px-3">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                      onClick={() => setClose(false)}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => CreatePizza()}
                      className="inline-flex justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                    >
                      Create
                    </button>
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


export default AddPizza;
