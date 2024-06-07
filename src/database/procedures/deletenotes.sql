CREATE OR ALTER PROCEDURE deleteNotes
AS
 BEGIN
SELECT * FROM stickynotes WHERE note_id = @note_id
END