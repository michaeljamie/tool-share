UPDATE tools
SET currently_available = false
WHERE tool_id = $1;

UPDATE tools
SET renter_id = null
WHERE tool_id = $1;