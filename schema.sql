CREATE TABLE staff (
    StaffID VARCHAR(8) NOT NULL,
    fullname VARCHAR(100) NOT NULL,
    Birthday DATE,
    Gender INT(1) CHECK (Gender IN (1, 2)),
    PRIMARY KEY (StaffID)
);

INSERT INTO staff (StaffID, fullname, Birthday, Gender)
VALUES ('S0000001', 'John Doe', '1985-07-12', 1);

INSERT INTO staff (StaffID, fullname, Birthday, Gender)
VALUES ('S0000002', 'Jane Smith', '1990-11-23', 2);
