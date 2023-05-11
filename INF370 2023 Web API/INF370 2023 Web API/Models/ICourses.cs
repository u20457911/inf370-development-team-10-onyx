﻿using INF370_2023_Web_API.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace INF370_2023_Web_API.Models
{
    public interface ICourses
    {
        Task<object> AddCourse(CourseDetails course);

        Task<object> GetCourseAssistants(int id);

        Task<object> GetCategory(int id);

        Task<object> MaintainCourse(int id);

        Task<object> GetCourseDetails();

        Task<object> UpdateCourse(int id, CourseDetails course);

        Task<object> DeleteCourse(int id);

        Task<object> GetCourseID(int id);

        Task<object> GetEmployeesForCourses();


    }
}
