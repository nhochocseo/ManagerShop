using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Abp.Domain.Entities;
using CVD.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace CVD.CommonDto
{
    [AutoMapTo(typeof(ProjectTask))]
    public class BaseProjectTaskDto : BaseEntityDto
    {
        public long TaskId { get; set; }
        public long ProjectId { get; set; }
        public bool Billable { get; set; }
    }
}
