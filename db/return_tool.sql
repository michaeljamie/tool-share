UPDATE tools
SET currently_available = true
WHERE tool_id = $1;

UPDATE tools
SET renter_id = NULL
WHERE tool_id = $1;