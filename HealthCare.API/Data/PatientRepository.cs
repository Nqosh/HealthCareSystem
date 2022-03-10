using DatingAPP.API.Helpers;
using DatingAPP.API.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatingAPP.API.Data
{
    public class PatientRepository : IPatientRepository
    {
        private DataContext _context;
        public PatientRepository(DataContext context)
        {
            _context = context;
        }
        public void Add<T>(T entity) where T : class
        {
            throw new NotImplementedException();
        }

        public void Delete<T>(T entity) where T : class
        {
            throw new NotImplementedException();
        }

        public Task<PagedList<MedicalRecord>> GetMedicalRecordForPatient(PatientParams messageParams)
        {
            throw new NotImplementedException();
        }

        public async Task<Patient> GetPatient(int id)
        {
            var patient = await _context.Patients.Include(p => p.MedicalRecords).FirstOrDefaultAsync(u => u.Id == id);

            return patient;
        }

        public async Task<Patient> GetPatient(Patient patient)
        {
            var patientSaved =  _context.Patients.Where(x => x.Id == patient.Id).FirstOrDefault();

            return patientSaved;
        }

        public async Task<PagedList<Patient>> GetPatients(UserParams patientParams)
        {
            var patients = _context.Patients.OrderByDescending(u => u.Created).AsQueryable();
      
            if (!string.IsNullOrEmpty(patientParams.OrderBy))
            {
                switch (patientParams.OrderBy)
                {
                    case "created":
                        patients = patients.OrderByDescending(u => u.Created);
                        break;
                    default:
                        patients = patients.OrderByDescending(u => u.Created);
                        break;
                }
            }
            return await PagedList<Patient>.CreateAsync(patients, patientParams.PageNumber, patientParams.PageSize);
        }

        public async Task<bool> SaveAll(Patient patient)
        {
            _context.Add(patient);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> SaveMedicalRecords(MedicalRecord medicalRecord)
        {
            _context.Add(medicalRecord);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> UpdateAll(Patient patientUpdate)
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> Delete (Patient patient)
        {
            _context.Patients.Remove(patient);
            return await _context.SaveChangesAsync() > 0;
        }

        Task<bool> IPatientRepository.Delete<T>(T entity)
        {
            throw new NotImplementedException();
        }
    }
}
