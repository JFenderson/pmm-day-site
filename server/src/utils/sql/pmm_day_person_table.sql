CREATE DATABASE pmm_day;

USE pmm_day;

CREATE TABLE IF NOT EXISTS members(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phoneNumber BIGINT NOT NULL,
    location_city VARCHAR(50) NOT NULL,
    location_state VARCHAR(50) NOT NULL,
    crabYear INT(4) NOT NULL,
    _CREATED TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
-- dont think this is possibel without innodb
PARTITION BY RANGE( YEAR(crabYear) ) (
    PARTITION Bossman_Iva_Williams VALUES LESS THAN (1996),
    PARTITION Arthur_Means VALUES LESS THAN (2006),
    PARTITION Doc_Williams VALUES LESS THAN (2007),
    PARTITION DC_Crawford VALUES LESS THAN (2012),
    PARTITION James_Merriweather VALUES LESS THAN (2015),
    PARTITION Willie_Snipes VALUES MORE THAN (2016)
   );

-- STORED PROCEDURE TO FIND BOSSMAN IVA WILLIAMS PMM MEMBERS
DELIMITER $$
/* This is a complete statement, not part of the procedure, so use the custom delimiter $$ */
DROP PROCEDURE IF EXISTS Bossman_Iva_Williams_before_1996

/* Now start the procedure code */
CREATE PROCEDURE Bossman_Iva_Williams_before_1996
BEGIN    
  /* Inside the procedure, individual statements terminate with ; */
SELECT * FROM members
WHERE crabYear BETWEEN 1996 AND 2006;

/* whole procedure ends with the custom delimiter */
END$$

/* Finally, reset the delimiter to the default ; */
DELIMITER ;

-- STORED PROCEDURE TO FIND DOC WILLIAMS PMM MEMBERS
DELIMITER $$
/* This is a complete statement, not part of the procedure, so use the custom delimiter $$ */
DROP PROCEDURE IF EXISTS means_1996

/* Now start the procedure code */
CREATE PROCEDURE means_1996
BEGIN    
  /* Inside the procedure, individual statements terminate with ; */
SELECT * FROM members
WHERE crabYear BETWEEN 1996 AND 2006;

/* whole procedure ends with the custom delimiter */
END$$

/* Finally, reset the delimiter to the default ; */
DELIMITER ;

-- STORED PROCEDURE TO FIND DC CRAWFORD PMM MEMBERS
DELIMITER $$
/* This is a complete statement, not part of the procedure, so use the custom delimiter $$ */
DROP PROCEDURE IF EXISTS DC_Crawford_2007

/* Now start the procedure code */
CREATE PROCEDURE DC_Crawford_2007
BEGIN    
  /* Inside the procedure, individual statements terminate with ; */
SELECT * FROM members
WHERE crabYear BETWEEN 2007 AND 2012;

/* whole procedure ends with the custom delimiter */
END$$

/* Finally, reset the delimiter to the default ; */
DELIMITER ;

-- STORED PROCEDURE TO FIND JAMES MERRIWEATHER PMM MEMBERS
DELIMITER $$
/* This is a complete statement, not part of the procedure, so use the custom delimiter $$ */
DROP PROCEDURE IF EXISTS James_Merriweather_2012

/* Now start the procedure code */
CREATE PROCEDURE James_Merriweather_2012
BEGIN    
  /* Inside the procedure, individual statements terminate with ; */
SELECT * FROM members
WHERE crabYear BETWEEN 2013 AND 2015;

/* whole procedure ends with the custom delimiter */
END$$

/* Finally, reset the delimiter to the default ; */
DELIMITER ;

-- STORED PROCEDURE TO FIND Willie Snipes PMM MEMBERS
DELIMITER $$
/* This is a complete statement, not part of the procedure, so use the custom delimiter $$ */
DROP PROCEDURE IF EXISTS Willie_Snipes_2016

/* Now start the procedure code */
CREATE PROCEDURE Willie_Snipes_2016
BEGIN    
  /* Inside the procedure, individual statements terminate with ; */
SELECT * FROM members
WHERE crabYear BETWEEN 2016 AND 2021;

/* whole procedure ends with the custom delimiter */
END$$

/* Finally, reset the delimiter to the default ; */
DELIMITER ;