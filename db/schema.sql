DROP DATABASE IF EXISTS confession_ct;

CREATE DATABASE confession_ct;

USE confession_ct;

CREATE TABLE
	guild_table(
		guild_id VARCHAR(255) NOT NULL UNIQUE,
		guild_name TEXT NOT NULL,
		PRIMARY KEY(guild_id)
  );


CREATE TABLE
	channel_assignments(
		channel_id TEXT NOT NULL,
		channel_name TEXT NOT NULL,
		fn_id INT NOT NULL UNIQUE,
		guild_id TEXT NOT NULL,
		PRIMARY KEY (fn_id),
		FOREIGN KEY(guild_id) REFERENCES guild_table(guild_id)
    );

CREATE TABLE
	role_function(
		role_id VARCHAR(255) NOT NULL,
		role_name TEXT NOT NULL,
		fn_code INT NOT NULL UNIQUE,
		guild_id TEXT NOT NULL,
		PRIMARY KEY(fn_code, role_id),
		FOREIGN KEY(guild_id) REFERENCES guild_table(guild_id)
  );

