﻿namespace testWebAPI1.Models
{
    public class JWTSettings
    {
        public string SecretKey { get; set; }
        public string? Issuer { get; set; }
        public string? Audience { get; set; }
        public JWTSettings() {
            SecretKey = "";
        }
    }
}
