using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatingAPP.API.Models
{
    public class Pharmacy
    {
        public int Id { get; set; }
        public string Prescription { get; set; }
        public Patient Patient { get; set; }
    }
}
