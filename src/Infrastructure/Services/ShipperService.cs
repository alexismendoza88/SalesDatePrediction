using Application.Interface;
using Domain.Entities;
using Infrastructure.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Services
{
    public class ShipperService: IShipper
    {
        DataContext _dataContext;
        public ShipperService(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<List<Shipper>> GetAll()
        {
            return await _dataContext.Shippers.ToListAsync();
        }
    }
}
