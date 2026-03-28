create table author
(
    id varchar(36) primary key,
    status varchar(50),
    name varchar(140),
    title_tr varchar(180),
    title_de varchar(180),
    expertise_tr clob,
    expertise_de clob,
    bio_tr clob,
    bio_de clob,
    created_at timestamp
);
