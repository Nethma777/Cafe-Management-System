create table user(
    id int primary key auto_increment,
    name varchar(255),
    contactNumber varchar(20),
    email varchar(50),
    password varchar(255),
    status varchar(20),
    role varchar(20),
    UNIQUE(email)
);

insert into user(name, contactNumber, email, password, status, role) values('Admin', '1234567890', 'admin@gmail.com
,'admin', 'true', 'admin');   

create table category(
    id int NOT NULL AUTO_INCREMENT,
    name varchar(255)   NOT NULL,
    PRIMARY KEY (id)
    );


create table product(
    id int NOT NULL primary key auto_increment,
    name varchar(255) NOT NULL,
    description varchar(255),
    price int,
    status varchar(20),
    categoryId int NOT NULL
);


create table bill(
    id int NOT NULL primary key auto_increment,
    uuid varchar(255) NOT NULL,
    name varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    contactNumber varchar(20) NOT NULL,
    paymentMode varchar(20) NOT NULL,
    total int NOT NULL,
    productDetails JSON DEFAULT NULL,
    CreatedBy varchar(255) NOT NULL,
);