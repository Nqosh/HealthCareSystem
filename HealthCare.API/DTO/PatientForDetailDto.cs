using DatingAPP.API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatingAPP.API.DTO
{
    public class PatientForDetailDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string IdNumber { get; set; }
        public string Gender { get; set; }
        public int Age { get; set; }
        public string City { get; set; }
        public DateTime DateofBirth { get; set; }
        public DateTime Created { get; set; }
        public DateTime Updated { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public string Allergies { get; set; }
        public string Radiology { get; set; }
        public string Scripts { get; set; }
        public string Medication { get; set; }
        public bool CurrentlyUnderTreatment { get; set; }
        public string MedicalDescription { get; set; }
        public string Country { get; set; }
        public string PhotoUrl { get; set; }
        public ICollection<MedicalRecord> MedicalRecords { get; set; }
    }
}
