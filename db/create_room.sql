INSERT INTO messages (message_id, sender_id, receiver_id)
VALUES ($1, $2, $3)
RETURNING*