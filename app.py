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

@app.route("/check_like", methods=["POST"])
def check_like():
    data = request.json
    user_id = data["user_id"]
    post_id = data["post_id"]  # Telegram Post ID

    url = f"https://api.telegram.org/bot{BOT_TOKEN}/getChatMember?chat_id={CHANNEL_ID}&user_id={user_id}"
    response = requests.get(url).json()

    if response["ok"]:
        reactions = response["result"].get("custom_emoji_reactions", [])
        if reactions:  # अगर कोई reaction है तो मतलब पोस्ट लाइक की गई
            return jsonify({"message": "आपने पोस्ट को लाइक कर दिया है!", "liked": True})
        else:
            return jsonify({"error": "आपने पोस्ट को लाइक नहीं किया!", "liked": False})
    else:
        return jsonify({"error": "Telegram API से डेटा प्राप्त नहीं हुआ!"})

import requests
from flask import Flask, request, jsonify

app = Flask(__name__)

YOUTUBE_API_KEY = "AIzaSyDK3TrD79-AvhdKu2APb336sypcNmNrcUI"
VIDEO_ID = "YOUR_VIDEO_ID"

@app.route("/check_video_watch", methods=["POST"])
def check_video_watch():
    data = request.json
    user_id = data["user_id"]
    
    url = f"https://www.googleapis.com/youtube/v3/videos?part=statistics&id={VIDEO_ID}&key={YOUTUBE_API_KEY}"
    response = requests.get(url).json()

    if "items" in response and len(response["items"]) > 0:
        view_count = int(response["items"][0]["statistics"]["viewCount"])
        
        # अगर व्यू काउंट 10 से बढ़ा है तो यूजर ने वीडियो देखा
        if view_count > 10:
            return jsonify({"message": "आपने वीडियो देख लिया है!", "watched": True})
        else:
            return jsonify({"error": "कृपया पूरा वीडियो देखें!", "watched": False})
    else:
        return jsonify({"error": "YouTube API से डेटा नहीं मिला!"})

if __name__ == "__main__":
    app.run(debug=True)

@app.route("/ban_user", methods=["POST"])
def ban_user():
    data = request.json
    user_id = data["user_id"]
    
    conn = connect_db()
    cursor = conn.cursor()
    
    cursor.execute("UPDATE users SET banned = 1 WHERE user_id = ?", (user_id,))
    conn.commit()
    conn.close()
    
    return jsonify({"message": f"User {user_id} को Ban कर दिया गया!"})

@app.route("/unban_user", methods=["POST"])
def unban_user():
    data = request.json
    user_id = data["user_id"]
    
    conn = connect_db()
    cursor = conn.cursor()
    
    cursor.execute("UPDATE users SET banned = 0 WHERE user_id = ?", (user_id,))
    conn.commit()
    conn.close()
    
    return jsonify({"message": f"User {user_id} को Unban कर दिया गया!"})

@app.route("/update_balance", methods=["POST"])
def update_balance():
    data = request.json
    user_id = data["user_id"]
    amount = data["amount"]
    
    conn = connect_db()
    cursor = conn.cursor()
    
    cursor.execute("UPDATE users SET balance = balance + ? WHERE user_id = ?", (amount, user_id))
    conn.commit()
    conn.close()
    
    return jsonify({"message": f"User {user_id} का बैलेंस अपडेट कर दिया गया!"})

@app.route("/update_refer", methods=["POST"])
def update_refer():
    data = request.json
    user_id = data["user_id"]
    
    conn = connect_db()
    cursor = conn.cursor()
    
    cursor.execute("UPDATE users SET refer_count = refer_count + 1 WHERE user_id = ?", (user_id,))
    conn.commit()
    conn.close()
    
    return jsonify({"message": f"User {user_id} का Refer Count अपडेट कर दिया गया!"})

@app.route("/approve_withdraw", methods=["POST"])
def approve_withdraw():
    data = request.json
    user_id = data["user_id"]
    
    conn = connect_db()
    cursor = conn.cursor()
    
    cursor.execute("UPDATE withdrawals SET status = 'Approved' WHERE user_id = ?", (user_id,))
    conn.commit()
    conn.close()
    
    return jsonify({"message": f"User {user_id} की Withdrawal Request Approved हो गई!"})

@app.route("/reject_withdraw", methods=["POST"])
def reject_withdraw():
    data = request.json
    user_id = data["user_id"]
    
    conn = connect_db()
    cursor = conn.cursor()
    
    cursor.execute("UPDATE withdrawals SET status = 'Rejected' WHERE user_id = ?", (user_id,))
    conn.commit()
    conn.close()
    
    return jsonify({"message": f"User {user_id} की Withdrawal Request Reject कर दी गई!"})

@app.route("/update_task", methods=["POST"])
def update_task():
    data = request.json
    task_type = data["task_type"]
    link = data["link"]

    conn = connect_db()
    cursor = conn.cursor()
    
    if task_type == "video":
        cursor.execute("UPDATE tasks SET link = ? WHERE task_name = 'watch_video'", (link,))
    elif task_type == "post":
        cursor.execute("UPDATE tasks SET link = ? WHERE task_name = 'like_post'", (link,))
    elif task_type == "channel":
        cursor.execute("UPDATE tasks SET link = ? WHERE task_name = 'join_channel'", (link,))
    
    conn.commit()
    conn.close()
    
    return jsonify({"message": f"{task_type} Task अपडेट कर दिया गया!"})
