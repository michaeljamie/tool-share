UPDATE users
SET fullname = $1, bio = $2, email = $3, phone = $4, zipcode = $5
WHERE userid = $6;