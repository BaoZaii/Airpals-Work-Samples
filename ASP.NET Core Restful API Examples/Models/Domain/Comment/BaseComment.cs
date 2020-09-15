using System;
using System.Collections.Generic;
using System.Text;

namespace Sabio.Models.Domain.Comment
{
    public class BaseComment
    {
        public int Id { get; set; }
        public string Subject { get; set; }
        public string Text { get; set; }
    }
}
