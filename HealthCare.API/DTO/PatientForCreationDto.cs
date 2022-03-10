using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatingAPP.API.DTO
{
    public class PatientForCreationDto
    {
        public string FirstName { get; set; }
        public string Surname { get; set; }
        public string IdNumber { get; set; }
        public int Age { get; set; }
        public DateTime DateofBirth { get; set; }
        public string Gender { get; set; }
        public string PhoneNumber { get; set; }
        public string City { get; set; }
        public string Email { get; set; }
        public string Allergies { get; set; }
        public string MedicalHistory { get; set; }
        public string Radiology { get; set; }
        public string Scripts { get; set; }
        public string Medication { get; set; }

    }
}
