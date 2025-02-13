using Application.Interface;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace SalesDatePredictionWebApi.Routes
{
    public static class IEmployeeRoute
    {
        public static RouteGroupBuilder GroupEmployee(this RouteGroupBuilder group)
        {
            group.MapGet("/", async ( [FromServices] IEmployee _employee) =>
            {
                return TypedResults.Ok(await _employee.GetAll());
            });
            group.WithTags("Employees");
            group.WithOpenApi();
            return group;
        }
    }
}
