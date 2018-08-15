INSERT INTO users
(authID, username, fullName, profile_pic)
VALUES
($1, $2, $2, $3)
RETURNING *;