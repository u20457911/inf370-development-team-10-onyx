﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace INF370_2023_Web_API.ViewModel
{
    public class StudentViewModel
    {

       
        public int TitleID { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Password { get; set; }
    }
}