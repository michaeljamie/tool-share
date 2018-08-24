UPDATE tools
SET times_rented = times_rented + 1
WHERE tool_id=$1;

UPDATE tools
set currently_available = fralse
WHERE tool_id=$1;

UPDATE tools
SET renter_id=$2
WHERE tool_id=$1;