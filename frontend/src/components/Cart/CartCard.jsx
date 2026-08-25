import { Delete } from "@mui/icons-material";
import Counter from "./Counter";

const CartCard = ({ item, remove }) => {
  const {
    product: { name, image, price },
    quantity,
  } = item;

  return (
    <>
      <tr className=" transition-all duration-200  border-t border-[var(--app-border)] text-[var(--primarytext)]">
        <td className=" px-4 py-2">
          <img
            src={image}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = `https://placehold.co/600x600?text=Food+Image`;
            }}
            alt="demo"
            className="w-[65px]   sm:w-[100px] sm:h-[100px] bg-cover bg-center object-cover"
          />
          <div className="sm:hidden w-[65px]">
            <Counter item={item} />
          </div>{" "}
        </td>
        <td className=" px-4 py-2">{name}</td>
        <td className=" px-4 py-2">{`$${price}`}</td>
        <td className=" px-4 py-2 hidden sm:block">
          <Counter item={item} />
        </td>
        <td className=" px-4 py-2 cursor-pointer" onClick={() => remove()}>
          <Delete />
        </td>
      </tr>
    </>
  );
};

export default CartCard;
