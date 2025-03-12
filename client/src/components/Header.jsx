import { useDispatch, useSelector } from "react-redux";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { toggleCart } from "../features/cart/cartSlice";
import { Link } from "react-router";

const Header = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);

  // Calculate total items in cart
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="bg-indigo-100 backdrop-blur-sm shadow-lg py-2 px-6 sticky top-0 z-10 border-b border-indigo-100">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="group flex items-center gap-2">
          <span
            title="home"
            className="text-2xl font-extrabold text-indigo-600 tracking-tight"
          >
            Tech Store
          </span>
        </Link>

        <div className="flex items-center gap-6">
          <button
            onClick={() => dispatch(toggleCart())}
            className="cursor-pointer relative p-2.5 hover:bg-white/80 rounded-full transition-all duration-300 shadow-sm hover:shadow-md bg-white/50"
            aria-label="Open cart"
            title="Open cart"
          >
            <ShoppingCartIcon className="h-6 w-6 text-primary" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-sm">
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
