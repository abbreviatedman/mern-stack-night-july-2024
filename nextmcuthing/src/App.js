import "./App.css";
// installed dayjs
import useAxios from "./hooks/useAxios";
import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

// https://whenisthenextmcufilm.com/api?date=2023-08-07
function App() {
  dayjs.extend(relativeTime);

  const [countdown, setCountdown] = useState(``);

  const [setUrl, data, loading, setLoading] = useAxios();

  useEffect(() => {
    let today = dayjs().format(`YYYY-MM-DD`);

    setUrl(`https://whenisthenextmcufilm.com/api?date=${today}`);
    setLoading(true);
  }, []);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setCountdown(dayjs(data.release_date).toNow())
  //   }, 1000)
  // }, [countdown])

  return (
    <>
      {!loading && data ? (
        <center>
          {console.log(dayjs(data.release_date).fromNow())}
          <h1>COUNTDOWN: {countdown}</h1>
          <h1>{data.title}</h1>
          <p>release date: {data.release_date}</p>
          <img src={data.poster_url} />
          <h6>{data.overview}</h6>
        </center>
      ) : (
        <p>loading</p>
      )}
    </>
  );
}

export default App;
