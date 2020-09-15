using System;
using System.Collections.Generic;
using System.Text;

namespace Sabio.Models.Domain.Location
{
    public class BaseLocation
    {

        public int Id { get; set; }

        public int LocationTypeId { get; set; }

        public string LineOne { get; set; }

        public string LineTwo { get; set; }

        public string City { get; set; }

        public string Zip { get; set; }

        public int StateId { get; set; }

    }
}
