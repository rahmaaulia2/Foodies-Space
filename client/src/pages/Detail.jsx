import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { readData } from '../store/fetch';
import serverApi from '../helper/serverApi';


export default function Detail() {
    const { id } = useParams()
    const [dataP, setData] = useState([])
    // const [page, setPage] = useState('home')

    const readData1 = async () => {
        console.log(id);
        console.log(localStorage.getItem('access_token'));
        try {
            let { data } = await serverApi({
                url: `/foods/${id}`,
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                }
            })
            setData(data.data)
            console.log(data, '<<<<<<');
            console.log(dataP, ">>>>>>>>>>>>>");
        } catch (error) {
            console.log(error.response);
        }
    }

    // const dispatch = useDispatch()

    const handlePlay = () => {
        console.log('Video started playing');
    };

    const handlePause = () => {
        console.log('Video paused');
    };



    useEffect(() => {
        readData1()
    }, [])

    console.log(dataP, "-------------");
    return (
        <>
            {/* {dataP.map((el) => */}
            <div className="card-normal glass w-auto">
                <div className='container flex' style={{alignItems : "center", justifyContent : "center"}}>
                    <figure>
                        <img
                            className='size-80'
                            src={dataP.strMealThumb}
                            alt="car!" />
                    </figure>
                    <figure>
                        <ReactPlayer
                            url={dataP.strYoutube}
                            playing={true}
                            controls={true}
                            onPlay={handlePlay}
                            onPause={handlePause}
                        />
                    </figure>
                </div>
                <div className="card-body">
                    <h2 className="card-title">{dataP.strMeal}</h2>
                    <p>Category : {dataP.strCategory}</p>
                    <p>Area : {dataP.strArea}</p>
                    <p>Ingredient : {dataP.strIngredient}</p>
                    <p>Instructions : {dataP.strInstructions}</p>
                    <p>Measure : {dataP.strMeasure}</p>
                    <div className="card-actions justify-end">
                        <Link to={'/home'} className="btn btn-primary">Back</Link>
                    </div>
                </div>
            </div>
            {/* )} */}
        </>
    )
}