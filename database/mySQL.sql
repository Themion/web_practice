drop database mySQL;

create database mySQL;
use mySQL;

create table topic (
    id int not null auto_increment,
    title varchar(100) not null,
    description text(65535) null,
    created datetime not null,
    author_id int null,
    primary key (id)
);

create table author (
    id int not null auto_increment,
    name varchar(30) not null,
    profile varchar(100) null,
    primary key (id)
);

desc topic;

insert into topic (title, description, created, author_id) 
    values('MySQL', 'MySQL is ...', NOW(), 1);
insert into topic (title, description, created, author_id) 
    values('ORACLE', 'Oracle is', NOW(), 1);
insert into topic (title, description, created, author_id) 
    values('SQL Server', 'SQL Server is ...', NOW(), 2);
insert into topic (title, description, created, author_id) 
    values('PostgreSQL', 'PostgreSQL is ...', NOW(), 3);
insert into topic (title, description, created, author_id) 
    values('MongoDB', 'MongoDB is ...', NOW(), 1);

insert into author (name, profile) values ('root', 'developer');
insert into author (name, profile) values ('afdsgdh', 'db manager');
insert into author (name, profile) values ('rokjghfbdvot', 'adfsnmmnbvc');

select * from topic;
select id, title, description from topic 
    where author_id = 1
    order by id desc
        limit 2;

update topic set description='Oracle is ...', title='Oracle' where id = 2;
select * from topic
    where id = 2;

delete from topic where id = 4;

select * from topic left join author on topic.author_id = author.id;
select topic.id, title, description, created, name, profile from topic left join author on topic.author_id = author.id;
