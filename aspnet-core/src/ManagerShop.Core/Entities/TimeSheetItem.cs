using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;
using static CVD.Entities.Enum.StatusEnum;

namespace CVD.Entities
{
    public class ManagerShopItem : BaseEntity
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
        public Project Project { get; set; }
        public Task Task { get; set; }
        public ManagerShop ManagerShop { get; set; }
    }
}
