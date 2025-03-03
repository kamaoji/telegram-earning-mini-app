from flask import Flask, request, jsonify
import sqlite3

app = Flask(__name__)

# Database Connection Function
def connect_db():
    return sqlite3.connect("database.db")

# Home Route
@app.route("/")
def home():
    return "टेलीग्राम अर्निंग मिनी ऐप का बैकएंड सही से चल रहा है!"

# User Registration
@app.route("/register", methods=["POST"])
def register():
    data = request.json
    user_id = data["user_id"]
    
    conn = connect_db()
    cursor = conn.cursor()
    
    cursor.execute("INSERT INTO users (user_id, balance, spins) VALUES (?, ?, ?)", (user_id, 0, 1))
    conn.commit()
    conn.close()
    
    return jsonify({"message": "रजिस्ट्रेशन सफल", "user_id": user_id})

# Spin & Earn
@app.route("/spin", methods=["POST"])
def spin():
    data = request.json
    user_id = data["user_id"]

    prizes = [5, 10, 20, 50, 0]  # इनाम की लिस्ट
    reward = random.choice(prizes)

    conn = connect_db()
    cursor = conn.cursor()

    cursor.execute("UPDATE users SET balance = balance + ?, spins = spins - 1 WHERE user_id = ?", (reward, user_id))
    conn.commit()
    conn.close()

    return jsonify({"message": f"आपने ₹{reward} जीते!", "reward": reward})

# Withdrawal Request
@app.route("/withdraw", methods=["POST"])
def withdraw():
    data = request.json
    user_id = data["user_id"]
    amount = data["amount"]
    upi_id = data["upi_id"]

    conn = connect_db()
    cursor = conn.cursor()

    cursor.execute("SELECT balance FROM users WHERE user_id = ?", (user_id,))
    balance = cursor.fetchone()[0]

    if balance >= amount:
        cursor.execute("UPDATE users SET balance = balance - ? WHERE user_id = ?", (amount, user_id))
        conn.commit()
        return jsonify({"message": "विदड्रॉल अनुरोध सफल!"})
    else:
        return jsonify({"error": "बैलेंस पर्याप्त नहीं है!"})

# Run Server
if __name__ == "__main__":
    app.run(debug=True)

import requests

BOT_TOKEN = "7700519873:AAH2o689zcZp5Muppow4gWUflqqIoDcn0AA"
CHANNEL_ID = "@DESIARUNGAMERS"

# User ने चैनल Join किया है या नहीं चेक करें
@app.route("/check_join", methods=["POST"])
def check_join():
    data = request.json
    user_id = data["user_id"]

    url = f"https://api.telegram.org/bot{BOT_TOKEN}/getChatMember?chat_id={CHANNEL_ID}&user_id={user_id}"
    response = requests.get(url).json()

    if response["ok"] and response["result"]["status"] in ["member", "administrator", "creator"]:
        return jsonify({"message": "आपने चैनल जॉइन कर लिया है!", "joined": True})
    else:
        return jsonify({"error": "कृपया पहले चैनल जॉइन करें!", "joined": False})
