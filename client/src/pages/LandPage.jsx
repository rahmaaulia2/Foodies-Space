import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { readData } from "../store/fetch";

export default function LandPage() {
    const dispatch = useDispatch()
    const ini = useSelector((state)=>{
        return state.fetch.dataFood
    })

    useEffect(()=>{
        dispatch(readData())
    },[])
    console.log(ini);
    return (
        <>
            <div
                className="hero min-h-screen"
                style={{
                    backgroundImage: "url(https://i.pinimg.com/originals/47/78/06/477806389d2a432b44f31f9ca31308b7.png)",
                }}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-neutral-content text-center">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
                        <p className="mb-5">
                        Join our community of food enthusiasts and enhance your cooking skills with step-by-step tutorials.
                        </p>
                        <Link to={'/login'} className="btn btn-primary">Get Started</Link>
                    </div>
                </div>
            </div>
        </>
    )
}