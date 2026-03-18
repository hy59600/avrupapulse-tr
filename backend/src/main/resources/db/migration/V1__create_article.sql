create table article
(
 id VARCHAR(36) PRIMARY KEY,
    title_tr varchar(180),
    summary_tr clob,
    source_name varchar(120),
    source_url varchar(500),
    status varchar(50),
    created_at timestamp
);