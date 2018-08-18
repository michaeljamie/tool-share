SELECT * FROM messages
WHERE sender_id = $1
OR receiver_id = $1;