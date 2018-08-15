SELECT * FROM users JOIN tools ON users.userid = tools.tool_owner and tools.tool_id =$1
