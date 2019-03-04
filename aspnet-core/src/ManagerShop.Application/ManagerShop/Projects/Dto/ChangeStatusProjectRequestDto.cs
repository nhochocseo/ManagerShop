using System;
using System.Collections.Generic;
using System.Text;
using static CVD.Entities.Enum.StatusEnum;

namespace CVD.ManagerShops.Projects.Dto
{
    public class ChangeStatusProjectRequestDto
    {
        public long id { get; set; }
        public EnumProjectStatus status { get; set; }
    }
}
