using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Sabio.Models.Requests.Locations
{
    public class LocationAddRequest
    {

        [Required]
        [Range(1, int.MaxValue)]
        public int LocationTypeId { get; set; }

        [Required]
        [StringLength(255, MinimumLength = 10, ErrorMessage = "Please fill in the address.")]
        public string LineOne { get; set; }

        [StringLength(255)]
        public string LineTwo { get; set; }

        [Required(ErrorMessage = "Please fill in the city.")]
        [StringLength(255, MinimumLength = 2)]
        public string City { get; set; }

        [StringLength(50)]
        [RegularExpression(@"(^\d{5}$)|(^\d{9}$)|(^\d{5}-\d{4}$)")]
        public string Zip { get; set; }

        [Required(ErrorMessage = "Please fill in the state.")]
        [Range(1, int.MaxValue)]
        public int StateId { get; set; }

        [Required]
        [Range(-90,90)]
        public double Latitude { get; set; }

        [Required]
        [Range(-180,180)]
        public double Longitude { get; set; }


    }
}
