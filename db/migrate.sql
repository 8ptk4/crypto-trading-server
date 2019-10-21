CREATE TABLE
IF NOT EXISTS accounts
(
    accountId INTERGER PRIMARY KEY,
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
    walletId INTEGER PRIMARY KEY,
    user VARCHAR
(60) NOT NULL,
    balance INTEGER DEFAULT 0,
    

    UNIQUE
(user)
);

CREATE TABLE
IF NOT EXISTS crypto
(
    cryptoId INTEGER PRIMARY KEY,
    currency VARCHAR
(40) NOT NULL,
    value REAL,

    UNIQUE
(currency)
);

INSERT INTO crypto
    (currency, value)
VALUES
    ('BitCoin', 7900),
    ('BitConnect', 40000);

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

