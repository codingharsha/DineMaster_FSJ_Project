create table users(
	user_id int primary key auto_increment,
    username varchar(50) unique not null,
    password_hash varchar(255) not null,
    email varchar(50) unique not null,
    role enum('CUSTOMER', 'CHEF', 'ADMIN') not null,
    created_at timestamp default current_timestamp
);

create table staff_shifts(
	shift_id int primary key auto_increment,
    user_id int,
    shift_start datetime not null,
    shift_end datetime not null,
    foreign key(user_id) references users(user_id)
);