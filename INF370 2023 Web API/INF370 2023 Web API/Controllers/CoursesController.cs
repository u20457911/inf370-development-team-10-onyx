﻿using INF370_2023_Web_API.Models;
using INF370_2023_Web_API.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace INF370_2023_Web_API.Controllers
{
    public class CoursesController : ApiController
    {
        private readonly ICourses _courseRepo;

        public CoursesController(ICourses courseRepo)
        {
            this._courseRepo = courseRepo;
        }
       
        public static bool IsDouble(object value)
        {
            return value is double;
                 
        }

        [HttpGet]
        [Route("api/GetEmployeesForCourses")]
        public async Task<object> GetEmployeesForCourses()
        {
            return await _courseRepo.GetEmployeesForCourses();
        }


        [HttpPost]
        [Route("api/AddCourse")]
        public async Task<object> AddCourse(CourseDetails course)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return new { Status = 400, Message = "Invalid data" };
                }


                if (!IsDouble(course.Price))
                {
                    return new { Status = 401, Message = "Course Price incorrect" };
                }

                if (course.CategoryID == 0)
                {
                    return new { Status = 420, Message = "Please select a category" };
                }

                return await _courseRepo.AddCourse(course);
            }

            catch (Exception e)
            {
                return e.ToString();
            }
        }

        [HttpGet]
        [Route("api/GetCourseAssistants/{id}")]
        public async Task<object> GetCourseAssistants(int id)
        {
            return await _courseRepo.GetCourseAssistants(id);
        }

        [HttpGet]
        [Route("api/MaintainCourse/{id}")]
        public async Task<object> MaintainCourse(int id)
        {
            return await _courseRepo.MaintainCourse(id);
        }

        [HttpGet]
        [Route("api/GetCourseDetails")]
        public async Task<object> GetCourseDetails()
        {
            return await _courseRepo.GetCourseDetails();
        }

        [HttpPut]
        [Route("api/UpdateCourse/{id}")]
        public async Task<object> UpdateCourse(int id, CourseDetails course)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return new { Status = 401, Message = "Invalid data" };
                }

                return await _courseRepo.UpdateCourse(id, course);
            }
            catch (Exception)
            {
                return new { Status = 500, Message = "Internal server error, please try again" };
            }
        }

        [HttpDelete]
        [Route("api/DeleteCourse/{id}")]
        public async Task<object> DeleteCourse(int id)
        {
            return await _courseRepo.DeleteCourse(id);
        }

        [HttpGet]
        [Route("api/GetCourseID/{id}")]
        public async Task<object> GetCourseID(int id)
        {
            return await _courseRepo.GetCourseID(id);
        }

        [HttpGet]
        [Route("api/GetCategory/{id}")]
        public async Task<object>GetCategory(int id)
        {
            return await _courseRepo.GetCategory(id);
        }
    }
}
