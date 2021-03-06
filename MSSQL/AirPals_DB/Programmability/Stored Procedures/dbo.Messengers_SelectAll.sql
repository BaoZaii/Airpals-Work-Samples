ALTER PROC [dbo].[Messengers_SelectAll_V3]
	@PageIndex INT,
	@PageSize INT

AS

/*
	DECLARE @PageIndex INT = 0,
			@PageSize INT = 25

	EXEC [dbo].[Messengers_SelectAll_V2] @PageIndex, @PageSize

	Select* from dbo.Messengers

	select * from dbo.users

*/


BEGIN
	DECLARE @Offset INT = @PageIndex  * @PageSize

	SELECT	m.Id,
			UserId,
			FirstName,
			LastName,
			Mi,
			DOB,
			Phone,
			AvatarUrl,
			IsActive,
			IsFleetAgreed,
			IsBackgroundChecked,
			LocationId,	
			u.Email,
			m.DateCreated,
			m.DateModified,
			DeliveryTypes = (Select dt.Id , dt.Name
								from  dbo.DeliveryTypes AS dt inner join dbo.MessengerDeliveryTypes md
										on md.DeliveryTypeId = dt.Id
								Where md.MessengerId = m.Id
								For JSON Auto),
			ratingsAvg = (Select 
						ROUND(AVG(CAST(r.Rating AS FLOAT)),2)
						from dbo.Ratings as r join dbo.messengers on m.Id = r.EntityId
						Where r.EntityTypeId = 3
						),
			ratingsCount = (Select
						(COUNT(1))
						from dbo.Ratings as r join dbo.messengers on m.Id = r.EntityId AND m.UserId = UserId 
						Where r.EntityTypeId = 3
						),
			TotalCount = COUNT(m.Id)OVER()

	FROM dbo.Messengers as m inner join dbo.Users as u
		on m.UserId = u.Id

	ORDER BY DateCreated desc, IsActive desc, Id desc
	OFFSET @Offset ROWS
	FETCH NEXT @PageSize ROWS ONLY


END