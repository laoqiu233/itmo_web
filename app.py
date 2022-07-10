from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/send_point', methods=['POST'])
def send_point():
    print(request.form)
    return 'пиздец'

if (__name__ == '__main__'):
    app.run(
        debug=True,
        host='0.0.0.0',
    )