CREATE SCHEMA IF NOT EXISTS teste;

CREATE  TABLE teste.users ( 
	id                   serial  NOT NULL  ,
	username             varchar(100)    ,
	name                 varchar(100)    ,
	"password"           varchar(1024)  NOT NULL  ,
	created              timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL  ,
	updated              timestamp DEFAULT CURRENT_DATE NOT NULL  ,
	deleted              timestamp DEFAULT '1970-01-01'   ,
	CONSTRAINT pk_users PRIMARY KEY ( id )
 );

CREATE  TABLE teste.posts ( 
	id                   serial    ,
	user_id              integer  NOT NULL  ,
	title                varchar(100)  NOT NULL  ,
	message              varchar(200)    ,
	created              timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL  
 );

CREATE  TABLE teste.user_logins ( 
	id                   serial  NOT NULL  ,
	user_id              integer  NOT NULL  ,
	created              timestamp DEFAULT CURRENT_TIMESTAMP   ,
	CONSTRAINT pk_user_logins PRIMARY KEY ( id )
 );

ALTER TABLE teste.posts ADD CONSTRAINT fk_posts_users FOREIGN KEY ( user_id ) REFERENCES teste.users( id );

ALTER TABLE teste.user_logins ADD CONSTRAINT fk_user_logins_users FOREIGN KEY ( user_id ) REFERENCES teste.users( id );

COMMENT ON COLUMN teste.users."password" IS 'sha1';
