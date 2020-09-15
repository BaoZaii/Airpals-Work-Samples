using System;
using System.Collections.Generic;
using System.Text;

namespace Sabio.Models.Domain.Comment
{
    public class Comment : BaseComment
    {
        public int ParentId { get; set; }
        public int EntityTypeId { get; set; }
        public int EntityId { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
        public int CreatedBy { get; set; }
        public Boolean IsDeleted { get; set; }
    }
}
