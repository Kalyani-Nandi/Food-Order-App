import styles from "../styles/Featured.module.css";
import Image from "next/image";
import { useState } from "react";

const Featured = () => {
  const [index, setIndex] = useState(0);
  const images = [
    "/img/featured.png",
    "/img/featured2.png",
    "/img/featured3.png",
  ];

  const handleArrow = (direction:any) =>{
      if(direction==="l"){
          setIndex(index !== 0 ? index-1 : 2)
      }
      if(direction==="r"){
          setIndex(index !== 2 ? index+1 : 0)
      }
  }

  return (
    <div className={styles.container}>
      <div className="absolute w-[10%] h-[20%] top-0 bottom-0 m-auto cursor-pointer z-[2] " style={{ left: 0 }} onClick={()=>handleArrow("l")}>
        <Image src="/img/arrowl.png" alt="" layout="fill" objectFit="contain"/>
      </div>
      <div className={styles.wrapper} style={{transform:`translateX(${-100*index}vw)`}}>
        {images.map((img, i) => (
          <div className="w-[100vw] h-full relative" key={i}>
            <Image src={img} alt="" layout="fill" objectFit="contain" />
          </div>
        ))}
      </div>
      <div className="absolute w-[10%] h-[20%] top-0 bottom-0 m-auto cursor-pointer z-[2] " style={{ right: 0 }} onClick={()=>handleArrow("r")}>
        <Image src="/img/arrowr.png" layout="fill" alt="" objectFit="contain"/>
      </div>
    </div>
  );
};

export default Featured;
