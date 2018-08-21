INSERT INTO tools (
    tool_owner,
    tool_name,
    tool_type,
    tool_descript,
    times_rented,
    tool_condition,
    for_rent,
    for_sale,
    delivery,
    pick_up,
    power_tool,
    power_type,
    requires_fuel,
    fuel_type,
    tool_img,
    tool_price,
    deposit,
    currently_available
)
VALUES (
    $1,
    $2,
    $3,
    $4,
    $5,
    $6,
    $7,
    $8,
    $9,
    $10,
    $11,
    $12,
    $13,
    $14,
    $15,
    $16,
    $17,
    $18
)

RETURNING *