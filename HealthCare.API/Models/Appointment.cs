using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HealthCare.API.Models
{
    public class Appointment
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public string StartTime { get; set; }
        public string EndTime { get; set; }
        public int RoomNumber { get; set; }
        public int Reccurence { get; set; }
        public Patient Patient { get; set; }
        public User User { get; set; }
    }
}
