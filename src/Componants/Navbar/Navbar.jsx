import React, { useContext } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import cart from "../../assets/freshcart-logo.svg";
import { userContext } from "../../UserContext";
import { CartContext } from "../../CartContext";
import { getCart, useCartGet } from "../../useCart";
import { useWishlistQuery,getWishlist } from "../../useWishlist";

export default function Navbar() {
  let { setIsOpen } = useContext(CartContext);
  let { user, setIsUser, isLogin, setLogin } = useContext(userContext);
  let { data, isFetching, refetch } = useCartGet("cartItems", getCart);
  let { data: wishlistData } = useWishlistQuery("getWishlist", getWishlist);
  let navigate = useNavigate();

  function Logout() {
    setIsUser(null);
    localStorage.removeItem("userToken");
    localStorage.removeItem("userName");

    navigate("/");
  }

  function openCart() {
    setIsOpen(true);
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg  mb-1 bg-light py-3 position-fixed   ">
        <div className="container ">
          <span className="me-3">
            <img src={cart} alt="" />
          </span>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            {user ? (
              <ul className="navbar-nav  me-auto ">
                <li className="nav-item">
                  <NavLink className="nav-link " to="home">
                    Home
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link" to="products">
                    Products
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="categories">
                    Categories
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="brands">
                    Brands
                  </NavLink>
                </li>
              </ul>
            ) : (
              ""
            )}

            <ul className="navbar-nav ms-auto ">
              <li className="nav-item me-3">
                <i className="fa-brands fa-instagram"></i>
              </li>

              <li className="nav-item me-3">
                <i className="fa-brands fa-facebook"></i>
              </li>

              <li className="nav-item me-3 ">
                <i className="fa-brands fa-tiktok"></i>
              </li>

              <li className="nav-item me-3">
                <i className="fa-brands fa-twitter"></i>
              </li>

              <li className="nav-item me-3">
                <i className="fa-brands fa-linkedin"></i>
              </li>

              <li className="nav-item me-3 ">
                <i className="fa-brands fa-youtube"></i>
              </li>

              {user ? (
                <>
                  <li className="nav-item me-3 ">
                    <Link className="nav-link p-0" onClick={Logout}>
                      Logout
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item  me-3">
                    <NavLink className="nav-link p-0" to="">
                      Login
                    </NavLink>
                  </li>
                  <li className="nav-item me-3 ">
                    <NavLink className="nav-link p-0" to="register">
                      Register
                    </NavLink>
                  </li>
                </>
              )}
              <li
                className="nav-item me-3 cart"
                data-bs-toggle={!user ? "modal" : ""}
                data-bs-target="#exampleModal"
                onClick={openCart}
              >
                <Link to="cart">
                  <i className="fa-solid fa-cart-shopping cart">
                    <div className="itemsNum text-white">
                      {data?.data?.numOfCartItems && user ? (
                        <p>{data?.data?.numOfCartItems}</p>
                      ) : (
                        <p>0</p>
                      )}
                    </div>
                  </i>
                </Link>
              </li>
              {user ? (
                <>
                  <Link className="mx-2" to="wishlist">
                    <i className="fa-solid fa-heart  cart">
                      <div className="itemsNum text-white">
                        {wishlistData?.data?.count ? (
                          <p>{wishlistData?.data?.count}</p>
                        ) : (
                          <p>0</p>
                        )}
                      </div>
                    </i>
                  </Link>
                  <li className="nav-item ms-3 mt-1 ">
                    <p className="h6">
                      Hello <span> {isLogin}</span>
                    </p>
                  </li>
                </>
              ) : (
                ""
              )}
            </ul>
          </div>
        </div>
      </nav>

      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-body">
              <p>Please Login frist</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// <!-- Button trigger modal -->
// <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
//   Launch demo modal
// </button>

// <!-- Modal -->
// <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
//   <div class="modal-dialog">
//     <div class="modal-content">
//       <div class="modal-header">
//         <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
//         <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//       </div>
//       <div class="modal-body">
//         ...
//       </div>
//       <div class="modal-footer">
//         <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
//         <button type="button" class="btn btn-primary">Save changes</button>
//       </div>
//     </div>
//   </div>
// </div>
