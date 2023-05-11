import Link from "next/link";
import Image from "next/image";
const PizzaCard = ({ pizza }:any) => {
  
  return (
    <div className="sm:w-[22%] w-[100%] p-[10px] px-[40px] py-20px] flex flex-col items-center justify-center cursor-pointer">
      <Link href={`/product/${pizza._id}`} passHref>
        <Image src={pizza.img} alt="" width="500" height="500" />
      </Link>
      <h1 className="sm:text-[18px] text-[30px] font-bold text-[#d1411e]">{pizza.title}</h1>
      <span className="text-[24px] sm:text-[18px] font-bold text-[#666]">${pizza.prices[0]}</span>
      <p className="text-center text-[#777] text-[14px]">{pizza.desc}</p>
    </div>
  );
};

export default PizzaCard;