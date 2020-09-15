﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.Contracts;
using System.Text;

namespace Sabio.Models.Requests.Comments
{
    public class CommentAddRequest
    {
        [StringLength(50)]
        public string Subject { get; set; }
        [StringLength(3000, MinimumLength = 2)]
        public string Text { get; set; }
        [Range(0, int.MaxValue)]
        public int ParentId { get; set; }
        [Required]
        [Range(1, int.MaxValue)]
        public int EntityTypeId { get; set; }
        [Required]
        [Range(1, int.MaxValue)]
        public int EntityId { get; set; }
    }
}
