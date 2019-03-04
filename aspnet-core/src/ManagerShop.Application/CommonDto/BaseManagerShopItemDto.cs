using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Abp.Domain.Entities;
using CVD.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using static CVD.Entities.Enum.StatusEnum;

namespace CVD.CommonDto
{
    [AutoMapTo(typeof(ManagerShopItem))]
    public class BaseManagerShopItemDto : BaseEntityDto
    {
        public long WorkingTime { get; set; }//min
        public long ProjectId { get; set; }
        public long ManagerShopId { get; set; }
        public long TaskId { get; set; }
        public EnumTypeOfWork TypeOfWork { get; set; }
        public bool IsCharged { get; set; }
        public DayOfWeek DayOfWeek { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime UpdateDate { get; set; }
        public string Note { get; set; }
    }
}
