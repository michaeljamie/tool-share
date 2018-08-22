INSERT INTO users
(authID, username, fullName, profile_pic, email)
VALUES
($1, $2, $2, $3, $4)
RETURNING *;