using Application.Interface;
using Domain.Dtos;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace SalesDatePredictionWebApi.Routes
{
    public static class OrderRoute
    {

        public static RouteGroupBuilder GroupOrder(this RouteGroupBuilder group)
        {
            group.MapGet("/", async ([FromServices] IOrder _order) =>
            {
                return TypedResults.Ok(await _order.GetAll(null!));
            });
            group.MapGet("/{param}", async ([FromRoute] string param, [FromServices] IOrder _order) =>
            {
                return TypedResults.Ok(await _order.GetAll(param));
            });
            group.MapGet("/GetByCustomer/{custid}", async ([FromRoute] int custid, [FromServices] IOrder _order) =>
            {
                return TypedResults.Ok(await _order.GetByCustomer(custid));
            });
            group.MapPost("/", async ([FromBody] OrderRegister order, [FromServices] IOrder _order) =>
            {
                return TypedResults.Ok(await _order.Create(order));
            });
            group.WithTags("Orders");
            group.WithOpenApi();
            return group;
        }
    }
}
