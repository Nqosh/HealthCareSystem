using HealthCare.API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HealthCare.API.DTO
{
    public class PatientForUpdateDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Allergies { get; set; }
        public string Radiology { get; set; }
        public string Scripts { get; set; }
        public string Medication { get; set; }
        public string MedicalDescription { get; set; }
        public DateTime Created { get; set; }
        public DateTime Updated { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public MedicalRecord MedicalRecord { get; set; }
    }
}
