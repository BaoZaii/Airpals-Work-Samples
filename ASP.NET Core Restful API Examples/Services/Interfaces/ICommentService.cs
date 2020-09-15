using Sabio.Models;
using Sabio.Models.Domain.Comment;
using Sabio.Models.Requests.Comments;
using System.Collections.Generic;

namespace Sabio.Services
{
    public interface ICommentService
    {
        Comment Get(int id);
        Paged<Comment> GetByCreatedBy(int createdBy, int pageIndex, int pageSize);
        Paged<Comment> GetAll(int pageIndex, int pageSize);
        Comment GetByEntityId(int EntityId);
        List<Comment> GetAllComments();
        int Add(CommentAddRequest request, int userId);
        void Update(CommentUpdateRequest model);
        void Delete(int id);
    }
}
