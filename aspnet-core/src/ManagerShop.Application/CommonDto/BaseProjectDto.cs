using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using CVD.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using static CVD.Entities.Enum.StatusEnum;

namespace CVD.CommonDto
{
    [AutoMapTo(typeof(Project))]
    public class BaseProjectDto : BaseEntityDto
    {
        public string Name { get; set; }
        public DateTime TimeStart { get; set; }
        public DateTime TimeEnd { get; set; }
        public EnumProjectStatus Status { get; set; }
        public string Code { get; set; }
        public EnumProjectType ProjectType { get; set; }
        public string Note { get; set; }
    }
}
