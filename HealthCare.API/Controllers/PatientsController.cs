using AutoMapper;
using HealthCare.API.Data;
using HealthCare.API.DTO;
using HealthCare.API.Helpers;
using HealthCare.API.Models;
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
    public class PatientsController : ControllerBase
    {
        private readonly IDatingRepository _repo;
        private readonly IPatientRepository _patientRepo;
        private readonly IMapper _mapper;

        public PatientsController(IDatingRepository repo, IPatientRepository patientRepo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
            _patientRepo = patientRepo;
        }

        [HttpGet]
        public async Task<IActionResult> GetPatients([FromQuery] UserParams userParams)
        {
            try
            {
                var patients = await _repo.GetPatients(userParams);
                //var usersToReturn = _mapper.Map<IEnumerable<PatientForListDto>>(patients);

                var patientsToReturn = patients.Select(x => new PatientForListDto()
                {
                    Id = x.Id,
                    Name = x.Name,
                    Surname = x.Surname,
                    IdNumber = x.IdNumber,
                    Gender = x.Gender,
                    Age = x.Age,
                    PhoneNumber = x.PhoneNumber,
                    Email = x.Email,
                    DateofBirth = x.DateofBirth,
                    Created = x.Created,
                    MedicalDescription = x.MedicalDescription,
                    Allergies = x.Allergies,
                    PhotoUrl = x.Url,
                    City = x.City,
                    Country = x.Country
                });

                Response.AddPagination(patients.CurrentPage, patients.PageSize, patients.TotalCount, patients.TotalPages);
                return Ok(patientsToReturn);
            }

            catch (Exception ex)
            {
                return BadRequest(ex.InnerException.Message);
            }
        }

        [HttpGet("{id}", Name = "GetPatient")]
        public async Task<IActionResult> GetUser(int id)
        {
            var patient = await _patientRepo.GetPatient(id);
            //var patientToReturn = _mapper.Map<PatientForDetailDto>(patient);

            var patientToReturn = new PatientForDetailDto()
            {
                Id = patient.Id,
                Name = patient.Name,
                Surname = patient.Surname,
                IdNumber = patient.IdNumber,
                Gender = patient.Gender,
                Age = patient.Age,
                PhoneNumber = patient.PhoneNumber,
                Email = patient.Email,
                DateofBirth = patient.DateofBirth,
                Created = patient.Created,
                MedicalDescription = patient.MedicalDescription,
                Allergies = patient.Allergies,
                PhotoUrl = patient.Url,
                City = patient.City,
                Country = patient.Country,
                CurrentlyUnderTreatment = patient.CurrentlyUnderTreatment,
                MedicalRecords = patient.MedicalRecords
            };
            Response.AddPagination(1, 10, 5, 1);
            return Ok(patientToReturn);
        }


        // POST api/<PatientController>
        [HttpPost()]
        public async Task<IActionResult> Post(PatientForCreationDto patientForCreationDto)
        {
            try
            {
                Patient patient = new Patient()
                {
                    Name = patientForCreationDto.FirstName,
                    Surname = patientForCreationDto.Surname,
                    IdNumber = patientForCreationDto.IdNumber,
                    Age = patientForCreationDto.Age,
                    DateofBirth = patientForCreationDto.DateofBirth,
                    Created = DateTime.Now,
                    Gender = patientForCreationDto.Gender,
                    PhoneNumber = patientForCreationDto.PhoneNumber,
                    City = patientForCreationDto.City,
                    Email = patientForCreationDto.Email,
                    Allergies = patientForCreationDto.Allergies,
                    MedicalDescription = patientForCreationDto.MedicalHistory,
                    Radiology = patientForCreationDto.Radiology,
                    Scripts = patientForCreationDto.Scripts,
                    Medication = patientForCreationDto.Medication,
                    Url = Constants.Constants.PatientImage.path
                };

                if (await _patientRepo.SaveAll(patient))
                {
                    var patientSaved = await _patientRepo.GetPatient(patient);

                    MedicalRecord medicalRecord = new MedicalRecord()
                    {
                        Name = patient.Name,
                        Surname = patient.Surname,
                        Description = patient.MedicalDescription,
                        Created = DateTime.Now,
                        Patient = patient,
                        PatientId = patient.Id,
                    };

                    if (await _patientRepo.SaveMedicalRecords(medicalRecord))
                        return NoContent();
                }
            }
            catch (Exception ex)
            {
                ex.Message.ToString();
            }
            return Ok();
        }

        // PUT api/<PatientController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePatient(int id, PatientForUpdateDto patientForUpdateDto)
        {
            if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var patientFromRepo = await _patientRepo.GetPatient(patientForUpdateDto.Id);
            patientFromRepo.PhoneNumber = patientForUpdateDto.PhoneNumber;
            patientFromRepo.Email = patientForUpdateDto.Email;
            patientFromRepo.City = patientForUpdateDto.City;
            patientFromRepo.Country = patientForUpdateDto.Country;
            patientFromRepo.Allergies = patientForUpdateDto.Allergies;
            patientFromRepo.Radiology = patientForUpdateDto.Radiology;
            patientFromRepo.Scripts = patientForUpdateDto.Scripts;
            patientFromRepo.Medication = patientForUpdateDto.Medication;

            var medicalRecords = new List<MedicalRecord>();
            MedicalRecord medicalRecord = new MedicalRecord();
            medicalRecord.Description = patientForUpdateDto.MedicalDescription;
            medicalRecord.Created = DateTime.Now;
            medicalRecord.PatientId = patientForUpdateDto.Id;
            medicalRecords.Add(medicalRecord);

            patientFromRepo.MedicalRecords = medicalRecords;

            if (await _patientRepo.UpdateAll(patientFromRepo))
                return NoContent();

            throw new Exception($"Updating user {id} failed on save");
        }

        // DELETE api/<PatientController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var patientFromRepo = await _patientRepo.GetPatient(id);

                if (await _patientRepo.Delete(patientFromRepo))
                    return Ok();
            }
            catch (Exception ex)
            {
                throw new Exception($"Failed to delete patient {id} ");
            }

            return Ok();
        }
    }
}
