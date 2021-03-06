ALTER PROC [dbo].[Comments_Delete_ById]
			@Id int

/*----TEST CODE----

******DataTypes******

(PK) Id | int Not Nullable	 | (No Default)
Subject | nvarchar(50) Nullable	 | (No Default)
Text | nvarchar(3000) Not Nullable	 | (No Default)
ParentId | int Nullable	 | (No Default)
EntityTypeId | int Not Nullable	 | (No Default)
EntityId | int Not Nullable	 | (No Default)
DateCreated | datetime2 Not Nullable	 | (getutcdate())
DateModified | datetime2 Not Nullable	 | (getutcdate())
CreatedBy | int Not Nullable	 | (No Default)
IsDeleted | bit Not Nullable	 | ((0))

*************************
	Declare @Id int = 10

	Select * from dbo.Comments
	Where Id = @Id

	Execute dbo.Comments_Delete_ById
			@Id;

	Select * from dbo.Comments
	
*/-----------------

AS

BEGIN

	Declare @DateNow datetime2 = getutcdate()
				,@IsDeleted bit = (1)

	UPDATE [dbo].[Comments]
	   SET 
			 [IsDeleted] = @IsDeleted
			 ,[DateModified] = @DateNow
		WHERE Id = @Id;

END