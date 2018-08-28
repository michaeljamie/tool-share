UPDATE users
SET fullname = $1, bio = $2, profile_pic = $3, email = $4, phone = $5, zipcode = $6
WHERE userid = $7;