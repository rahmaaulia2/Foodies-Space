import { useDispatch, useSelector } from "react-redux"
import Elevation from "../components/Paper"
import { readData } from "../store/fetch"

export default function Home(){
    const dispatch = useDispatch()
    const ini = useSelector((state)=>{
        return state.fetch.dataFood
    })

    useEffect(()=>{
        dispatch(readData())
    },[])

    return (
        <>
        <Elevation dataP="data"/>
        </>
    )
}