CREATE OR ALTER PROCEDURE createnote(
    @note_id VARCHAR(255),
    @title VARCHAR(255),
    @content VARCHAR(255),
    @created_at DATETIME2
)
AS
BEGIN
    INSERT INTO stickynotes(note_id, title, content, created_at)
    VALUES(@note_id,@title,@content,@created_at)
END