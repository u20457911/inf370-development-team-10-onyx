﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace INF370_2023_Web_API.ViewModel
{
    public class EmployeeDetails
    {
       
        
        public int UserRoleID { get; set; }
        public int UserID { get; set; }
        public byte[] Image { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Biography { get; set; }
        public string RSAIDNumber { get; set; }
        public int TitleID { get; set; }
        public int DepartmentID { get; set; }
    }

    public class EmployeeViewModel
    {
        public EmployeeDetails Employee { get; set; }
        public List<int> Qualifications { get; set; }
        public List<int> Skills { get; set; }
    }

    public class CourseDetails
    {
        public int CourseID { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public byte[] Image { get; set; }
        public int CategoryID { get; set; }
        public string Active { get; set; }
        public double Price { get; set; }
        public List<int> CourseAssistants { get; set; }
    }
}