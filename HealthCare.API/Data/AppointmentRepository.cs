using DatingAPP.API.Helpers;
using DatingAPP.API.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatingAPP.API.Data
{
    public class AppointmentRepository : IAppointmentRepo
    {
        private DataContext _context;
        public AppointmentRepository(DataContext context)
        {
            _context = context;
        }

        public Task<Appointment> GetAppointment(int id)
        {
            var appointment = _context.Appointments.Include(p => p.Patient).ThenInclude(u => u.User).FirstOrDefaultAsync(x => x.Id == id);
            return appointment;
        }

        public async Task<PagedList<Appointment>> GetAppointments(UserParams appointmntParams)
        {
            var appointments =  _context.Appointments.Include(p => p.Patient).ThenInclude(u => u.User).AsQueryable();

            if (!string.IsNullOrEmpty(appointmntParams.OrderBy))
            {
                switch (appointmntParams.OrderBy)
                {
                    case "created":
                        appointments = appointments.OrderByDescending(a => a.Id);
                        break;
                    default:
                        appointments = appointments.OrderByDescending(a => a.Id);
                        break;
                }
            }
            return await PagedList<Appointment>.CreateAsync(appointments, appointmntParams.PageNumber, appointmntParams.PageSize);
        }

        public async Task<bool> UpdateAll(Appointment appintmentFromRepo)
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> Delete(Appointment appointment)
        {
            _context.Appointments.Remove(appointment);
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
