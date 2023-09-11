import React, { useEffect, useState } from 'react'
import './style.css';
import axios from 'axios';
import BounceLoader from "react-spinners/BounceLoader";
import {ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Home = () => {
    let [loading,setLoading] = useState(true);
    const [city,setCity] = useState();
    const [data,setData] = useState({
        celcius:10,
        name:'',
        humidity:10,
        wind:40,
        img:'img/clouds.png'
    })
    useEffect(()=>{
        const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=&appid=86b4c4a1910e01a7612031ce78990ea0&units=metric";
        axios.get(apiUrl)
        .then(res=>{
            if(res.data.length!==0){
                setLoading(false);
                setData({
                    ...data,
                    celcius:res.data.main.temp,
                    name:res.data.name,
                    humidity:res.data.main.humidity,
                    wind:res.data.wind.speed,
                })
                console.log(res.data);
            }
            else{
                setLoading(true);
                toast.error("something went wrong!!");
            }
        })
        .catch(err=>{
            // console.log(err);
        })
    },[])

    const handleClick = ()=>{
        if(city !==""){
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=86b4c4a1910e01a7612031ce78990ea0&units=metric`;
            axios.get(apiUrl)
            .then(res=>{
                let imagePath = '';
                if(res.data.weather[0].main === "Clouds"){
                    imagePath = "img/clouds.png";
                }
                else if(res.data.weather[0].main === "Rain"){
                    imagePath = "img/rain.png";
                }
                else if(res.data.weather[0].main === "Clear"){
                    imagePath = "img/sunny.png";
                }
                else if(res.data.weather[0].main === "Drizzle"){
                    imagePath = "img/drizzle.png";
                }
                else if(res.data.weather[0].main === "Mist"){
                    imagePath = "img/mist.png";
                }
                else{
                    imagePath = "img/clouds.png";
                }
                setData({
                    ...data,
                    celcius:res.data.main.temp,
                    name:res.data.name,
                    humidity:res.data.main.humidity,
                    wind:res.data.wind.speed,
                    img:imagePath,
                })
                // console.log(res.data);
            })
            .catch(err=>{
                // console.log(err);
                toast.error("Invalid City Name");
            })
        }
        else{
            toast.error("Enter a City");
        }
    }
  return (
    <div className='container'>
        <ToastContainer
            position="bottom-center"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
        />

        <div className='weather'>
            <div className='search'>
                <input type='text' placeholder='Enter City Name...' onChange={e=> setCity(e.target.value)}/>
                <button onClick={handleClick}><img src="img/search.svg" alt=""/></button>
            </div>
            <div className='wininfo'>
            {data.name===""?
            <div>
                <h2>Waiting For City Name...</h2>
                <div className='loading'>
                <BounceLoader
                    color={"#2f6de0"}
                    loading={loading}
                    size={80}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                    />
                </div>
            </div>
                :
                <>
                <img src={data.img} alt="" style={{width:'170px'}}/>
                <h1>{data.celcius}°C</h1>
                <h2>{data.name}</h2>
                <div className='details'>
                    <div className="col">
                        <img src='img/humidity.svg' alt=''/>
                        <div className='humidity'>
                            <p>{data.humidity}%</p>
                            <p>Humidity</p>
                        </div>
                    </div>
                    <div className="col">
                    <img src='img/wind.svg' alt=''/>
                        <div className='wind'>
                            <p>{data.wind} km/h</p>
                            <p>Wind</p>
                        </div>
                    </div>
                </div>
                </>
            }
            </div> 
        </div>
    </div>
  )
}

export default Home