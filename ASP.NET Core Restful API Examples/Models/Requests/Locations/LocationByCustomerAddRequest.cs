using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Sabio.Models.Requests.Locations
{
    public class LocationByCustomerAddRequest : LocationAddRequest
    {
        [Required]
        [Range(1, Int32.MaxValue)]
        public int CustomerId { get; set; }
    }
}
