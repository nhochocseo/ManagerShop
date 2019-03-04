namespace CVD.Entities.Enum
{
    public class StatusEnum
    {
        public enum EnumProjectStatus
        {
            Active = 0,
            Deactive = 1
        }
        public enum EnumProjectType
        {
            Timeandmaterials = 0,
            Fixedfee = 1,
            Nonbillable = 2
        }
        public enum EnumTaskType
        {
            Commontask = 0,
            Orthertask = 1
        }
        public enum EnumTypeOfWork
        {
            Normalworkinghours=0,
            Overtime=1
        }
        public enum ManagerShopStatus
        {
            None = 0,
            Pending = 1,
            Approve = 2,
            Reject = 3
        }
    }
}
