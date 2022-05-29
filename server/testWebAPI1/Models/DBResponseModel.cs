namespace testWebAPI1.Models
{
    public class DBResponseModel
    {
        public string? Message { get; set; }
        public bool Success { get; set; }
        public object? data { get; set; }

        public int statusCode { get; set; }

        public DBResponseModel(bool success, string? message, object? data,int statusCode)
        {
            Success = success;
            Message = message;
            this.data = data;
            this.statusCode = statusCode;
        }

        public DBResponseModel(bool success, string? message)
        {
            Success = success;
            Message = message;
        }

        public DBResponseModel(bool success)
        {
            Success = success;
        }

        public DBResponseModel()
        {
        }
        
        
    }
}
