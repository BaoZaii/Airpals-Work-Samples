ALTER PROC [dbo].[Comments_Select_ByCreatedBy]
			@CreatedBy int,
			@PageSize int,
			@PageIndex  int

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
	Declare @CreatedBy int = 1

	Execute dbo.Comments_Select_ByCreatedBy
	@CreatedBy,
	@PageIndex = 0,
	@PageSize = 12;
	
*/-----------------

AS

BEGIN

	Declare @Offset int = @PageIndex * @PageSize

	SELECT [Id]
		  ,[Subject]
		  ,[Text]
		  ,[ParentId]
		  ,[EntityTypeId]
		  ,[EntityId]
		  ,[DateCreated]
		  ,[DateModified]
		  ,[CreatedBy]
		  ,[IsDeleted]

		  ,TotalCount = Count(1) Over()

	  FROM [dbo].[Comments]
	  WHERE CreatedBy = @CreatedBy and isDeleted = 0
	  ORDER BY Id

	  OFFSET @Offset Rows
	  Fetch Next @PageSize Rows ONLY

END