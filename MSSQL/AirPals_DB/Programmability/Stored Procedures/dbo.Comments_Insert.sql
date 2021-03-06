ALTER PROC [dbo].[Comments_Insert]
			@Sub nvarchar(50),
			@Txt nvarchar(3000),
			@PId int,
			@EntTId int,
			@EntId int,
			@CreatedBy int,
			@Id int OUTPUT

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

	Declare @Sub nvarchar(50) = 'Great awesome job!!',
			@Txt nvarchar(3000) = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. 
	Aenean commodo ligula eget dolor.',
			@PId int = 0,
			@EntTId int = 3,
			@EntId int = 92,
			@CreatedBy int = 9,
			@Id int = 0

	Execute dbo.Comments_Insert
			@Sub,
			@Txt,
			@PId,
			@EntTId,
			@EntId,
			@CreatedBy,
			@Id OUTPUT;

	Select * from dbo.Comments
	
*/-----------------

AS

BEGIN
	declare @DateCreated datetime2(7) = getutcdate()

INSERT INTO [dbo].[Comments]
           (
           [Subject]
           ,[Text]
           ,[ParentId]
           ,[EntityTypeId]
           ,[EntityId]
           ,[CreatedBy]
		   ,[DateCreated]
		   )
     VALUES
           (	
			@Sub,
			@Txt,
			@PId,
			@EntTId,
			@EntId,
			@CreatedBy,
			@DateCreated
			)

	SET @Id = SCOPE_IDENTITY();

END


