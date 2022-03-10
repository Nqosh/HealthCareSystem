using DatingAPP.API.Helpers;
using DatingAPP.API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatingAPP.API.Data
{
    public interface IAppointmentRepo
    {
        Task<PagedList<Appointment>> GetAppointments(UserParams patientParams);

        Task<Appointment> GetAppointment(int id);

        Task<bool> UpdateAll(Appointment appointmentFromRepo);

        Task<bool> Delete(Appointment appointment);
    }
}
