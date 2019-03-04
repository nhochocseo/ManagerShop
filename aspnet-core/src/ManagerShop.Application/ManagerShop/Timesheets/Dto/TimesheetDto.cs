using System;
using System.Collections.Generic;
using System.Text;
using CVD.CommonDto;
using CVD.Entities;

namespace CVD.ManagerShops.ManagerShops.Dto
{
    public class ManagerShopDto: BaseManagerShopDto
    {
        public BaseMemberDto Member { get; set; }
        public IEnumerable<ManagerShopItemDto> ManagerShopItems { get; set; }
    }
}
