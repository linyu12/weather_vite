import { useState, useEffect } from 'react';
import {useCount} from './count.tsx'


interface ITEM {
    lat: string;
    lon: string;
    locationName: string;
    stationId: string;
    time: {
        obsTime: string;
    };
    weatherElement: {
        elementName: string;
        elementValue: string;
    }[];
    parameter: {
        parameterName: string;
        parameterValue: string;
    }[];
}

    function FetchExample() {
        const [data , setData] = useState([]);
        const { count} = useCount();
        
        useEffect(() => {
            fetchData();
            // Fetch data every 5 minutes (300,000 milliseconds)
            const interval = setInterval(fetchData, 300000);
            // Cleanup the interval when the component is unmounted
            return () => clearInterval(interval);
        }, [count]);

        const fetchData = async () => {
            try {
            const response = await fetch('https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0003-001?Authorization=CWB-39B2AC9D-9C96-4196-868C-9EA1062BF9D2&elementName=,TIME,ELEV,WDIR,WDSD,TEMP,HUMD,PRES,24R,H_FX,H_XD,H_FXT,H_F10,H_10D,H_F10T,H_UVI,D_TX,D_TXT,D_TN,D_TNT,D_TS,VIS,Weather&parameterName=CITY'); // Replace with your API endpoint
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const jsonData = await response.json();
            // Extract the relevant data from jsonData and set it to the data state
            setData(jsonData.records?.location || []);
            } catch (error) {
            console.error('Error fetching data:', error);
            }
        };

        return (
            <>
            <p>count:{count}</p>

            {count === 0 ? (
                <>
                    <h1>新竹市</h1>
                    <h2>
                        {data.map((item: ITEM) => {

                            const weatherElement_weather = item.weatherElement.find(
                                (element) => element.elementName === "Weather"
                            );

                            if (item.lat === "24.753481" && weatherElement_weather) {
                                return (
                                    <div>
                                        上次更新時間: {item.time.obsTime} <br/>
                                        氣溫: {item.weatherElement[3].elementValue}°C <br/>
                                        天氣: {weatherElement_weather?.elementValue}
                                    </div>
                                );
                            }
                            return null;
                        })}
                    </h2>
                </>
            ):(
                <>
                <h1>台北市</h1>
                <h2>    
                    
                    {data.map((item: ITEM) => {

                        const weatherElement_weather = item.weatherElement.find(
                            (element) => element.elementName === "Weather"
                        );

                        if (item.lat === "25.031331") {
                            return (
                                <div>
                                    上次更新時間: {item.time.obsTime} <br/>
                                    氣溫: {item.weatherElement[3].elementValue}°C <br/>
                                    天氣: {weatherElement_weather?.elementValue}
                                </div>
                            );
                        }
                        return null;
                    })} 
                </h2>
                </>
            )
            }
            </>
        );
    }

export default FetchExample; 