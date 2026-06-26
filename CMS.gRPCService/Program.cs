using CMS.Data;
using CMS.gRPCService.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddGrpc();

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("DefaultConnection")
    ));

var app = builder.Build();

app.MapGrpcService<CategoryGrpcService>();

app.MapGet("/", () =>
    "CMS gRPC Service đang chạy. Hãy dùng Postman gRPC để kiểm tra."
);

app.Run();