using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HealthCare.API.Models
{
    public class Patient
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string IdNumber { get; set; }
        public string Gender { get; set; }
        public int Age { get; set; }
        public DateTime DateofBirth { get; set; }
        public DateTime Created { get; set; }
        public DateTime Updated { get; set; }
        public string PhoneNumber { get; set; }
        public string City { get; set; }
        public string Email { get; set; }
        public string Url { get; set; }
        public bool CurrentlyUnderTreatment { get; set; }
        public string MedicalDescription { get; set; }
        public string Allergies { get; set; }
        public string Radiology { get; set; }
        public string Scripts { get; set; }
        public string Medication { get; set; }
        public string Country { get; set; }        
        public User User { get; set; }
        public ICollection <MedicalRecord> MedicalRecords { get; set; }
    }
}
