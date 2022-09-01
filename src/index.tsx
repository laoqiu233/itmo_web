import React, { useEffect } from 'react';
import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import Graph from './components/Graph';
import Form from './components/Form';
import Results from './components/Results';
import './index.less';

function App() {
    const [x, setX] = useState<number>(0);
    const [y, setY] = useState<number>(0);
    const [r, setR] = useState<number>(1);
    const [points, setPoints] = useState<Array<Point>>([]);
    const [loading, setLoading] = useState<boolean>(true);

    function sendPoint(point: PointCreate) {
        const formData = new FormData();
        formData.set('x', point.x.toString());
        formData.set('y', point.y.toString());
        formData.set('r', point.r.toString());
        setLoading(true);
    
        fetch('api/send_point.php', {
            method: 'POST',
            body: formData
        })
            .then(resp => {
                if (resp.ok) {
                    return resp.json()
                } else {
                    throw Error(resp.statusText);
                }
            })
            .then(json => {
                setPoints(json);
                setLoading(false);
            })
            .catch(err => {
                alert(err);
                setLoading(false);
            })
    }

    useEffect(() => {
        fetch('api/get_points.php')
            .then(resp => {
                if (resp.ok) {
                    return resp.json();
                } else {
                    throw new Error(resp.statusText);
                }
            })
            .then(json => {
                setPoints(json);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                alert(err);
                setLoading(false);
            });
    }, []);

    return (
        <StrictMode>
            <header>
                <h1><span className="theme">Tsiu</span> T.</h1>
                <h2>P3132 <span className="gray">Web Lab #1 | Вариант: 3218</span></h2>
            </header>
            <div className='main'>
                <div className="panel" style={{textAlign: 'center'}}>
                    <Graph points={points} r={r} sendPoint={sendPoint}/>
                </div>
                <Form x={x} y={y} r={r} setX={setX} setY={setY} setR={setR} sendPoint={sendPoint} loading={loading}/>
                <Results points={points}/>
            </div>
        </StrictMode>
    )
}

const container = document.getElementById('root');

if (container) {
    const root = createRoot(container);
    root.render(<App/>);
}