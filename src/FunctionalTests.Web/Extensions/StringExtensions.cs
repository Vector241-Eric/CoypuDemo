namespace FunctionalTests.Web.Extensions
{
    public static class StringExtensions
    {
        public static string ForBaseUrl(this string relativeUrl, string baseUrl)
        {
            return relativeUrl.Replace("~", baseUrl.TrimEnd('/'));
        }
    }
}