using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HealthCare.API.DTO
{
    public class AppointmentForListDto
    {
        public int Id { get; set; }
        public string PatientName { get; set; }
        public string PatientSurname { get; set; }
        public string Description { get; set; }
        public string StartTime { get; set; }
        public string EndTime { get; set; }
        public int RoomNumber { get; set; }
        public int Reccurence { get; set; }
        public string Doctor { get; set; }
    }
}
