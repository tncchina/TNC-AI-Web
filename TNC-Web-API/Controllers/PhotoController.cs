using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace TNC_Web_API.Controllers
{
    [RoutePrefix("api/photo")]
    public class PhotoController : ApiController
    {

        [HttpPost]
        [Route("upload")]
        public HttpResponseMessage Upload()
        {
            // Refer example from here: http://www.c-sharpcorner.com/UploadFile/2b481f/uploading-a-file-in-Asp-Net-web-api/
            HttpResponseMessage result = null;
            var httpRequest = HttpContext.Current.Request;
            if (httpRequest.Files.Count > 0)
            {
                var docfiles = new List<string>();
                foreach (string file in httpRequest.Files)
                {
                    var postedFile = httpRequest.Files[file];
                    // var filePath = HttpContext.Current.Server.MapPath(postedFile.FileName);
                    string filepath = "D:/Projects/TNC-AI-Web/TNC-Web-API/photos/" + postedFile.FileName.Split('\\').Last();
                    postedFile.SaveAs(filepath);

                    docfiles.Add(filepath);
                }
                result = Request.CreateResponse(HttpStatusCode.Created, docfiles);
            }
            else
            {
                result = Request.CreateResponse(HttpStatusCode.BadRequest);
            }
            return result;
        }
    }
}
