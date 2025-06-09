##google_firestore_mgr.py
import firebase_admin
from firebase_admin import firestore
from flask import jsonify
from data_provider import getFireBaseJson
# 初始化Firebase Admin
cred=getFireBaseJson()
firebase_admin.initialize_app(cred)

db = firestore.client()

def getNumberData(headers):
    try:
        numberData = []
        docs = db.collection('numberData').stream()
        for doc in docs:
            doc_data = doc.to_dict()
            numberData.append({
                "name": doc_data["name"],
                "number": doc_data["number"],
                "id": doc_data["id"]
            })

        data = {
            "numberData": numberData,
        }
        return jsonify(data), 200, headers
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({"error": str(e)}), 500, headers

def setNumberData(request, headers):
    try:
        json_data = request.json
        new_number_data = json_data.get('numberData', [])
        new_ids = {str(item.get('id')) for item in new_number_data} 
        existing_docs = db.collection('numberData').stream()
        existing_ids = {doc.id for doc in existing_docs}

        ids_to_delete = existing_ids - new_ids

        for doc_id in ids_to_delete:
            db.collection('numberData').document(doc_id).delete()

        for item in new_number_data:
            item_id = str(item.get('id'))
            db.collection('numberData').document(item_id).set(item)

        return jsonify({"message": "Data updated in Firestore"}), 200, headers
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({"error": str(e)}), 500, headers



def getMoreData(headers):
    try:
        doc = db.collection('moreData').document('singleDocument').get()
        if doc.exists:
            data = doc.to_dict()
        else:
            data = {"title": "", "marquee": [], "info": ""}

        return jsonify(data), 200, headers
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({"error": str(e)}), 500, headers

def setMoreData(request, headers):
    try:
        json_data = request.json
        db.collection('moreData').document('singleDocument').set(json_data, merge=True)

        return jsonify({"message": "Data updated in Firestore"}), 200, headers
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({"error": str(e)}), 500, headers
