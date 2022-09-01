import React, { useEffect, useRef } from 'react';
import graphImage from '../task_graph.png';

interface GraphProps {
    points: Array<Point>,
    r: number,
    sendPoint: (point: PointCreate) => void
}

const width = 300;
const height = 300;
const themeColor = '#8338ecAA';

function drawGraph(ctx: CanvasRenderingContext2D, points: Array<Point>, r: number) {
    ctx.font = '10px monospace';
    ctx.fillStyle = '#FFF';
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = themeColor;
    // 1st quadrant circle
    ctx.beginPath();
    ctx.arc(width/2, height/2, width/6, 0, -Math.PI/2, true);
    ctx.lineTo(width/2, height/2);
    ctx.fill();

    // 2nd quadrant square
    ctx.fillRect(width/6, 2*height/6, 2*width/6, height/6);

    // 4th quadrant triangle
    ctx.beginPath();
    ctx.moveTo(width/2, 5*height/6);
    ctx.lineTo(4*width/6, height/2);
    ctx.lineTo(width/2, height/2);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(0, height/2);
    ctx.lineTo(width, height/2);
    ctx.lineTo(width-10, height/2-10);
    ctx.moveTo(width, height/2);
    ctx.lineTo(width-10,height/2+10);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(width/2, height);
    ctx.lineTo(width/2, 0);
    ctx.lineTo(width/2-10, 10);
    ctx.moveTo(width/2, 0);
    ctx.lineTo(width/2+10, 10);
    ctx.stroke();

    ctx.fillStyle = '#000';
    const labels = ['-R', '-R/2', '', 'R/2', 'R'];

    for (let i=1; i<6; i++) {
        ctx.beginPath();
        ctx.moveTo(i*width/6, height/2-5);
        ctx.lineTo(i*width/6, height/2+5);
        ctx.moveTo(width/2-5, i*height/6);
        ctx.lineTo(width/2+5, i*height/6);
        ctx.stroke();

        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';
        ctx.fillText(labels[i-1], i*width/6, height/2-7);

        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.fillText(labels[i-1], width/2+7, height - i*height/6);
    }

    // Draw all attempts
    points.forEach((v) => {
        const x = v.x / r * width / 3 + width / 2;
        const y = -v.y / r * height / 3 + height / 2;

        ctx.fillStyle = (v.color ? v.color : '#000');
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI*2);
        ctx.fill();
    });
}

function Graph({points, r, sendPoint} : GraphProps) {
    const canvasEl = useRef<HTMLCanvasElement>(null);

    function drawGraphWithCtx() {
        const ctx = canvasEl.current?.getContext('2d');
        if (ctx) {
            drawGraph(ctx, points, r);
            return ctx;
        }
    }

    useEffect(() => {
        drawGraphWithCtx();
    }, [points, r]);

    return (
        <canvas 
            ref={canvasEl}
            id="canvas"
            width={width}
            height={height} 
            onMouseDown={e => {
                sendPoint({
                    x: Math.round(((e.nativeEvent.offsetX / width) - 0.5) * 3 * r * 100) / 100,
                    y: Math.round(((e.nativeEvent.offsetY / height) - 0.5) * -3 * r * 100) / 100,
                    r: r
                });
            }}
            onMouseLeave={drawGraphWithCtx}
            onMouseMove={e => {
                const ctx = drawGraphWithCtx();
                if (ctx) {
                    ctx.fillStyle = themeColor;
                    ctx.beginPath();
                    ctx.arc(e.nativeEvent.offsetX, e.nativeEvent.offsetY, 5, 0, Math.PI*2);
                    ctx.fill();
                }
            }}
        >
            <img src={graphImage}/>
        </canvas>
    )
}

export default Graph;