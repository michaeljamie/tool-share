SELECT DISTINCT u.fullname, u.profile_pic, m.room_id, c.message_date, c.message_time FROM users u
JOIN messages m ON u.userid = m.receiver_id
JOIN chats c ON m.room_id = c.room_id
WHERE m.sender_id = $1;