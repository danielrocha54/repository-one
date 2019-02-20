create database appdb;
use appdb;

create table user (id int not null auto_increment, firstname varchar(20), lastname varchar(20), username varchar(20), password varchar(20), primary key (id));
create table authentication (token varchar(20) not null, user_id int not null, primary key (token), foreign key (user_id) references  user(id));
create table car (year int, manufacturer varchar(30), model varchar(30));


