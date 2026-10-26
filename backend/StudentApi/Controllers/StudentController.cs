using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StudentApi.Data;

namespace StudentApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class StudentsController : ControllerBase
{
    private readonly AppDbContext db;

    public StudentsController(AppDbContext db) => this.db = db;
   

    [HttpGet]
    public async Task<IActionResult> GetStudents()
    {
        var students = await db.Students.ToListAsync();

        return Ok(students);
    }
}