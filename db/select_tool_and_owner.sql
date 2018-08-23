SELECT * FROM users 
JOIN tools ON users.userid = tools.tool_owner AND tools.tool_id = $1
-- JOIN tags ON tools.tool_id = search_tags.tool_id