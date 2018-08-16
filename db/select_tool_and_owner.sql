SELECT * FROM users JOIN tools ON users.userid = tools.tool_owner AND tools.tool_id = $1
