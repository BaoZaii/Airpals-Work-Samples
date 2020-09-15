using Sabio.Models.Domain.Comment;
using System;
using System.Collections.Generic;
using System.Data;
using System.Text;

namespace Sabio.Services
{
    public interface ICommentsMapper
    {
        T MapComment<T>(IDataReader reader, ref int startingIndex) where T : BaseComment, new();
    }
}
