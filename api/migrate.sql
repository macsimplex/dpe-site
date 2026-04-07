ALTER TABLE evaluations
  ADD COLUMN token VARCHAR(64) UNIQUE AFTER id,
  ADD COLUMN ai_synthese TEXT AFTER sigma,
  ADD COLUMN ai_point_saillant TEXT AFTER ai_synthese,
  ADD COLUMN ai_insights JSON AFTER ai_point_saillant,
  ADD COLUMN viewed_at DATETIME DEFAULT NULL AFTER ai_insights,
  ADD INDEX idx_token (token);
