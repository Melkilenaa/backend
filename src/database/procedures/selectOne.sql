CREATE OR ALTER PROCEDURE selectOne
AS 
BEGIN
SELECT * FROM stickynotes WHERE note_id =@note_id
END