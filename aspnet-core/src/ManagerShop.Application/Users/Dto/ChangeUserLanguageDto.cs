using System.ComponentModel.DataAnnotations;

namespace CVD.Users.Dto
{
    public class ChangeUserLanguageDto
    {
        [Required]
        public string LanguageName { get; set; }
    }
}