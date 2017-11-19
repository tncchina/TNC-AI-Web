﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TNC_Web_API.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Category { get; set; }
        public decimal Price { get; set; }
    }
}