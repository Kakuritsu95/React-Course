import { formatCurrency } from '../../utils/helpers';
import Button from '../../ui/Button';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, getCurrentQuantity } from '../cart/cartSlice';
import DeleteItem from '../cart/DeleteItem';
import UpdateItemQuantity from '../cart/UpdateItemQuantity';
  
function MenuItem({ pizza }) {
 
  const dispatch = useDispatch();
  const currentQuantity = useSelector(getCurrentQuantity(pizza.id));
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  function handleAddToCart() {
    const newPizza = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice * 1,
    };
    dispatch(addItem(newPizza));
  }
  return (
    <li className="flex  gap-4 py-2">
      <img
        src={imageUrl}
        alt={name}
      
        className={`h-24 ${soldOut && 'opacity-70 grayscale'}`}
      />
      <div className="flex grow flex-col pt-0.5">
        <p className="font-medium">{name}</p>
        <p className="text-sm capitalize italic text-stone-500">
          {ingredients.join(', ')}
        </p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? (
            <p className="text-sm">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm font-medium uppercase text-stone-500">
              Sold out
            </p>
          )}

          {!soldOut &&
            (currentQuantity > 0 ? (
             <div className='flex items-ceneter gap-3 sm:gap-8 '> 
              <UpdateItemQuantity id={pizza.id} />
              <DeleteItem pizzaId={pizza.id}/>
               </div>
            ) : (
              <Button onClick={handleAddToCart} type="small">
                Add to cart
              </Button>
            ))}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
