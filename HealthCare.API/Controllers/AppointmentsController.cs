using HealthCare.API.Data;
using HealthCare.API.DTO;
using HealthCare.API.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace HealthCare.API.Controllers
{

    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class AppointmentsController : ControllerBase
    {

        private readonly IAppointmentRepo _repo;

        public AppointmentsController(IAppointmentRepo repo)
        {
            _repo = repo;
        }


        [HttpGet]
        public async Task<IActionResult> GetAppointments([FromQuery] UserParams userParams)
        {
            try
            {
                var appointments = await _repo.GetAppointments(userParams);

                var appointmentsToReturn = appointments.Select(x => new AppointmentForListDto()
                {
                    Id = x.Id,
                    PatientName = x.Patient.Name,
                    PatientSurname = x.Patient.Surname,
                    Description = x.Description,
                    Doctor = x.User.KnownAs,
                    StartTime = x.StartTime,
                    EndTime = x.EndTime,
                    Reccurence = x.Reccurence,
                    RoomNumber = x.RoomNumber
                });

                Response.AddPagination(appointments.CurrentPage, appointments.PageSize, appointments.TotalCount, appointments.TotalPages);
                return Ok(appointmentsToReturn);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.InnerException.Message);
            }
        }

        // GET api/<AppointmentsController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<AppointmentsController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAppointment(int id, AppointmentForListDto appointmentForUpdateDto)
        {
            if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var appointmentFromRepo = await _repo.GetAppointment(appointmentForUpdateDto.Id);
            appointmentFromRepo.StartTime = appointmentForUpdateDto.StartTime;
            appointmentFromRepo.EndTime = appointmentForUpdateDto.EndTime;
            appointmentFromRepo.Description = appointmentForUpdateDto.Description;


            if (await _repo.UpdateAll(appointmentFromRepo))
                return NoContent();

            throw new Exception($"Updating appointment {id} failed on save");
        }

        // DELETE api/<AppointmentsController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var appointmentFromRepo = await _repo.GetAppointment(id);

                if (await _repo.Delete(appointmentFromRepo))
                    return Ok();
            }
            catch (Exception ex)
            {
                throw new Exception($"Failed to delete appointment {id} ");
            }

            return Ok();
        }
    }
}
