using HealthCare.API.Helpers;
using HealthCare.API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HealthCare.API.Data
{
    public interface IAppointmentRepo
    {
        Task<PagedList<Appointment>> GetAppointments(UserParams patientParams);

        Task<Appointment> GetAppointment(int id);

        Task<bool> UpdateAll(Appointment appointmentFromRepo);

        Task<bool> Delete(Appointment appointment);
    }
}
