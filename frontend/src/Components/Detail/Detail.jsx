import React from "react";
import { useEffect } from "react";
import * as ReactRedux from "react-redux";
import { useParams } from "react-router-dom";
import {
  cleanDetail,
  getDetail,
} from "../../redux/actions/ProdDetail/ProdDetailAction";
import {
  addFav,
  removeFav,
} from "../../redux/actions/Favorites/FavoritesAction";
import { addToCart } from "../../redux/actions/Cart/CartAction";
import Loading from "../Loading/Loading";
import img from "../Img/PG0.png";
import style from "./Details.module.css";
import { AiOutlineHeart } from "react-icons/ai";
import { FcLike } from "react-icons/fc";
import { useAuth0 } from "@auth0/auth0-react";
import swal from "sweetalert";
import PaymentCreate from "../PayMents/PaymentCreate/PaymentCreate";
import { useState } from "react";
import { BiUser } from "react-icons/bi";
import ShowReviews from "../Reviews/ShowReviews";
import { BsCheck2Circle } from "react-icons/bs";
import { BsArrowReturnLeft } from "react-icons/bs";

import { Link } from "react-router-dom";

function Detail() {
  const [quantity, setQuantity] = React.useState(1);
  const { user, isAuthenticated, loginWithRedirect } = useAuth0();
  const { id } = useParams();
  const dispatch = ReactRedux.useDispatch();
  const [buy, setBuy] = useState(false);
  const { cartproduct } = ReactRedux.useSelector((state) => state.cartReducer);

  useEffect(() => {
    dispatch(getDetail(id));
    return () => {
      dispatch(cleanDetail(dispatch));
    };
  }, [dispatch, id]);

  const { prodDetail } = ReactRedux.useSelector(
    (state) => state.prodDetailReducer
  );

  const { loginUser } = ReactRedux.useSelector(
    (state) => state.userLoginReducer
  );

  const prodTotal = { quantity, prodDetail };
  const data = { prodTotal, loginUser };

  const { favorites } = ReactRedux.useSelector(
    (state) => state.favoriteReducer
  );

  const addFav1 = () => {
    if (prodDetail.name) {
      dispatch(addFav(prodDetail));
    }
  };

  const removeFav1 = (id) => {
    if (prodDetail.id) {
      dispatch(removeFav(id));
    }
  };

  const prodIsFav = (id) => {
    if (favorites?.length) {
      return favorites.find((prod) => prod.id === id) ? true : false;
    }
    return false;
  };

  const isOnCart = () => {
    if (cartproduct?.length) {
      return cartproduct.find((p) => p.prodDetail.id === prodDetail.id)
        ? true
        : false;
    }
    return false;
  };

  const addCart = () => {
    if (isOnCart()) {
      return swal({
        title: "Cuidado",
        text: "El producto ya esta en el carrito",
        icon: "error",
        button: "Aceptar",
        timer: "2500",
      });
    }

    // dispatch(addToCart(prodDetail, user));

    dispatch(addToCart(data));

    swal({
      title: "Exito",
      text: `${prodDetail.name} agregado al carrito`,
      icon: "success",
      button: "Aceptar",
      timer: "2500",
    });
  };

  function change(e) {
    setQuantity(e.target.value);
  }

  const disCart = (data) => {
    dispatch(addToCart(data));
  };

  return (
    <div>
      {buy === false && (
        <div className={style.div}>
          {prodDetail.name ? (
            <div className={style.style}>
              <h1 className={style.titulo}>{prodDetail.name}</h1>

              <img
                className={style.img}
                alt={prodDetail.name}
                src={prodDetail.image ? prodDetail.image : img}
              />

              <p className={style.description}>{prodDetail.longDescription}</p>
              <span className={style.p}>
                {prodDetail.categories.map((cat) => (
                  <p key={cat.id}>{cat.name}</p>
                ))}
              </span>

              <section>


                <h4 className={style.precio}>Precio: ${prodDetail.price}</h4>
                {prodDetail.stock <= 0 ? (

                  <></>
                ) : (
                <label className={style.p} form="quantity">
                  Cantidad:
                  <input
                    className={style.input}
                    type="number"
                    name="cantidad"
                    min="1"
                    max={prodDetail.stock}
                    onChange={change}
                    value={quantity}
                    ></input>
                    </label>
                )}

                <h3 className={style.stock}>
               Stock disponible:{prodDetail.stock} <BsCheck2Circle />
               </h3>


               
                // {/* {prodDetail.stock <= 0 ? (
                //   <></>
                // ) 
                // : (
                //    <></> 
                //    <h3 className={style.stock}>
                //     Stock disponible:{prodDetail.stock} <BsCheck2Circle />
                //   </h3>
                // )} */}

                <Link className={style.link} to={"/home"}>
                  <button className={style.button3}>
                    {" "}
                    <BsArrowReturnLeft /> TIENDA
                  </button>
                </Link>
              </section>

              <section>
                <div className={style.context}>
                  {/* {!isAuthenticated || !loginUser.email || !prodDetail.stock > 0 ? (
                    <></>
                  ) : (
                    <Link onClick={addCart} to={"/shop"}>
                      <button className={style.button1}> Comprar </button>
                    </Link>
                  )} */}

                {prodDetail.stock <= 0 ? (
                <button type="button" className={style.button} disabled="disabled">
                {" "}
                No hay Stock{" "}
                </button>
                  ) : 
                  !isAuthenticated || !loginUser.email ? (
                    <button
                      className={style.button}
                      onClick={() => loginWithRedirect()}
                    >
                      {" "}
                      Agregar al Carro{" "}
                    </button>
                  ) : prodDetail.stock <= 0 ? (
                    <button type="button" className={style.button} disabled="disabled">
                    {" "}

                    No hay Stock{" "}
                    </button>):
                    (
                      <Link onClick={addCart} to={"/shop"}>
                      <button className={style.button}>
                      {" "}
                      Agregar al Carro{" "}
                    </button>
                    </Link>
                  )} 

               
                      
               


                </div>

                {!isAuthenticated ? (
                  <></>
                ) : prodIsFav(prodDetail.id) ? (
                  <button onClick={() => removeFav1(prodDetail.id)}>
                    <FcLike size="2rem" color="red" border="white" />
                  </button>
                ) : (
                  <button className={style.b} onClick={addFav1}>
                    <AiOutlineHeart size="2rem" color="red" />
                  </button>
                )}
              </section>
            </div>
          ) : (
            <Loading />
          )}
        </div>
      )}

      {buy === true && isAuthenticated && loginUser.id ? (
        <div className={style.payment}>
          <div className={style.descriptionPay}>
            <img
              className={style.imgPayment}
              alt={prodDetail.name}
              src={prodDetail.image ? prodDetail.image : img}
            />
            <p>{prodDetail.longDescription}</p>
            <b> Cantidad: {quantity}</b>
            <b> Total: ${quantity * prodDetail.price}</b>
          </div>
          <div>{buy === true ? <PaymentCreate /> : null}</div>
        </div>
      ) : null}

      {buy === true && !isAuthenticated && !loginUser.id ? (
        <>
          <button
            onClick={() => loginWithRedirect()}
            style={{ background: "none", border: "none", cursor: "pointer" }}
          >
            <BiUser size="1.5rem" />
            Login
          </button>
        </>
      ) : null}

      <ShowReviews prodDetail={prodDetail} />
    </div>
  );
}

export default Detail;
