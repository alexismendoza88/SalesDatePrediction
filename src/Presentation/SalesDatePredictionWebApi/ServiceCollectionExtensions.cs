using Application.Interface;
using Domain.Entities;
using Infrastructure.Services;
using Microsoft.AspNetCore.DataProtection.KeyManagement;

namespace SalesDatePredictionWebApi
{
    public static class ServiceCollectionExtensions
    {
        // This method extends IServiceCollection and registers services related to the Item API
        public static IServiceCollection RegisterServices(this IServiceCollection services)
        {
            // Register services related to the Item API
            services.AddTransient<IProduct,ProductService>();
            services.AddTransient<IShipper,ShipperService>();
            services.AddTransient<IEmployee,EmployeeService>();
            services.AddTransient<IOrder,OrderRepository>();
            return services; // Return the IServiceCollection for method chaining
        }
    }
}
