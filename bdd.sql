--\c youranimelistdb lelouch
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
  pseudo TEXT,
  nanime INT,
  PRIMARY KEY (pseudo,nanime)
);
INSERT INTO Animes(nom) VALUES
('Code Geass'),
('Death Note');
INSERT INTO Utilisateur (pseudo,mot_de_passe,description) VALUES
('Sasuke','VILLAGE','Veux mener le chaos'),
('Kira','ryuk','Aime les pommes');
INSERT INTO AnimeList(pseudo,nanime)
('Kira',1);
--DO $$
--BEGIN
--IF NOT EXISTS(SELECT * FROM Anime) tHEN INSERT INTO Coucou(id) VALUES ('kebab');
--END IF;
--END $$;
