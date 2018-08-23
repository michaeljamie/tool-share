CREATE TABLE users (
	userID SERIAL PRIMARY KEY,
	username VARCHAR(100),
	fullName VARCHAR(100),
	email VARCHAR(75),
	phone VARCHAR(25),
	zipcode VARCHAR(50),
	profile_pic TEXT,
	authID TEXT,
	bio VARCHAR(200),
	listerRating DECIMAL(3, 2),
	renterRating DECIMAL(3, 2),
    latitude VARCHAR(50),
    longitude VARCHAR(50)
);

CREATE TABLE tools (
    tool_ID SERIAL PRIMARY KEY,
    tool_owner INT REFERENCES users(userID),
    tool_name VARCHAR(150),
    tool_type VARCHAR(150),
    tool_descript VARCHAR(200),
    tool_submitted TIMESTAMP DEFAULT NOW(),
    times_rented INT,
    tool_condition VARCHAR (150),
    for_rent BOOLEAN,
    for_sale BOOLEAN,
    delivery BOOLEAN,
    pick_up BOOLEAN,
    power_tool BOOLEAN,
    requires_fuel BOOLEAN,
    fuel_type VARCHAR (50),
    tool_img VARCHAR (250),
    tool_price INT,
    renter_id INT REFERENCES users(userID),
    deposit MONEY,
    currently_available BOOLEAN
);

CREATE TABLE search_tags (
	tool_id INT REFERENCES tools(tool_id),
	drill BOOLEAN,
    hammer_drill BOOLEAN,
    hammer BOOLEAN,
    jack_hammer BOOLEAN,
    sander BOOLEAN,
    grinder BOOLEAN,
    auger BOOLEAN,
    saw BOOLEAN,
    power_tool BOOLEAN,
    mower BOOLEAN,
    trimmer BOOLEAN,
    hand_tool BOOLEAN,
    ladder BOOLEAN,
    welding BOOLEAN,
    air_compressor BOOLEAN,
    vacuum BOOLEAN, 
    pressure_washer BOOLEAN,
    ratchet BOOLEAN,
    wrench BOOLEAN,
    lawn_tool BOOLEAN
);

CREATE TABLE messages (
	room_id TEXT PRIMARY KEY,
	sender_id INT REFERENCES users(userid),
	receiver_id INT REFERENCES users(userid)
);

CREATE TABLE chats (
	chat_id SERIAL PRIMARY KEY,
	room_id TEXT REFERENCES messages(room_id),
    messages TEXT,
    message_date TEXT,
    message_time TEXT
);

create table reservations (id serial primary key, tool_id int references tools(tool_id), pickup_date varchar(10), return_date varchar(10), renter_id int references users(userid));
