import React from 'react';

interface ResultsProps {
    points: Array<Point>
}

function Results({ points } : ResultsProps) {
    return (
        <div id="results" className="panel">
            <h1>Results</h1>
            <div className="table-wrapper">
                <table>
                    <tbody>
                        <tr>
                            <th>Attempt #</th>
                            <th>X</th>
                            <th>Y</th>
                            <th>R</th>
                            <th>Result</th>
                            <th>Attempt time</th>
                            <th>Processing time</th>
                        </tr>
                        {
                            points.map((v) => (
                                <tr key={v.id}>
                                    <td>{v.id}</td>
                                    <td>{v.x}</td>
                                    <td>{v.y}</td>
                                    <td>{v.r}</td>
                                    <td className={v.hit ? 'theme' : 'warning'}>{v.hit ? 'HIT' : 'MISS'}</td>
                                    <td>{new Date(v.attempt_time*1000).toLocaleString()}</td>
                                    <td>{v.process_time} ms</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Results;