ALTER proc [dbo].[Analytics_Orders_GetTotal]

as

/*************************** TEST START**************************


Execute [dbo].[Analytics_Orders_GetTotal] 
						

Select *
From dbo.Orders

*****************************TEST END****************************/

BEGIN


	SELECT   Count([Id]) as totalOders,
					Cast(DateModified as Date) As Date
	FROM [dbo].[Orders]
	Where DateModified >=dateadd(day, datediff(day,0,GetDate()) -7,0)
	Group by Cast(DateModified as date)


END