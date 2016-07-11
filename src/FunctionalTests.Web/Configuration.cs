using System.Configuration;

namespace FunctionalTests.Web
{
    public class Configuration
    {
        public static string SiteRootUrl => ConfigurationManager.AppSettings["SiteRoot"];
        public static string FailureArtifactsPath => ConfigurationManager.AppSettings["FailureArtifactsPath"];
    }
}