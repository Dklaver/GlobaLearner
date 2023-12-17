import { useEffect, useState } from "react"
import Chatbar from "./Chatbar"
import { useParams } from "react-router-dom";

export default function ChatLayout() {

    const { id } = useParams();
    
    const [selectedChatId, SetSelectedChatId] = useState();

    useEffect(() => {
       
      }, [])

    return (
        <div>
        <center><h1>chatplaceholder - { id } </h1></center>
        {/* <Chatbar/> */}
        </div>
    )
}