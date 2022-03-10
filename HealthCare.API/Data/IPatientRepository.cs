using DatingAPP.API.Helpers;
using DatingAPP.API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatingAPP.API.Data
{
    public interface IPatientRepository
    {

        void Add<T>(T entity) where T : class;
        Task<bool> Delete<T>(T entity) where T : class;
        Task<bool> Delete(Patient patient);
        Task<bool> SaveAll(Patient patient);

        Task<bool> SaveMedicalRecords(MedicalRecord medicalRecord);

        Task<PagedList<Patient>> GetPatients(UserParams patientParams);
        Task<Patient> GetPatient(int id);

        Task<Patient> GetPatient(Patient patient);

        Task<PagedList<MedicalRecord>> GetMedicalRecordForPatient(PatientParams messageParams);
        Task<bool> UpdateAll(Patient patientFromRepo);
    }
}
