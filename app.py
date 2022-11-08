from flask import Flask,jsonify,render_template
import datetime
app = Flask(__name__)
today=datetime.date.today()
user = [
    {
        "name": "ajay",
        "password": "trytoknow",
        "createdat": "today"
    },
    {
        "name": "admin",
        "password": "password",
        "createdat": "today"
    }
]
@app.route('/')
def hello_world():
    return render_template('index.js')

@app.route('/user')
def users():
    return jsonify({'user': user})


app.run(port=5000)