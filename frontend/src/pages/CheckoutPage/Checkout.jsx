import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { razorPayHandler } from "../../utils/razoPayHandler.js";
import { setCartNull } from "@/reducers/cartSlice.js";
import { cn } from "@/lib/utils.js";

const randomAddresses = [
  {
    name: "Jack",
    street: "123 Main Street",
    city: "Cityville",
    state: "Stateonia",
    postalCode: "12345",
    country: "Fictionland",
  },
  {
    name: "Ronaldo",
    street: "456 Elm Avenue",
    city: "Townburg",
    state: "Regionville",
    postalCode: "67890",
    country: "Imaginaria",
  },
  {
    name: "Messi",
    street: "789 Oak Lane",
    city: "Villagetown",
    state: "Provinceland",
    postalCode: "98765",
    country: "Dreamland",
  },
];

function Checkout() {
  const { coupan1, coupan2 } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getDiscount = () => {
    let total = 0;
    if (coupan1 == "true") {
      total += 50;
    }
    if (coupan2 == "true") {
      total += 50;
    }
    return total;
  };

  const { cart } = useSelector((state) => state.cart);
  const subtotal = Math.round(
    cart.reduce((acc, item) => item.product.price * item.quantity + acc, 0),
    2,
  );

  const openSuccessPage = () => {
    dispatch(setCartNull());
    navigate("/paymentsuccess");
  };
  const openFailurePage = () => navigate("/paymentfailure");

  const successToHome = () => {
    const amount = subtotal - getDiscount();
    const payload = {
      totalAmount: amount,
      image: cart[0]?.product?.image,
      items: cart.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      })),
    };

    razorPayHandler(payload, openSuccessPage, openFailurePage);
  };

  const [address, setAddress] = useState({
    name: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });

  const [openAdd, setOpenAdd] = useState(false);

  const selectAddress = (item) => {
    setOpenAdd(true);
    setAddress(item);
  };

  return (
    <div className="flex  flex-col justify-center  items-center ">
      <h2 className="text-2xl font-semibold text-center flex gap-4 items-center">
        <ShoppingBasketIcon /> {"CheckOut"}
      </h2>
      <div className="flex sm:max-w-[1000px] px-4 w-full  flex-col sm:flex-row sm:items-start gap-12">
        <div className="flex-shrink-0 md:max-w-sm w-full flex flex-col gap-2  px-4  py-4 justify-center items-center bg-[var(--secondarycolor)] rounded border my-12">
          <h2 className="text-xl font-semibold text-center ">
            Choose a Address
          </h2>
          {randomAddresses.map((item) => (
            <AddressItem
              address={item}
              key={item._id}
              currentaddress={address}
              onClick={() => selectAddress(item)}
            />
          ))}
        </div>

        <div className="flex-1 w-full">
          <div className="w-full  rounded border my-12">
            <h2 className="text-xl font-semibold text-center bg-[var(--secondarycolor)] py-4">
              Order Details
            </h2>
            {cart.map((item) => (
              <CheckoutItem item={item} key={item._id} />
            ))}
            <hr />
            <div className="flex justify-between  text-md px-4  py-2 bg-[var(--secondarycolor)]">
              <h2>Price Details:</h2>
              <h2>{`(${cart.length} items)`}</h2>
            </div>

            <div className="flex justify-between  text-md px-4  py-2 bg-[var(--secondarycolor)]">
              {getDiscount() > 0 ? (
                <>
                  <h2>Discount:</h2>
                  <h2>{getDiscount()}</h2>
                </>
              ) : (
                ""
              )}
            </div>

            <div className="flex justify-between font-semibold text-md px-4  py-2 bg-[var(--secondarycolor)]">
              <h2>Total:</h2>
              <h2>{`Rs.${subtotal}`}</h2>
            </div>
            <div className="flex justify-between  text-md px-4  py-2 bg-[var(--secondarycolor)]">
              <h2>Delivery Charges:</h2>
              <h2>Free</h2>
            </div>
            <hr />
            <div className="flex justify-between font-semibold text-md px-4  py-2 bg-[var(--secondarycolor)]">
              <h2>Total Amonut:</h2>
              <h2>{`Rs.${subtotal - getDiscount()}`}</h2>
            </div>
            <hr />
          </div>
          <div className="mb-5">
            <button
              className="px-4 bg-[var(--app-border)] text-[var(--primarycolor)] w-full py-4"
              onClick={() => successToHome()}
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;

const CheckoutItem = ({ item }) => {
  return (
    <div className="flex px-4 py-2 bg-[var(--secondarycolor)]">
      <div>
        <img
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = `https://placehold.co/600x600?text=Food+Image`;
          }}
          width={100}
          height={100}
          className="object-cover aspect-square rounded-xl"
          src={item.product.image}
          alt="image"
        />
      </div>
      <div className="flex  justify-between items-center px-4 py-2  font-medium  w-full">
        <span className="text-base font-medium max-w-[100px] md:max-w-[150px] w-full">{`${item.product.name}`}</span>
        <span>{`${item.product.price}  × ${item.quantity}`}</span>
      </div>
    </div>
  );
};

const AddressItem = ({ address, onClick, currentaddress }) => {
  return (
    <>
      <div
        className={cn(
          "flex items-center py-2 px-4 justify-between bg-[var(--secondarycolor)] hover:bg-[var(--app-border)] hover:text-[var(--primarycolor)] text-[var(--primarytext)] sm:max-w-auto w-full rounded border relative",
          address.name === currentaddress.name
            ? "bg-[var(--app-border)] text-[var(--primarycolor)]"
            : "",
        )}
        onClick={() => onClick()}
      >
        <input
          type="radio"
          className="absolute right-4 top-4"
          value={address.name}
          checked={address.name === currentaddress.name}
        />
        <div>
          <h2 className="text-xl font-semibold">{address.name}</h2>
          <h2>
            <span className="text-lg font-medium">{address.street}</span>{" "}
            <span className="font-light">{address.city}</span>
          </h2>
          <h2 className="text-sm">
            <span>{address.state},</span> <span>{address.country},</span>{" "}
            <span>{address.postalCode}</span>
          </h2>
        </div>
      </div>
    </>
  );
};
