using System;
using System.Collections.Generic;
using System.Text;

namespace CVD.ManagerShops.Projects.Dto
{
    public class ProjectDetailTaskDto
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public bool BillableStatus { get; set; }
        public long Hours { get; set; }
    }
}
