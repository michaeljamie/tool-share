SELECT pickup_date, return_date 
FROM reservations
WHERE tool_id = $1;