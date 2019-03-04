using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace CVD.ManagerShops.ManagerShops.Dto
{
    public class TimehseetReportDto
    {
        public long HoursTracked { get; set; }
        public long Billable { get; set; }
        public long NonBillable { get; set; }
        public long NormalWorkingHours { get; set; }
        public long OvertimeBillable { get; set; }
        public long OvertimeNonBillable { get; set; }
    }
}
