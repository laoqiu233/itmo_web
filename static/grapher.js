/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('graph');
const width = canvas.width;
const height = canvas.height;
const ctx = canvas.getContext('2d');

const THEME_COLOR = '#8338ec80';

function drawGraph() {
    ctx.font = '10px monospace';
    ctx.fillStyle = '#FFF';
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = THEME_COLOR;
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
    const formData = new FormData(form);
    if (formData.has('r')) {
        const r = formData.get('r');

        points.forEach((v, index) => {
            const x = v.x / r * width / 3 + width / 2;
            const y = -v.y / r * height / 3 + height / 2;

            ctx.fillStyle = v.color;
            ctx.beginPath();
            ctx.arc(x, y, 5, 0, Math.PI*2);
            ctx.fill();
        });
    }
}

drawGraph();

canvas.onmousemove = (e) => {
    drawGraph();
    ctx.fillStyle = THEME_COLOR;
    ctx.beginPath();
    ctx.arc(e.offsetX, e.offsetY, 5, 0, Math.PI*2);
    ctx.fill();
}

canvas.onmouseleave = drawGraph;
document.getElementById('form').onchange = drawGraph;

canvas.onmousedown = (e) => {
    /** @type {HTMLFormElement} */
    const form = document.getElementById("form");

    const formData = new FormData(form);

    if (!formData.has('r')) {
        alert('Please select a value for R first');
        return;
    }

    let r = formData.get('r');
    let x = Math.round((2 * e.offsetX / width - 1) * r * 1.5 * 100) / 100;
    let y = Math.round((-2 * e.offsetY / height + 1) * r * 1.5 * 100) / 100;
    document.getElementById('x-from-graph-click').disabled = false;
    document.getElementById('x-from-graph-click').value = x;

    form['x'].value = x;
    form['y'].value = y;
    form.submit();
}