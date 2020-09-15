using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Text;

namespace Sabio.Models.Domain.Location
{
    public class Location : BaseLocation
    { 
        public double Latitude { get; set; }

        public double Longitude { get; set; }

        public DateTime DateCreated { get; set; }

        public DateTime DateModified { get; set; }

        public int CreatedBy { get; set; }

        public int ModifiedBy { get; set; }
    }
}
