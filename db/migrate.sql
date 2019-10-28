-------------------------------------------------------------------------------
-- ACCOUNTS
-- Store all account registrations
-------------------------------------------------------------------------------
DROP TABLE IF EXISTS accounts;

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
-------------------------------------------------------------------------------

-------------------------------------------------------------------------------
-- WALLETS 
-- STORAGE OF ACCOUNT BALANCE aka BANK
-------------------------------------------------------------------------------
DROP TABLE IF EXISTS wallets;

CREATE TABLE
IF NOT EXISTS wallets
(
    user VARCHAR
(60) NOT NULL,
    balance INTEGER DEFAULT 0,
    

    UNIQUE
(user)
);
-------------------------------------------------------------------------------

-------------------------------------------------------------------------------
-- CRYPTO
-- What the crypto currencies is worth
-------------------------------------------------------------------------------
DROP TABLE IF EXISTS crypto;

CREATE TABLE
IF NOT EXISTS crypto
(
    currency VARCHAR
(40) NOT NULL,
    value REAL DEFAULT 0,

    UNIQUE
(currency)
);

-- INSERT STARTING VALUES
INSERT INTO crypto
    (currency, value)
VALUES
    ('BitCoin', 6000),
    ('BitConnect', 40000);
-------------------------------------------------------------------------------

-------------------------------------------------------------------------------
-- HOLDINGS
-- How many of each crypto currency each account have
-------------------------------------------------------------------------------
DROP TABLE IF EXISTS holdings;

CREATE TABLE
IF NOT EXISTS holdings
(
    account VARCHAR
(60) NOT NULL,
    crypto VARCHAR
(40) NOT NULL,
    amount INTERGER DEFAULT 0
);
-------------------------------------------------------------------------------

-------------------------------------------------------------------------------
-- HISTORY
-- Successful transactions
-------------------------------------------------------------------------------
DROP TABLE IF EXISTS history;

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
-------------------------------------------------------------------------------

-------------------------------------------------------------------------------
-- CHART
-- Crypto currencies after each transaction
-------------------------------------------------------------------------------
DROP TABLE IF EXISTS chart;

CREATE TABLE
IF NOT EXISTS chart
(
    btc INTEGER NOT NULL,
    bc INTEGER NOT NULL,
    date TIME
DEFAULT CURRENT_TIMESTAMP
);
-------------------------------------------------------------------------------

-------------------------------------------------------------------------------
-- TRIGGERS 
-------------------------------------------------------------------------------
CREATE TRIGGER aft_create_user AFTER
INSERT ON
accounts
BEGIN
    INSERT INTO wallets
        (user)
    VALUES(NEW.email);
END;
-------------------------------------------------------------------------------
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
-------------------------------------------------------------------------------
CREATE TRIGGER
IF NOT EXISTS update_stocks AFTER
INSERT ON
history
BEGIN
    UPDATE crypto SET
        value = ((SELECT ABS(RANDOM()) % (40000 - 1000) + 1000))
    WHERE currency=NEW.currency;
END;
-------------------------------------------------------------------------------
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
-------------------------------------------------------------------------------