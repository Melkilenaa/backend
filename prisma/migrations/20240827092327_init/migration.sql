BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Stickynotes] (
    [id] NVARCHAR(1000) NOT NULL,
    [title] NVARCHAR(1000) NOT NULL,
    [content] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Stickynotes_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [Stickynotes_pkey] PRIMARY KEY CLUSTERED ([id])
);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
