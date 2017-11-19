using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using TNC_Web_API.Models;
using System.Web.Http;
using System.Threading.Tasks;
using System.Web;

namespace TNC_Web_API.Controllers
{
    [RoutePrefix("api/products")]
    public class ProductsController : ApiController
    {
        Product[] products = new Product[]
        {
                    new Product { Id = 1, Name = "Tomato Soup", Category = "Groceries", Price = 1 },
                    new Product { Id = 2, Name = "Yo-yo", Category = "Toys", Price = 3.75M },
                    new Product { Id = 3, Name = "Hammer", Category = "Hardware", Price = 16.99M }
        };

        [HttpGet]
        [Route("")]
        public IEnumerable<Product> GetAllProducts()
        {
            return products;
        }

        [HttpGet]
        [Route("{id}")]
        public IHttpActionResult GetProduct(int id)
        {
            var product = products.FirstOrDefault((p) => p.Id == id);
            if (product == null)
            {
                return NotFound();
            }
            return Ok(product);
        }

    }
}
