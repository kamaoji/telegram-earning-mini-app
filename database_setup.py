import sqlite3

conn = sqlite3.connect("database.db")
cursor = conn.cursor()

cursor.execute("""
CREATE TABLE IF NOT EXISTS users (
    user_id TEXT PRIMARY KEY,
    balance INTEGER DEFAULT 0,
    spins INTEGER DEFAULT 1
)
""")

conn.commit()
conn.close()

print("डेटाबेस तैयार है!")
