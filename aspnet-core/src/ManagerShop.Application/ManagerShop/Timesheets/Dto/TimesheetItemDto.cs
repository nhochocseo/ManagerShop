using System;
using System.Collections.Generic;
using System.Text;
using CVD.CommonDto;

namespace CVD.ManagerShops.ManagerShops.Dto
{
    public class ManagerShopItemDto: BaseManagerShopItemDto
    {
        public BaseProjectDto Project { get; set; }
        public BaseTaskDto Task { get; set; }
    }
}
