import React, { useEffect, useState } from 'react';
import loadingImg from '../loading.svg';

interface FormProps {
    x: number,
    y: number,
    r: number,
    setX: (x: number) => void,
    setY: (y: number) => void,
    setR: (r: number) => void,
    sendPoint: (point: PointCreate) => void
    loading: boolean,
}

const FLOAT_REGEX = /^-?\d+(?:\.\d+)?$/;

function Form({ x, y, r, setX, setY, setR, sendPoint, loading } : FormProps) {
    const [yText, setYText] = useState<string>('');
    const [yWarning, setYWarning] = useState<string>('');

    useEffect(() => {
        setYWarning('');
        if (!FLOAT_REGEX.test(yText) || parseFloat(yText) < -5 || parseFloat(yText) > 5) {
            setYWarning("Invalid Y value. It should be a float from -5 to 5 (Inclusive)");
            return;
        }
        setY(parseFloat(yText));
    }, [yText]);

    return (
        <div className="panel" id="form-panel">
            <form id="htmlForm" action="/send_point.php" method="post" onSubmit={e => {
                e.preventDefault();
                sendPoint({x, y, r});
            }}>    
                <div className="row">
                    <label htmlFor="select-x">X</label>
                    <select name="x" id="select-x" onChange={(e) => setX(parseFloat(e.target.value))} value={x}>
                        <option value="-2">-2</option>
                        <option value="-1.5">-1.5</option>
                        <option value="-1">-1</option>
                        <option value="-0.5">-0.5</option>
                        <option value="0">0</option>
                        <option value="0.5">0.5</option>
                        <option value="1">1</option>
                        <option value="1.5">1.5</option>
                        <option value="2">2</option>
                    </select>
                </div>
                <div className="row">
                    <label htmlFor="input-y">Y</label>
                    <div>
                        <input 
                            type="text"
                            name="y"
                            id="input-y"
                            placeholder="0"
                            required
                            onChange={(e) => setYText(e.target.value)}
                            value={yText}
                        />
                        <p id="input-y-warning" className="warning" hidden={yWarning === ''} style={{marginTop:'5px'}}>{yWarning}</p>
                    </div>
                </div>
                <div className="row">
                    <label>R</label>
                    <div>
                        <div>
                            <div className="row">
                                <input type="radio" name="r" id="r-1" value="1" checked={r===1} onChange={(e) => setR(parseInt(e.target.value))}/>
                                <label htmlFor="r-1">1</label>
                            </div>
                            <div className="row">
                                <input type="radio" name="r" id="r-2" value="2" checked={r===2} onChange={(e) => setR(parseInt(e.target.value))}/>
                                <label htmlFor="r-2">2</label>
                            </div>
                            <div className="row">
                                <input type="radio" name="r" id="r-3" value="3" checked={r===3} onChange={(e) => setR(parseInt(e.target.value))}/>
                                <label htmlFor="r-3">3</label>
                            </div>
                            <div className="row">
                                <input type="radio" name="r" id="r-4" value="4" checked={r===4} onChange={(e) => setR(parseInt(e.target.value))}/>
                                <label htmlFor="r-4">4</label>
                            </div>
                            <div className="row">
                                <input type="radio" name="r" id="r-5" value="5" checked={r===5} onChange={(e) => setR(parseInt(e.target.value))}/>
                                <label htmlFor="r-5">5</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {
                        (
                            loading ? 
                            <img src={loadingImg} style={{width: '30px', margin: 'auto'}}/> :
                            <button id="htmlForm-submit" type="submit" className="row-fill" disabled={yWarning!==''}>Send</button>
                        )
                    }
                </div>
            </form>
        </div>
    )
}

export default Form;