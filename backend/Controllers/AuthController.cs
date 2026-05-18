using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using project_redcode.Data;
using project_redcode.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace project_redcode.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController(IConfiguration configuration) : ControllerBase
    {

        [HttpPost("register")]
        public ActionResult<string> Register(UserDto request)
        {
            if (Database.Users.Any(user => user.Username == request.Email))
                return BadRequest("User already exists");

            var newUser = new User
            {
                Username = request.Email,
                PasswordHashed = new PasswordHasher<User>()
                    .HashPassword(null, request.Password)
            };
            Database.Users.Add(newUser);
            return Ok(new { message = "User registered successfully" });

        }

        [HttpPost("login")]
        public ActionResult<string> Login(UserDto request)
        {
            var user = Database.Users.FirstOrDefault(user => user.Username == request.Email);
            if (user == null)
                return BadRequest("User not found");

            var pass = new PasswordHasher<User>().VerifyHashedPassword(null, user.PasswordHashed, request.Password);

            if (pass == PasswordVerificationResult.Failed)
                return BadRequest("Wrong password");

            string token = CreateToken(user);
            return Ok(new { token });




        }

        private string CreateToken(User user) //Sparar identieteten i token
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.Username)
            };

            var key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(
                    configuration.GetValue<string>("AppSettings:Token")!)); //TODO: LÄGG TILL KEY

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new JwtSecurityToken(
                issuer: configuration.GetValue<string>("AppSettings:Issuer"),
                audience: configuration.GetValue<string>("AppSettings:Audience"),
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: creds
                 );
            return new JwtSecurityTokenHandler().WriteToken(tokenDescriptor);
        }
    }
}
