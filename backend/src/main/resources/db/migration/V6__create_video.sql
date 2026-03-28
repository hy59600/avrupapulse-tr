create table video
(
    id varchar(36) primary key,
    status varchar(50),
    category varchar(50),
    title_tr varchar(180),
    title_de varchar(180),
    summary_tr clob,
    summary_de clob,
    source_name varchar(120),
    source_url varchar(500),
    video_url varchar(500),
    created_at timestamp
);
