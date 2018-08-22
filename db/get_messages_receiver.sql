SELECT u.fullname, u.profile_pic, m.room_id, c.message_date, c.message_time FROM messages m
JOIN users u ON u.userid = m.sender_id
JOIN chats c ON m.room_id = c.room_id
WHERE m.receiver_id = $1;