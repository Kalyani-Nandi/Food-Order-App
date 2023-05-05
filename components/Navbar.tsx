import Image from "next/image";
import styles from "../styles/Navbar.module.css";
import { useSelector } from "react-redux";
import Link from "next/link";

const Navbar = () => {
  const quantity = useSelector((state) => state.cart.quantity);

  const scroll2El = (elID: string) => {
    console.log(elID);

    window.scrollTo({
      top: (document.getElementById(elID)?.offsetTop as number) - 60,
      behavior: "smooth",
    });
  };

  const onBtnClick = (e: any) => {
    e.preventDefault();
    const goto = e.target.getAttribute("goto");
    console.log(e);

    setTimeout(() => {
      scroll2El(goto);
    });
  };
  return (
    <div className="h-[100px] px-[50px] bg-[#d1411e] flex items-center justify-center sticky top-0 z-[999]">
      <div className={styles.item}>
        <div className="bg-white rounded-[50%] p-[10px] h-[50px] w-[50px] ">
          <Link href="/" passHref>
            <Image src="/img/telephone.png" alt="" width="32" height="32" />
          </Link>
        </div>
        <div className="ml-[20px] text-white">
          <div className={styles.text}>ORDER NOW!</div>
          <div className={styles.text}>012 345 678</div>
        </div>
      </div>
      <div className={styles.item}>
        <ul className="flex items-center p-0 list-none text-white">
          <Link href="/" passHref>
            <li className="m-[20px] font-medium cursor-pointer">Homepage</li>
          </Link>
          <li
            goto="products"
            onClick={onBtnClick}
            className="m-[20px] font-medium cursor-pointer"
          >
            Products
          </li>
        </ul>
      </div>
      <Link href="/cart" passHref>
        <div className={styles.item}>
          <div className="relative">
            <Image src="/img/cart.png" alt="" width={30} height={30} />
            <div className="absolute top-[-10px] right-[-10px]  w-[20px] h-[20px] rounded-[50%] bg-white p-[3px] flex justify-center items-center font-bold text-[#d1411e]">
              {quantity}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Navbar;
