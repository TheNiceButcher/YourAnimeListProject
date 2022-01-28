--\c youranimelistdb lelouch
CREATE TABLE Animes(
  nom TEXT NOT NULL,
  nanime SERIAL PRIMARY KEY
);
CREATE TABLE Utilisateur (
        pseudo TEXT PRIMARY KEY,
        avatar TEXT DEFAULT '/pictures/default.jpeg',
        mot_de_passe TEXT NOT NULL
);
INSERT INTO Animes(nom) VALUES
('Code Geass'),
('Death Note');
--DO $$
--BEGIN
--IF NOT EXISTS(SELECT * FROM Anime) tHEN INSERT INTO Coucou(id) VALUES ('kebab');
--END IF;
--END $$;
