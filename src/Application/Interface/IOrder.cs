using Domain.Dtos;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interface
{
    public interface IOrder
    {
        Task<List<NextPredictedOrder>> GetAll(string param);
        Task<List<Order>> GetByCustomer(int Custid);
        Task<Order> Create(OrderRegister order);
    }
}
