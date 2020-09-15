using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Sabio.Models.Requests.Locations
{
    public class LocationByContactAddRequest : LocationAddRequest
    {
        [Required]
        [Range(1, Int32.MaxValue)]
        public int ContactId { get; set; }
    }
}
