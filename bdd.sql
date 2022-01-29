DROP TABLE IF EXISTS AnimeList;
DROP TABLE IF EXISTS GENRE;
DROP TABLE IF EXISTS NOTES;
DROP TABLE IF EXISTS ANIMES;
DROP TABLE IF EXISTS Utilisateur;
CREATE TABLE Animes(
  nom TEXT NOT NULL,
  nanime SERIAL PRIMARY KEY
);
CREATE TABLE Utilisateur (
        pseudo TEXT PRIMARY KEY,
        avatar TEXT DEFAULT '/pictures/default.jpeg',
        mot_de_passe TEXT NOT NULL,
        description TEXT
);
CREATE TABLE Animelist (
  pseudo TEXT REFERENCES Utilisateur(pseudo),
  nanime INT REFERENCES Animes(nanime),
  PRIMARY KEY (pseudo,nanime)
);
CREATE TABLE Genre (
  genre TEXT NOT NULL,
  nanime INT REFERENCES Animes(nanime),
  PRIMARY KEY (genre,nanime)
);
CREATE TABLE Notes (
  nanime INT REFERENCES Animes(nanime),
  note INT,
  pseudo TEXT REFERENCES Utilisateur(pseudo),
  PRIMARY KEY (nanime,pseudo)
);
INSERT INTO Animes(nom) VALUES
('Code Geass'),
('Death Note');
INSERT INTO Utilisateur (pseudo,mot_de_passe,description) VALUES
('Sasuke','VILLAGE','Veux mener le chaos'),
('Kira','ryuk','Aime les pommes');
INSERT INTO AnimeList(pseudo,nanime) VALUES
('Kira',1);
INSERT INTO Genre(genre,nanime) VALUES
('Shonen',1),
('Shonen',2),
('Psychologique',1),
('Violent',2);
