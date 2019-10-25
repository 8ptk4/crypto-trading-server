CREATE TABLE
IF NOT EXISTS accounts
(
    firstname VARCHAR
(60) NOT NULL,
    lastname VARCHAR
(60) NOT NULL,
    email VARCHAR
(60) NOT NULL,
    password VARCHAR
(255) NOT NULL,

    UNIQUE
(email)
);



CREATE TABLE
IF NOT EXISTS wallets
(
    user VARCHAR
(60) NOT NULL,
    balance INTEGER DEFAULT 0,
    

    UNIQUE
(user)
);

CREATE TABLE
IF NOT EXISTS crypto
(
    currency VARCHAR
(40) NOT NULL,
    value REAL,

    UNIQUE
(currency)
);

INSERT INTO crypto
    (currency, value)
VALUES
    ('BitCoin', 6000),
    ('BitConnect', 40000);


CREATE TABLE
IF NOT EXISTS holdings
(
    account VARCHAR
(60) NOT NULL,
    crypto VARCHAR
(40) NOT NULL,
    amount INTERGER DEFAULT 0
);


CREATE TABLE
IF NOT EXISTS history
(
    historyId INTEGER PRIMARY KEY,
    buyer VARCHAR
(50) NOT NULL,
    currency VARCHAR
(40) NOT NULL,
    amount INTEGER NOT NULL,
    date DATETIME DEFAULT CURRENT_TIMESTAMP,

    UNIQUE
(historyID)
);






CREATE TRIGGER aft_create_user AFTER
INSERT ON
accounts
BEGIN
    INSERT INTO wallets
        (user)
    VALUES(NEW.email);
END;

CREATE TRIGGER aft_create_user_holdings AFTER
INSERT ON
accounts
BEGIN
    INSERT INTO holdings
        (account, crypto)
    VALUES
        (NEW.email, 'BitCoin'),
        (NEW.email, 'BitConnect');
END;

/* After update on holdings account 
    * Change wallet balance
*/

