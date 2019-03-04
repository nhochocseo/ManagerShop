using Sieve.Models;
using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Text;

namespace CVD.Filter
{
    public class FilterParam : SieveModel
    {
        [DataMember]
        public string Includes { get; set; }
    }
}
