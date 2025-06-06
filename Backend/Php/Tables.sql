CREATE TABLE users(
    user_uniqueID INT AUTO_INCREMENT PRIMARY KEY,
    user_email VARCHAR(100) NOT NULL UNIQUE,
    first_name VARCHAR(50),
    Last_name VARCHAR(50),
    username VARCHAR(50) NOT NULL UNIQUE,
    user_password VARCHAR(250) NOT NULL,
    user_colour VARCHAR(7),
    role ENUM('buyer', 'seller', 'admin') NOT NULL
    
);

CREATE TABLE buyers(
    buyer_ID INT PRIMARY KEY,
    FOREIGN KEY (buyer_ID) REFERENCES users(user_uniqueID) ON DELETE CASCADE
);


CREATE TABLE sellers(
    seller_ID INT primary KEY,
    nationality_ID INT NOT NULL UNIQUE,
    FOREIGN KEY (seller_ID) REFERENCES users(user_uniqueID) ON DELETE CASCADE    
);

CREATE TABLE administrator(
    admin_ID INT PRIMARY KEY,
	FOREIGN KEY (admin_ID) REFERENCES users(user_uniqueID) ON DELETE CASCADE
);

CREATE TABLE messages(
    message_ID INT auto_increment PRIMARY KEY,
    sender_ID INT NOT NULL,
    receiver_ID INT NOT NULL,
    text_msg text NOT NULL,
	FOREIGN KEY (sender_ID) REFERENCES users(user_uniqueID) ON DELETE CASCADE,
    FOREIGN KEY (receiver_ID) REFERENCES users(user_uniqueID) ON DELETE CASCADE
);

CREATE TABLE item(
    item_ID INT auto_increment PRIMARY KEY,
    item_Name varchar(50),
    short_Desc varchar(100),
    item_Desc TEXT,
    item_Price DECIMAL(10,2),
    seller_ID INT,
    item_Image longblob,
    image_Type varchar(100),
    FOREIGN KEY (seller_ID) REFERENCES users(user_uniqueID) ON DELETE CASCADE
);

CREATE TABLE wishlist(
    wishlist_ID INT AUTO_INCREMENT PRIMARY KEY,
    buyer_ID INT,
    item_ID INT,
    FOREIGN KEY (buyer_ID) REFERENCES buyers(buyer_ID) ON DELETE CASCADE,
    FOREIGN KEY (item_ID) REFERENCES item(item_ID) ON DELETE CASCADE,
    UNIQUE (buyer_ID, item_ID)
);
