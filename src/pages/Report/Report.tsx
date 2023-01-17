import { RootState } from "../.."
import { useSelector } from "react-redux"

export function Report(){
   
    const {user} = useSelector((state: RootState)=> state)

    return(
        <iframe width="100" height="100" src={user.reportUrl} />  
    )
}