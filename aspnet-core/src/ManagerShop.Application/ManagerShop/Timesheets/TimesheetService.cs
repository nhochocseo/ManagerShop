using Abp.UI;
using Audit.MessageReponse;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CVD.CommonDto;
using CVD.Entities;
using CVD.Entities.Enum;
using CVD.ManagerShops.ManagerShops.Dto;
using static CVD.Entities.Enum.StatusEnum;

namespace CVD.ManagerShops.ManagerShops
{
    public class ManagerShopService : AppServiceFilterBase<ManagerShop, ManagerShopDto>
    {
        public async Task<Response> ChangeStatusManagerShop(long id, ManagerShopStatus statusCode)
        {
            var ManagerShop = await WorkScope.Repository<ManagerShop>().FirstOrDefaultAsync(s => s.Id == id);
            var currentStatus = ManagerShop.Status;
            List<KeyValuePair<ManagerShopStatus, ManagerShopStatus>> statusList = new List<KeyValuePair<ManagerShopStatus, ManagerShopStatus>>()
            {
                new KeyValuePair<ManagerShopStatus, ManagerShopStatus>(ManagerShopStatus.None, ManagerShopStatus.Pending),
                new KeyValuePair<ManagerShopStatus, ManagerShopStatus>(ManagerShopStatus.Pending, ManagerShopStatus.Approve),
                new KeyValuePair<ManagerShopStatus, ManagerShopStatus>(ManagerShopStatus.Pending, ManagerShopStatus.Reject)
            };

            var isGranted = statusList.Any(s => s.Key == currentStatus && s.Value == statusCode);
            if (!isGranted)
            {
                throw new UserFriendlyException("Action consequence incorrect");
            }

            ManagerShop.Status = statusCode;
            return new Response
            {
                Code = ResponseCode.Success
            };
        }

        public TimehseetReportDto GetTimehseetReport(DateTime? fromDate, DateTime? toDate)
        {
            //get BillableHours
            var getBillable =
                from tsItem in WorkScope.All<ManagerShopItem>()
                join ManagerShop in WorkScope.All<ManagerShop>()
                .Where(s => (fromDate == null || s.ApprovedDate >= fromDate) &&
                (toDate == null || s.ApprovedDate <= toDate))
                on tsItem.ManagerShopId equals ManagerShop.Id
                join task in WorkScope.All<Entities.Task>().Where(s => s.Billable)
                on tsItem.TaskId equals task.Id
                select tsItem.WorkingTime;
            long sumBillableTime = getBillable.Sum();

            //Get Non-BillableHours
            var getNonBillable =
                from tsItem in WorkScope.All<ManagerShopItem>()
                join ManagerShop in WorkScope.All<ManagerShop>()
                .Where(s => (fromDate == null || s.ApprovedDate >= fromDate) &&
                (toDate == null || s.ApprovedDate <= toDate))
                on tsItem.ManagerShopId equals ManagerShop.Id
                join task in WorkScope.All<Entities.Task>().Where(s => !s.Billable)
                on tsItem.TaskId equals task.Id
                select tsItem.WorkingTime;
            long sumNonBillableTime = getNonBillable.Sum();

            //get TrackedHours
            long sumTrackedHour = sumBillableTime + sumNonBillableTime;

            //get NormalWorkingHours
            var getNormalWorkingHours =
                from tsItem in WorkScope.All<ManagerShopItem>()
                .Where(s => s.TypeOfWork == EnumTypeOfWork.Normalworkinghours)
                join ManagerShop in WorkScope.All<ManagerShop>()
                .Where(s => (fromDate == null || s.ApprovedDate >= fromDate) &&
                (toDate == null || s.ApprovedDate <= toDate))
                on tsItem.ManagerShopId equals ManagerShop.Id
                join task in WorkScope.All<Entities.Task>()
                on tsItem.TaskId equals task.Id
                select tsItem.WorkingTime;
            long normalWorkingHour = getNormalWorkingHours.Sum();

            //get Overtime Billable
            var getOverTimeBillable =
                from tsItem in WorkScope.All<ManagerShopItem>()
                .Where(s => s.TypeOfWork == EnumTypeOfWork.Overtime && s.IsCharged)
                join ManagerShop in WorkScope.All<ManagerShop>()
                .Where(s => (fromDate == null || s.ApprovedDate >= fromDate) &&
                (toDate == null || s.ApprovedDate <= toDate))
                on tsItem.ManagerShopId equals ManagerShop.Id
                select tsItem.WorkingTime;
            long overtimeBillable = getOverTimeBillable.Sum();

            //get Overtime Non-Billable
            var getOverTimeNonBillable =
                from tsItem in WorkScope.All<ManagerShopItem>()
                .Where(s => s.TypeOfWork == EnumTypeOfWork.Overtime && !s.IsCharged)
                join ManagerShop in WorkScope.All<ManagerShop>()
                .Where(s => (fromDate == null || s.ApprovedDate >= fromDate) &&
                (toDate == null || s.ApprovedDate <= toDate))
                on tsItem.ManagerShopId equals ManagerShop.Id
                select tsItem.WorkingTime;
            long overtimeNonBillable = getOverTimeNonBillable.Sum();

            var timehseetReportDto = new TimehseetReportDto
            {
                HoursTracked = sumTrackedHour,
                Billable = sumBillableTime,
                NonBillable = sumNonBillableTime,
                NormalWorkingHours = normalWorkingHour,
                OvertimeBillable = overtimeBillable,
                OvertimeNonBillable = overtimeNonBillable
            };

            return timehseetReportDto;
        }

        public async Task<IEnumerable<BillableHourDto>> GetTeamList(DateTime? fromDate, DateTime? toDate)
        {
            var hours = from tsItem in WorkScope.All<ManagerShopItem>()
                        group tsItem by tsItem.ManagerShop.MemberId into hourGroup
                        select new
                        {
                            MemberId = hourGroup.Key,
                            Hours = hourGroup.Sum(s => s.WorkingTime)
                        };

            var teamList =
                from tsItem in WorkScope.All<ManagerShopItem>()
                .Where(s => s.Task.Billable == true)

                join ManagerShop in WorkScope.All<ManagerShop>()
                .Where(s => fromDate == null || s.ApprovedDate >= fromDate)
                .Where(s => toDate == null || s.ApprovedDate <= toDate)
                on tsItem.ManagerShopId equals ManagerShop.Id

                group tsItem by tsItem.ManagerShop.MemberId into tsItemGroup

                join sumHours in hours
                on tsItemGroup.Key equals sumHours.MemberId

                join teamName in WorkScope.All<Member>()
                on tsItemGroup.Key equals teamName.Id
                select new BillableHourDto
                {
                    Id = tsItemGroup.Key,
                    Name = teamName.Name,
                    Hours = sumHours.Hours,
                    BillableHours = tsItemGroup.Sum(s => s.WorkingTime)
                };
            return await teamList.ToListAsync();
        }

        public async Task<IEnumerable<BillableHourDto>> GetTaskList(DateTime? fromDate, DateTime? toDate)
        {
            var hours = from tsItem in WorkScope.All<ManagerShopItem>()
                        join taskProject in WorkScope.All<ProjectTask>()
                        .Where(s => s.Task.Id == s.TaskId)
                        on tsItem.TaskId equals taskProject.TaskId

                        group tsItem by tsItem.TaskId into hourGroup
                        select new
                        {
                            TaskId = hourGroup.Key,
                            Hours = hourGroup.Sum(s => s.WorkingTime)
                        };

            var taskList =
                from tsItem in WorkScope.All<ManagerShopItem>()

                join projectTask in WorkScope.All<ProjectTask>()
                .Where(s => s.Billable == true)
                on tsItem.TaskId equals projectTask.TaskId

                join ManagerShop in WorkScope.All<ManagerShop>()
                .Where(s => fromDate == null || s.ApprovedDate >= fromDate)
                .Where(s => toDate == null || s.ApprovedDate <= toDate)
                on tsItem.ManagerShopId equals ManagerShop.Id

                group tsItem by tsItem.TaskId into tsItemGroup

                join sumHours in hours
                on tsItemGroup.Key equals sumHours.TaskId

                join projectTask in WorkScope.All<ProjectTask>()
                on tsItemGroup.Key equals projectTask.TaskId

                join taskName in WorkScope.All<Entities.Task>()
                on projectTask.TaskId equals taskName.Id
                select new BillableHourDto
                {
                    Id = tsItemGroup.Key,
                    Name = taskName.Name,
                    Hours = sumHours.Hours,
                    BillableHours = tsItemGroup.Sum(s => s.WorkingTime)
                };
            return await taskList.ToListAsync();
        }

        public async Task<IEnumerable<BillableHourDto>> GetProjectList(DateTime? fromDate, DateTime? toDate)
        {
            var hours = from tsItem in WorkScope.All<ManagerShopItem>()
                        .Where(s => s.Project.Id == s.ProjectId)
                        group tsItem by tsItem.ProjectId into hourGroup
                        select new
                        {
                            ProjectId = hourGroup.Key,
                            Hours = hourGroup.Sum(s => s.WorkingTime)
                        };

            var projectList =
                from tsItem in WorkScope.All<ManagerShopItem>()
                .Where(s => s.Task.Billable == true)
                .Where(s => s.Project.Id == s.ProjectId)

                join ManagerShop in WorkScope.All<ManagerShop>()
                .Where(s => fromDate == null || s.ApprovedDate >= fromDate)
                .Where(s => toDate == null || s.ApprovedDate <= toDate)
                on tsItem.ManagerShopId equals ManagerShop.Id

                group tsItem by tsItem.ProjectId into tsItemGroup

                join sumHours in hours
                on tsItemGroup.Key equals sumHours.ProjectId

                join projectName in WorkScope.All<Project>()
                on tsItemGroup.Key equals projectName.Id
                select new BillableHourDto
                {
                    Id = tsItemGroup.Key,
                    Name = projectName.Name,
                    Hours = sumHours.Hours,
                    BillableHours = tsItemGroup.Sum(s => s.WorkingTime)
                };
            return await projectList.ToListAsync();
        }

        public async Task<IEnumerable<BillableHourDto>> GetCustomerList(DateTime? fromDate, DateTime? toDate)
        {
            var hours = from tsItem in WorkScope.All<ManagerShopItem>()
                        join projectCustomer in WorkScope.All<ProjectCustomer>()
                        on tsItem.ProjectId equals projectCustomer.ProjectId
                        group tsItem by tsItem.ProjectId into hourGroup
                        select new
                        {
                            ProjectId = hourGroup.Key,
                            Hours = hourGroup.Sum(s => s.WorkingTime)
                        };

            var customerList =
                from tsItem in WorkScope.All<ManagerShopItem>()
                .Where(s => s.Task.Billable == true)

                join ManagerShop in WorkScope.All<ManagerShop>()
                .Where(s => fromDate == null || s.ApprovedDate >= fromDate)
                .Where(s => toDate == null || s.ApprovedDate <= toDate)
                on tsItem.ManagerShopId equals ManagerShop.Id

                join projectCustomer in WorkScope.All<ProjectCustomer>()
                on tsItem.ProjectId equals projectCustomer.ProjectId

                group tsItem by tsItem.ProjectId into tsItemGroup

                join sumHours in hours
                on tsItemGroup.Key equals sumHours.ProjectId

                join projectCustomer in WorkScope.All<ProjectCustomer>()
                on tsItemGroup.Key equals projectCustomer.ProjectId

                join customer in WorkScope.All<Customer>()
                on projectCustomer.CustomerId equals customer.Id
                select new BillableHourDto
                {
                    Id = tsItemGroup.Key,
                    Name = customer.Name,
                    Hours = sumHours.Hours,
                    BillableHours = tsItemGroup.Sum(s => s.WorkingTime)
                };
            return await customerList.ToListAsync();
        }

        public async Task<Response> SubmitManagerShop(long ManagerShopId)
        {
            var approve = await WorkScope.Repository<ManagerShop>().FirstOrDefaultAsync(s => s.Id == ManagerShopId);
            approve.Status = ManagerShopStatus.Pending;

            return new Response
            {
                Code = ResponseCode.Success
            };
        }

        public async Task<ManagerShopDto> CreateMyManagerShop()
        {
            var member = await GetCurrentMemberAsync();
            if (member == null)
            {
                throw new UserFriendlyException("User not login");
            }
            // curent week
            var today = DateTime.Today;
            var thisWeekStart = today.AddDays(-(int)today.DayOfWeek);
            var thisWeekEnd = thisWeekStart.AddDays(7).AddSeconds(-1);
            // check ManagerShop db
            var ManagerShop = await WorkScope.GetRepo<ManagerShop, long>()
                .GetAll()
                .Include(t => t.ManagerShopItems).ThenInclude(it => it.Task)
                .Include(t => t.ManagerShopItems).ThenInclude(it => it.Project)
                .Where(t => t.EndDate.Date == thisWeekEnd.Date)
                .Where(t => t.StartDate.Date == thisWeekStart.Date)
                .FirstOrDefaultAsync();
            if (ManagerShop != null)
            {
                return ObjectMapper.Map<ManagerShopDto>(ManagerShop);
            }

            // create ManagerShop
            ManagerShop = new ManagerShop();
            ManagerShop.MemberId = member.Id;
            ManagerShop.StartDate = thisWeekStart;
            ManagerShop.EndDate = thisWeekEnd;
            ManagerShop.Status = StatusEnum.ManagerShopStatus.None;
            await WorkScope.InsertAsync(ManagerShop);

            return ObjectMapper.Map<ManagerShopDto>(ManagerShop);
        }
    }
}
