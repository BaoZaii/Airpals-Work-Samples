ALTER PROC [dbo].[Locations_Select_ByCreatedBy(JOIN)]
			@CreatedBy int,
			@PageIndex int,
			@PageSize int

/* ----TEST CODE----

	Declare @CreatedBy int = 2
	Execute [dbo].[Locations_Select_ByCreatedBy(JOIN)]
	@CreatedBy,
	@PageIndex = 0,
	@PageSize = 20;


*/ ----------------

AS

BEGIN
	
	DECLARE @Offset int = @pageIndex * @pageSize

	SELECT l.[Id]
		  ,lt.[Name]
		  ,[LineOne]
		  ,[LineTwo]
		  ,[City]
		  ,[Zip]
		  ,s.[Name]
		  ,[Latitude]
		  ,[Longitude]
		  ,[DateCreated]
		  ,[DateModified]
		  ,[CreatedBy]
		  ,[ModifiedBy]

		  ,TotalCount = Count(1) Over() 

	  FROM [dbo].[Locations] as l inner join dbo.LocationTypes as lt
		on l.LocationTypeId = lt.Id inner join dbo.States as s
		on l.StateId = s.Id 

	  Where CreatedBy = @CreatedBy
	  ORDER BY l.Id

	  OFFSET @Offset Rows
	  Fetch Next @PageSize Rows ONLY

END
