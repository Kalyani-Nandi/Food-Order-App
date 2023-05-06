import AddPizza from "@/components/AddPizza";
import Featured from "@/components/Featured";
import PizzaList from "@/components/PizzaList";
import axios from "axios";
import Head from "next/head";
import { useState } from "react";

export default function Home({ pizzaList,admin }: any) {
  const [close, setClose] = useState(false);

  return (
    <div>
      <Head>
        <title>Pizza Restaurant in Newyork</title>
        <meta name="description" content="Best pizza shop in town" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Featured />
      {admin && <button className="flex justify-center items-center m-4 rounded-md w-fit py-2 px-4 bg-orange-700 text-white text-sm font-semibold" onClick={()=>setClose(true)}>
        Add New Pizza
        </button>}
      <div id="products">
        <PizzaList pizzaList={pizzaList} />
      </div>
      {close && <AddPizza setClose={setClose} />}
    </div>
  );
}

export const getServerSideProps = async (ctx:any) => {
  const myCookie = ctx.req?.cookies || "";
  let admin = false;
  if(myCookie.token === process.env.TOKEN){
    admin = true;
  }
  const res = await axios.get(`http://localhost:3000/api/products`);

  return {
    props: {
      pizzaList: res.data,
      admin,
    },
  };
};
