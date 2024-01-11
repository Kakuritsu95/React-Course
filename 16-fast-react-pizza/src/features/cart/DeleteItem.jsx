import Button from "../../ui/Button"
import { deleteItem } from "./cartSlice"
import { useDispatch } from "react-redux"
export default function DeleteItem({pizzaId}) {
   
    const dispatch = useDispatch()
  return (
    <Button onClick={()=>{
        dispatch(deleteItem(pizzaId))
    }} type="small">
    Delete
  </Button>
  )
}
