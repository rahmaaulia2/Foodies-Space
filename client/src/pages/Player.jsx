import React, { useEffect } from 'react';
import ReactPlayer from 'react-player';
import { useDispatch, useSelector } from 'react-redux';
import { readData } from '../store/fetch';

const VideoPlayer = () => {
    const handlePlay = () => {
        console.log('Video started playing');
    };

    const handlePause = () => {
        console.log('Video paused');
    };

    const dispatch = useDispatch()
    const ini = useSelector((state) => {
        return state.fetch.dataFood
    })

    useEffect(() => {
        dispatch(readData())
    }, [])
    console.log(ini, '<<<<<<<<<<<<<');
    return (
        <>
            {ini.map((el) =>
                <div>
                    <ReactPlayer
                        url={el.strYoutube}
                        playing={true}
                        controls={true}
                        onPlay={handlePlay}
                        onPause={handlePause}
                    />
                </div>
            )}
        </>
    );
};

export default VideoPlayer;
