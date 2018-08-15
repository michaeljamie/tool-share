CREATE TABLE users (
	userID SERIAL PRIMARY KEY,
	username VARCHAR(100),
	fullName VARCHAR(100),
	email VARCHAR(75),
	phone VARCHAR(25),
	zipcode VARCHAR(50),
	profile_pic TEXT,
	authID TEXT,
	bio TEXT,
	listerRating INT,
	renterRating INT
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
    tool_img VARCHAR (250)
);

INSERT INTO tools (
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
    requires_fuel,
    fuel_type,
    tool_img
)
VALUES (
    'Xtremepower US Demolition Hammer',
    'Jackhammer',
    'Concrete breaker can be a ease for people who try to demolition or concrete job site, crushing, chipping, digging and squaring. With its frequency of 3000 BPM (RPM), it is easily break through anything. It use about 1000-Watt, the Drill is about 1 in. to 1.5 in.',
    4,
    'Great',
    true,
    false,
    false,
    true,
    true,
    false,
    'None',
    'https://images.homedepot-static.com/productImages/3a686379-4ddc-4066-a33d-dd3deea7d3d9/svn/xtremepower-us-demolition-breaker-hammers-61105-xp-64_1000.jpg'
);