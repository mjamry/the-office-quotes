using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace the_office_quotes.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class OfficeController : ControllerBase
    {
        private HttpClient _client;
        private OfficeConfig _config;

        public OfficeController(IConfiguration config)
        {
            _client = new HttpClient();
            _client.DefaultRequestHeaders.Add("Accept", "application/json");
            _config = config.GetSection(nameof(OfficeConfig)).Get<OfficeConfig>();
        }

        [HttpGet]
        public async Task<IActionResult> GetRandomQuote()
        {
            var characterId = string.Empty;
            dynamic quoteRaw = default;

            while(!_config.AllowedCharactersIds.Any(id => id == characterId))
            {
                using var response = await _client.GetAsync($"{_config.ApiUrl}/quotes/random");

                response.EnsureSuccessStatusCode();

                string content = await response.Content.ReadAsStringAsync();
                quoteRaw = JsonConvert.DeserializeObject(content);
                characterId = quoteRaw.data.character._id;
                var name = $"{quoteRaw.data.character.firstname} {quoteRaw.data.character.lastname}";
            }

            return Ok(new ResponseData()
            {
                Quote = quoteRaw.data.content,
                Character = $"{quoteRaw.data.character.firstname} {quoteRaw.data.character.lastname}",
                CharacterId = quoteRaw.data.character._id
            });
        } 
    }

    class ResponseData
    {
        public string Quote { get; set; }
        public string Character { get; set; }
        public string CharacterId { get; set; }
    }

    class OfficeConfig
    {
        public List<string> AllowedCharactersIds { get; set; }
        public string ApiUrl { get; set; }
    }
}
