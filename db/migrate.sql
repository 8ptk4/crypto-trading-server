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
    value REAL DEFAULT 0,

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
    buyer VARCHAR
(50) NOT NULL,
    price INTEGER
    NOT NULL,
    currency VARCHAR
(40) NOT NULL,
    action VARCHAR
(40) NOT NULL,
    amount INTEGER NOT NULL DEFAULT 0,
    date TIME DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE
IF NOT EXISTS chart
(
    btc INTEGER NOT NULL,
    bc INTEGER NOT NULL,
    date TIME
DEFAULT CURRENT_TIMESTAMP
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


CREATE TRIGGER
IF NOT EXISTS update_stocks AFTER
INSERT ON
history
BEGIN
    UPDATE crypto SET
        value = ((SELECT ABS(RANDOM()) % (40000 - 1000) + 1000))
    WHERE currency=NEW.currency;
END;

CREATE TRIGGER
IF NOT EXISTS update_chart AFTER
UPDATE ON
crypto
BEGIN
    INSERT INTO chart
        (btc, bc)
    VALUES
        (
            (SELECT value
            FROM crypto
            WHERE currency='BitCoin')
    ,
            (SELECT value
            FROM crypto
            WHERE currency='BitConnect')
    );
END;
