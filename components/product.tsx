import Image from "next/image";
import Link from "next/link";
import style from "../styles/product.module.css";
import AddButton from "./addButton";
import Footer from "./footer";
import Router from "next/router";
import { useAppContext } from "../components/statewrapper";
import { BsFillTrashFill } from "react-icons/bs";
import { MdOutlineArrowBack } from "react-icons/md";

type Data = {
  product: any;
  showAs: string;
  qty: any;
};

export default function Product({ product, showAs, qty }: Data) {
  const cart = useAppContext();

  const handleAddItem = (product: any) => {
    cart.addItemToCart(product);
  };

  const handleDeletePerItem = (product: any) => {
    cart.deletePerItem(product);
  };

  const handleDelete = (product: any) => {
    cart.deleteItem(product);
  };

  if (showAs === "Page") {
    return (
      <>
   
        <button onClick={() => Router.back()} className="btn btn-secondary">
          <MdOutlineArrowBack />
        </button>
    
        <div className={style.page}>
          <div>
            <Image
              src={product.image}
              alt={product.title}
              width={500}
              height={500}
              className={style.detailsImg}
            />
          </div>
          <div className={style.info}>
            <div>
              <h2>{product.title}</h2>
            </div>
            <div>Category: {product.categories}</div>
            <div>Stock: {product.stock}</div>
            <div className={style.price}>${product.price}</div>
            <div>{product.description}</div>
            <div>
              <AddButton item={product} />
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (showAs === "ListItem") {
    return (
      <div className={style.listItem}>
        <div>
          <Image
            src={product.image}
            alt={product.title}
            width={100}
            height={100}
            className={style.cartImg}
          />
        </div>
        <div className={style.content}>
          <h3>{product.title}</h3>
          <div className={style.detailContent}>
            <div className="left">
              <div>${product.price}</div>
              {qty === 0 ? "" : <div>Units: {qty}</div>}
              {qty === 0 ? "" : <div>Subtotal: ${qty * product.price}</div>}
            </div>
            <div className="right">
              {qty === 0 ? (
                ""
              ) : (
                <div className={style.buttons}>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className={style.button}
                  >
                    <BsFillTrashFill />
                  </button>
                  <button
                    onClick={() => handleAddItem(product)}
                    className={style.button}
                  >
                    +
                  </button>
                  {qty === 1 ? (
                    ""
                  ) : (
                    <button
                      onClick={() => handleDeletePerItem(product.id)}
                      className={style.button}
                    >
                      -
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={style.item}>
      <div>
        <Link href={`/store/${product.id}`}>
          <Image
            src={product.image}
            alt={product.title}
            className={style.image}
            width={250}
            height={200}
          />
        </Link>
      </div>
      <div className={style.title}>
        <h3>
          <Link
            href={`/store/${product.id}`}
            style={{ textDecoration: "none", color: "#9A9A9A" }}
          >
            {product.title}
          </Link>
        </h3>
      </div>
      <div style={{ color: "#9A9A9A" }}>US${product.price}</div>
      <div>
        <AddButton item={product} />
      </div>
    </div>
  );
}