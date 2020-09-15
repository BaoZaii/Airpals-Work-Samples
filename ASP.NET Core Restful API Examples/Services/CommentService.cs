using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Models;
using Sabio.Models.Domain.Comment;
using Sabio.Models.Requests.Comments;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

namespace Sabio.Services
{
    public class CommentService : ICommentService, ICommentsMapper
    {
        IDataProvider _data = null;
        public CommentService(IDataProvider data)
        {
            _data = data;
        }
        public Comment Get(int id)
        {
            string procName = "[dbo].[Comments_Select_ById]";
            Comment comment = null;
            _data.ExecuteCmd(procName, delegate (SqlParameterCollection parameterCollection)
            {
                parameterCollection.AddWithValue("@Id", id);
            },
            delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                comment = MapComment<Comment>(reader, ref startingIndex);
            }
            );
            return comment;
        }
        public Paged<Comment> GetByCreatedBy(int userId, int pageIndex, int pageSize)
        {
            Paged<Comment> pagedResult = null;
            List<Comment> result = null;
            int totalCount = 0;
            _data.ExecuteCmd(
                "dbo.Comments_Select_ByCreatedBy",
                inputParamMapper: delegate (SqlParameterCollection parameterCollection)
                {
                    parameterCollection.AddWithValue("@CreatedBy", userId);
                    parameterCollection.AddWithValue("@PageIndex", pageIndex);
                    parameterCollection.AddWithValue("@PageSize", pageSize);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;
                    Comment comments = MapComment<Comment>(reader, ref startingIndex);
                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(startingIndex++);
                    }
                    if (result == null)
                    {
                        result = new List<Comment>();
                    }
                    result.Add(comments);
                }
                );
            if (result != null)
            {
                pagedResult = new Paged<Comment>(result, pageIndex, pageSize, totalCount);
            }
            return pagedResult;
        }
        public Paged<Comment> GetAll(int pageIndex, int pageSize)
        {
            Paged<Comment> pagedResult = null;
            List<Comment> result = null;
            int totalCount = 0;
            _data.ExecuteCmd(
                "dbo.Comments_SelectAll",
                inputParamMapper: delegate (SqlParameterCollection parameterCollection)
                {
                    parameterCollection.AddWithValue("@PageIndex", pageIndex);
                    parameterCollection.AddWithValue("@PageSize", pageSize);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;
                    Comment comment = MapComment<Comment>(reader, ref startingIndex);
                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(startingIndex++);
                    }
                    if (result == null)
                    {
                        result = new List<Comment>();
                    }
                    result.Add(comment);
                }
                );
            if (result != null)
            {
                pagedResult = new Paged<Comment>(result, pageIndex, pageSize, totalCount);
            }
            return pagedResult;
        }
        public Comment GetByEntityId(int EntityId)
        {
            string procName = "[dbo].[Comments_Select_ByEntityId]";
            Comment comment = null;
            _data.ExecuteCmd(procName, delegate (SqlParameterCollection parameterCollection)
            {
                parameterCollection.AddWithValue("@Id", EntityId);
            },
            delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                comment = MapComment<Comment>(reader, ref startingIndex);
            }
            );
            return comment;
        }
        public List<Comment> GetAllComments()
        {
            List<Comment> list = null;
            string procName = "[dbo].[Comments_SelectAll_V2]";

            _data.ExecuteCmd(procName, inputParamMapper: null
            , singleRecordMapper: delegate (IDataReader reader, short set)
            {
            int startingIndex = 0;
            Comment comment = MapComment<Comment>(reader, ref startingIndex);

            if (list == null)
                {
                    list = new List<Comment>();
                }
                list.Add(comment);
            }
            );
            return list;
        }
        public int Add(CommentAddRequest request, int userId)
        {
            int id = 0;
            string procName = "[dbo].[Comments_Insert]";
            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@CreatedBy", userId);
                    AddCommonParams(request, col);
                    SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                    idOut.Direction = ParameterDirection.Output;
                    col.Add(idOut);
                },
                returnParameters: delegate (SqlParameterCollection returnCollection)
                {
                    object oId = returnCollection["@Id"].Value;
                    int.TryParse(oId.ToString(), out id);
                }
                );
            return id;
        }
        public void Update(CommentUpdateRequest request)
        {
            string procName = "[dbo].[Comments_Update]";
            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@Id", request.Id);
                    AddCommonParams(request, col);
                },
                returnParameters: null
                );
        }
        public void Delete(int id)
        {
            string procName = "[dbo].[Comments_Delete_ById]";
            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    col.AddWithValue(@"Id", id);
                });
        }
        private static void AddCommonParams(CommentAddRequest request, SqlParameterCollection col)
        {
            col.AddWithValue("@Sub", request.Subject);
            col.AddWithValue("@Txt", request.Text);
            col.AddWithValue("@PId", request.ParentId);
            col.AddWithValue("@EntTId", request.EntityTypeId);
            col.AddWithValue("@EntId", request.EntityId);
        }
        public T MapComment<T>(IDataReader reader, ref int startingIndex) where T : BaseComment, new()
        {
            T aComment = new T();
            aComment.Id = reader.GetSafeInt32(startingIndex++);
            aComment.Subject = reader.GetSafeString(startingIndex++);
            aComment.Text = reader.GetSafeString(startingIndex++);
            if (reader.FieldCount > 3 && aComment is Comment)
            {
                Comment comment = aComment as Comment;
                comment.ParentId = reader.GetSafeInt32(startingIndex++);
                comment.EntityTypeId = reader.GetSafeInt32(startingIndex++);
                comment.EntityId = reader.GetSafeInt32(startingIndex++);
                comment.DateCreated = reader.GetDateTime(startingIndex++);
                comment.DateModified = reader.GetDateTime(startingIndex++);
                comment.CreatedBy = reader.GetSafeInt32(startingIndex++);
                comment.IsDeleted = reader.GetSafeBool(startingIndex++);
            }
            return aComment;
        }
    }
}
