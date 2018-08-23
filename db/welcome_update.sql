UPDATE users
SET zipcode = $1, phone = $2
WHERE userid = $3;