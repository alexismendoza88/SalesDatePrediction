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
    public class ProductService: IProduct
    {
        DataContext _dataContext;
        public ProductService(DataContext dataContext) {
            _dataContext = dataContext;
        }

        public async Task<List<Product>> GetAll() { 
             return await _dataContext.Products.ToListAsync();
        }

    }
}
