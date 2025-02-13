using Application.Interface;
using Domain.Dtos;
using Domain.Entities;
using Infrastructure.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using Microsoft.EntityFrameworkCore.Storage;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace Infrastructure.Services
{
    public class OrderRepository: IOrder
    {
        DataContext _dataContext;
        public OrderRepository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<List<NextPredictedOrder>> GetAll(string param)
        {
            return await _dataContext.NextPredictedOrders.FromSql($"exec SpNextPredictedOrder {param}").ToListAsync();
        }

        public async Task<List<Order>> GetByCustomer(int Custid)
        {
            return await _dataContext.Orders.Where(s=>s.Custid==Custid).Include(t=>t.OrderDetails).ToListAsync();
        }

        public async Task<Order> Create(OrderRegister orderR)
        {
            IDbContextTransaction _transaction = await _dataContext.Database.BeginTransactionAsync();
            try
            {

                Order order = JsonSerializer.Deserialize<Order>(JsonSerializer.Serialize(orderR))!;
                await _dataContext.AddAsync(order);
                await _dataContext.SaveChangesAsync();

                OrderDetail odetail = JsonSerializer.Deserialize<OrderDetail>(JsonSerializer.Serialize(orderR))!;
                odetail.Orderid = order.Orderid;

                await _dataContext.AddAsync(odetail);
                await _dataContext.SaveChangesAsync();

                await _transaction.CommitAsync();

                return (await _dataContext.Orders.FirstOrDefaultAsync(o=>o.Orderid==order.Orderid))!;
            }
            catch (Exception ex)
            {
               await _transaction?.RollbackAsync()!;
                return null!;
            }
        }
    }
}
