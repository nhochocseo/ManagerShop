using Abp.AutoMapper;
using Abp.Modules;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Text;
using CVD.CommonDto;
using CVD.Entities;
using static CVD.Entities.Enum.StatusEnum;

namespace CVD.ManagerShops.Projects.Dto
{
    public class ProjectTaskDto : BaseProjectTaskDto
    {
        public string Name { get; set; }
        public EnumTaskType Type { get; set; }
    }
}
