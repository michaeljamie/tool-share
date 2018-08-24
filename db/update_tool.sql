UPDATE tools
SET tool_name = $1,
    tool_img = $2,
    tool_descript = $3,
    tool_price = $4,
    deposit = $5,
    tool_condition = $6,
    for_rent = $7,
    for_sale = $8,
    delivery = $9,
    pick_up = $10,
    power_tool = $11,
    power_type = $12,
    requires_fuel = $13,
    fuel_type = $14
WHERE tool_id = $15