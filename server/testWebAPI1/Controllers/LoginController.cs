using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Net.Http.Headers;
using Newtonsoft.Json;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace testWebAPI1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        PFFContext context;
        private readonly JWTSettings _JWTSettings;

        public LoginController(PFFContext context, IOptions<JWTSettings> JWTSettings)
        {
            this.context = context;
            _JWTSettings = JWTSettings.Value;
        }
        [HttpPost("Register")]
        public  ActionResult<User> Register(UserDTO request)
        {
            User user = new User();
            CreatePasswordHash(request.UserPassword, out byte[] passwordHash, out byte[] passwordSalt);
            user.UserName = request.UserName;
            user.EmailAddress = request.EmailAddress;
            user.FirstName = request.FirstName;
            user.LastName = request.LastName;
            user.CreationDate = DateTime.Now;
            user.Level = request.Level;
            user.LastAccessed = DateTime.Now;
            user.UserPasswordHash = passwordHash;
            user.UserPasswordSalt = passwordSalt;
            context.Users.Add(user);
            context.SaveChanges();
            var Response = context.Users.FirstOrDefaultAsync(us => us.UserName == user.UserName);
            if (Response == null)
            {
                return BadRequest("User Not Created");
            }
            return Ok(Response);
        }
        [HttpPost]
        public async Task<ActionResult<object>> Login([FromBody] LoginDTO user)
        {
            var userFromDb = await context.Users.FirstOrDefaultAsync(u => u.UserName == user.UserName);
            if (userFromDb == null)
            {
                return Unauthorized();
            }
            if (!VerifyPasswordHash( user.UserPassword, userFromDb.UserPasswordHash, userFromDb.UserPasswordSalt))
            {
                return Unauthorized();
            }
            UserWithToken userWithToken = new UserWithToken() { user = userFromDb };
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_JWTSettings.SecretKey);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, userFromDb.UserName.ToString()),
                    new Claim(ClaimTypes.Role, userFromDb.Level.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials =
                new SigningCredentials
                (new SymmetricSecurityKey(key),
                SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            userWithToken.Token = tokenHandler.WriteToken(token);
            var response = new
            {
                user = new
                {
                    token = userWithToken.Token,
                    UserName = userWithToken.user.UserName,
                    firstName = userWithToken.user.FirstName,
                    lastName = userWithToken.user.LastName,
                    emailAddress = userWithToken.user.EmailAddress
               ,
                    UserLevel = userWithToken.user.Level
                }
            };
            Response.Cookies.Append("token", response.user.token);
            return Ok(response);
        }
        
        private bool VerifyPasswordHash(string? userPassword, byte[] passwordHash, byte[] passwordSalt)
        {
            if (userPassword == null) return false;
            using (var hmac = new HMACSHA512(passwordSalt))
            {
                var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(userPassword));
                return computedHash.SequenceEqual(passwordHash);
            }
        }
        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
            }
        }
    }
}
