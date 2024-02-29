import React, { useContext, useState } from "react";
import { CartContext } from "../../CartContext";
import empty from "../../assets/preview.png";

import {
  checkout,
  deleteCart,
  getCart,
  updateCart,
  useCartCrud,
  useCartGet,
} from "../../useCart";
import Loading from "../Loading";

export default function Cart() {
  let [details, setDetails] = useState(null);
  let [phone, setPhone] = useState(null);
  let [city, setCity] = useState(null);
  

  let { isOpen, setIsOpen } = useContext(CartContext);
  let { data, isLoading, isError } = useCartGet("cartItems", getCart);
  let { mutate } = useCartCrud(deleteCart);
  let { mutate: mutatedUpdate, data: updatedData } = useCartCrud(updateCart);
  let { mutate: mutateOnline, data: dataOnline } = useCartCrud(checkout);

  function addAddress(e) {
    e.preventDefault();
    let shippingAddress = {
      details,
      phone,
      city,
    };
    mutateOnline({ id: data?.data?.data?._id, shippingAddress });

    if (dataOnline?.data?.status == "success") {
      window.location.href = dataOnline?.data?.session?.url;
    }
  }
  
  if (isLoading) {
    return <Loading></Loading>;
  }

  if (isError) {
    return (
      <div className="text-center ">
        <h2 className="main-color">Cart is empty</h2>
        <img src={empty} alt="" />
      </div>
    );
  }

  function cartClosed() {
    setIsOpen(false);
  }
  return (
    <aside className={isOpen ? "isOpen" : ""}>
      <i
        className="fa-solid fa-close p-3 fa-2x cursor-pointer"
        onClick={cartClosed}
      ></i>
      <div className="container  p-4">
        {data?.data?.numOfCartItems ? (
          <>
            <h3>
              Shop Cart: <span>{data?.data?.numOfCartItems} items</span>
            </h3>
            <h6 className="mt-3 main-color">
              Total Cart Price:{" "}
              <span className="fw-bolder">
                {data?.data?.data?.totalCartPrice} EGP
              </span>
            </h6>
            {data?.data?.data?.products?.map((prod) => (
              <div
                className="row gy-1 my-2 border-bottom py-2"
                key={prod.product._id}
              >
                <div className="col-md-1">
                  <img
                    src={prod?.product?.imageCover}
                    alt=""
                    className="w-100"
                  />
                </div>
                <div className="col-md-4 mt-4">
                  <p className="my-1">{prod?.product?.title}</p>
                  <p className="my-1">price: {prod?.price} EGP</p>
                  <span
                    className="cursor-pointer"
                    onClick={() => {
                      mutate(prod?.product?._id);
                    }}
                  >
                    <i className="fa-regular fa-trash-can me-2 main-color"></i>
                    Remove
                  </span>
                </div>
                <div className="col-md-7 d-flex justify-content-end align-items-center">
                  <div className="">
                    <button
                      className="btn-brdr cart-btn "
                      onClick={() => {
                        mutatedUpdate({
                          id: prod?.product?._id,
                          count:
                            prod?.product?.quantity > prod?.count
                              ? prod?.count + 1
                              : prod?.count,
                        });
                      }}
                    >
                      +
                    </button>
                    <span className="mx-2">
                      {prod?.count < prod?.product?.quantity
                        ? prod?.count
                        : prod?.product?.quantity}
                    </span>
                    <button
                      className="btn-brdr cart-btn "
                      onClick={() => {
                        prod.count == 1
                          ? mutate(prod?.product?._id)
                          : mutatedUpdate({
                              id: prod?.product?._id,
                              count:
                                prod?.count > 0 ? prod?.count - 1 : prod.count,
                            });
                      }}
                    >
                      -
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : (
          <div className="text-center ">
            <h2 className="main-color">Cart is empty</h2>
            <img src={empty} alt="" />
          </div>
        )}
      </div>
      {data?.data?.numOfCartItems ? (
        <>
          <button
            className="btn green-btn  my-4 text-white checkout"
            data-bs-toggle="modal"
            data-bs-target="#modalId"
          >
            Checkout
          </button>
          <div
            className="modal fade top-0 modal-cart"
            id="modalId"
            tabindex="-1"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            role="dialog"
            aria-labelledby="modalTitleId"
            aria-hidden="true"
          >
            <div
              className="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-sm"
              role="document"
            >
              <div className="modal-content  ">
                <div className="modal-header">
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body px-4">
                  <form action="">
                    <input
                      type="text"
                      className="form-control mb-2"
                      placeholder="details"
                      onChange={(e) => {
                        setDetails(e.target.value);
                      }}
                    />
                    <input
                      type="text"
                      className="form-control mb-2"
                      placeholder="phone"
                      onChange={(e) => {
                        setPhone(e.target.value);
                      }}
                    />
                    <input
                      type="text"
                      className="form-control mb-3"
                      placeholder="city"
                      onChange={(e) => {
                        setCity(e.target.value);
                      }}
                    />
                    <button
                      className="btn btn-danger"
                      type="submit"
                      onClick={addAddress}
                    >
                      Add address
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </aside>
  );
}
