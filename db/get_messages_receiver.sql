SELECT u.fullname, u.profile_pic, m.room_id FROM users u
JOIN messages m ON u.userid = m.sender_id
WHERE m.receiver_id = $1;