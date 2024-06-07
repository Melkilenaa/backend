CREATE OR ALTER PROCEDURE updateNote
AS 
BEGIN
SELECT* FROM stickynotes WHERE note_id =@note_id
END