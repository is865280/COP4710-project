CREATE TABLE `users` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `username` varchar(255) UNIQUE,
  `email` varchar(255),
  `university_id` int,
  `hash_password` varchar(255)
);

CREATE TABLE `university` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255),
  `location_id` int,
  `description` text,
  `num_students` int,
  `pictures` int
);

CREATE TABLE `admin` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `user_id` int,
  `RSO_id` int
);

CREATE TABLE `super_admin` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `user_id` int,
  `university_id` int
);

CREATE TABLE `RSO` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255),
  `description` text,
  `num_members` int,
  `active` boolean DEFAULT false
);

CREATE TABLE `event` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255),
  `location_id` int,
  `time` time,
  `date` date,
  `category` ENUM ('rso', 'public', 'private'),
  `description` text,
  `contact_phone` int,
  `contact_email` varchar(255)
);

CREATE TABLE `public_event` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `created_by` int,
  `approved_by` int,
  `event_id` int
);

CREATE TABLE `private_event` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `created_by` int,
  `approved_by` int,
  `university_id` int,
  `event_id` int
);

CREATE TABLE `RSO_event` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `RSO_id` int,
  `event_id` int
);

CREATE TABLE `comments` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `event_id` int,
  `created_by` int,
  `rating` int,
  `text` text
);

CREATE TABLE `members` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `user_id` int,
  `RSO_id` int
);

CREATE TABLE `location` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255),
  `address` text,
  `latitude` float,
  `longitude` float
);

ALTER TABLE `users` ADD FOREIGN KEY (`university_id`) REFERENCES `university` (`id`);

ALTER TABLE `university` ADD FOREIGN KEY (`location_id`) REFERENCES `location` (`id`);

ALTER TABLE `admin` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `admin` ADD FOREIGN KEY (`RSO_id`) REFERENCES `RSO` (`id`);

ALTER TABLE `super_admin` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `super_admin` ADD FOREIGN KEY (`university_id`) REFERENCES `university` (`id`);

ALTER TABLE `event` ADD FOREIGN KEY (`location_id`) REFERENCES `location` (`id`);

ALTER TABLE `public_event` ADD FOREIGN KEY (`created_by`) REFERENCES `admin` (`id`);

ALTER TABLE `public_event` ADD FOREIGN KEY (`approved_by`) REFERENCES `super_admin` (`id`);

ALTER TABLE `public_event` ADD FOREIGN KEY (`event_id`) REFERENCES `event` (`id`);

ALTER TABLE `private_event` ADD FOREIGN KEY (`created_by`) REFERENCES `admin` (`id`);

ALTER TABLE `private_event` ADD FOREIGN KEY (`approved_by`) REFERENCES `super_admin` (`id`);

ALTER TABLE `private_event` ADD FOREIGN KEY (`university_id`) REFERENCES `university` (`id`);

ALTER TABLE `private_event` ADD FOREIGN KEY (`event_id`) REFERENCES `event` (`id`);

ALTER TABLE `RSO_event` ADD FOREIGN KEY (`RSO_id`) REFERENCES `RSO` (`id`);

ALTER TABLE `RSO_event` ADD FOREIGN KEY (`event_id`) REFERENCES `event` (`id`);

ALTER TABLE `comments` ADD FOREIGN KEY (`event_id`) REFERENCES `event` (`id`);

ALTER TABLE `comments` ADD FOREIGN KEY (`created_by`) REFERENCES `users` (`id`);

ALTER TABLE `members` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `members` ADD FOREIGN KEY (`RSO_id`) REFERENCES `RSO` (`id`);

ALTER TABLE `members` ADD UNIQUE KEY (`user_id`, `RSO_id`)
ALTER TABLE `event` ADD UNIQUE KEY (`location_id`, `time`)

CREATE TRIGGER joinRSO BEFORE INSERT ON members 
FOR EACH ROW 
UPDATE RSO SET num_members = num_members + 1 WHERE id = NEW.RSO_id

CREATE TRIGGER leaveRSO BEFORE DELETE ON members 
FOR EACH ROW 
UPDATE RSO SET num_members = num_members - 1 WHERE id = OLD.RSO_id

delimiter |

CREATE TRIGGER isActive AFTER INSERT ON members
  FOR EACH ROW
  BEGIN
    UPDATE RSO SET active = IF(active > 4,true,false) WHERE id = NEW.RSO_id;
  END;
|

delimiter ;