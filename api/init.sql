CREATE TABLE IF NOT EXISTS evaluations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    role VARCHAR(100),
    secteur VARCHAR(50),
    effectif INT,
    score_relationnel INT,
    score_sens INT,
    score_gouvernance INT,
    score_operationnel INT,
    score_apprenance INT,
    sgp_norm INT,
    sgp_pct INT,
    sigma DECIMAL(4,2),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
