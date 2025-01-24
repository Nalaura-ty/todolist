-- Inserir categorias padrão
INSERT INTO `Category` (`id`, `name`) VALUES
('1', 'Work'),
('2', 'Personal'),
('3', 'Study'),
('4', 'Trip'),
('5', 'Shopping'),
('6', 'Fitness')
ON DUPLICATE KEY UPDATE `id` = `id`;
