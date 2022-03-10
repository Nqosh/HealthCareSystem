using DatingAPP.API.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatingAPP.API.Data
{
    public class Seed
    {
        private readonly DataContext _context;
        public Seed(DataContext context)
        {
            _context = context;
        }

        public void SeedUsers()
        {
            var userData = System.IO.File.ReadAllText("Data/UserSeedData.json");
            var users = JsonConvert.DeserializeObject<List<User>>(userData);
            foreach (var user in users)
            {
                byte[] passwordHash, passwordSalt;
                CreatePasswordHash("password", out passwordHash, out passwordSalt);

                user.PasswordHash = passwordHash;
                user.PasswordSalt = passwordSalt;
                user.Username = user.Username.ToLower();
                _context.Users.Add(user);

            }
            _context.SaveChanges();
        }

        public void SeedPatients()
        {
            var patientData = System.IO.File.ReadAllText("Data/PatientSeedData.json");
            var patients = JsonConvert.DeserializeObject<List<Patient>>(patientData);
            int userId = 0;
            userId++;
            foreach (var patient in patients)
            {
                var user = _context.Users.Where(x => x.Id == userId).FirstOrDefault();
                patient.User = user;
                _context.Patients.Add(patient);
                userId++;
            }
            _context.SaveChanges();
        }

        public void SeedMedicalRecord()
        {
            var medicalRecordData = System.IO.File.ReadAllText("Data/MedicalRecord.json");
            var medicalRecords = JsonConvert.DeserializeObject<List<MedicalRecord>>(medicalRecordData);

            foreach (var medicalRecord in medicalRecords)
            {
                var patient = _context.Patients.Where(x => x.Name == medicalRecord.Name).FirstOrDefault();
                medicalRecord.Patient = patient;
                _context.MedicalRecords.Add(medicalRecord);
            }
            _context.SaveChanges();
        }

        public void SeedAppointments()
        {
            var appointmentData = System.IO.File.ReadAllText("Data/AppointmentSeedData.json");
            var appointmentRecords = JsonConvert.DeserializeObject<List<Appointment>>(appointmentData);

            foreach (var appointment in appointmentRecords)
            {
                _context.Appointments.Add(appointment);

            }
            _context.SaveChanges();
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }

        }
    }
}
