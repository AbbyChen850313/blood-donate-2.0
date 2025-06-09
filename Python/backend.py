from flask import Flask, jsonify, request
from flask_cors import CORS
from google_firestore_mgr import getMoreData,setMoreData,getNumberData,setNumberData

app = Flask(__name__)
CORS(app)

@app.route('/more-data', methods=['GET', 'POST', 'OPTIONS'])
def more_data_handler():
    headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Max-Age': '3600'
    }
    if request.method == 'OPTIONS':
        return '', 204, headers
    try:
        if request.method == 'POST':
            return setMoreData(request, headers)
        elif request.method == 'GET':
            return getMoreData(headers)
    except Exception as e:
        return jsonify({'error': str(e)}), 500, headers
    return 'Method Not Allowed', 405, headers


@app.route('/number-data', methods=['GET', 'POST', 'OPTIONS'])
def number_data_handler():
    headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Max-Age': '3600'
    }
    if request.method == 'OPTIONS':
        return '', 204, headers
    try:
        if request.method == 'POST':
            return setNumberData(request, headers)
        elif request.method == 'GET':
            return getNumberData(headers)
    except Exception as e:
        return jsonify({'error': str(e)}), 500, headers
    return 'Method Not Allowed', 405, headers

if __name__ == '__main__':
    app.run(debug=True, port=5001)
