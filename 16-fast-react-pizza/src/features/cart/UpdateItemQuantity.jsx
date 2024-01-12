import { useDispatch,useSelector } from "react-redux"
import Button from "../../ui/Button"
import { decreaseItemQuantity, increaseItemQuanity,getCurrentQuantity } from "./cartSlice"

export default function UpdateItemQuantity({id}) {
    const dispatch = useDispatch()
    const currentQuantity = useSelector(getCurrentQuantity(id))
  return (
    <div className="flex gap-1 items-center md:gap-3">
      <Button type='round' onClick={()=>{dispatch(decreaseItemQuantity(id))}}>-</Button>
    <span className="text-sm font-medium"> {currentQuantity} </span>  
      <Button type='round' onClick={()=>{dispatch(increaseItemQuanity(id))}}>+</Button>
       
   
    </div>
  )
}
