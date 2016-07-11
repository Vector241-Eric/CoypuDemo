using System;
using System.Drawing.Imaging;
using System.IO;
using Coypu;
using Coypu.Drivers;
using Coypu.Drivers.Selenium;
using NUnit.Framework;
using OpenQA.Selenium.Remote;

namespace FunctionalTests.Web.Bases
{
    public abstract class FunctionalTestBase
    {
        protected FunctionalTestBase()
        {
            CleanupBrowser = true;
        }

        private BrowserSession GetBrowserSession()
        {
            var configuration = new SessionConfiguration
            {
                Driver = typeof (SeleniumWebDriver),
                Browser = Browser.Chrome,
            };

            var browser = new BrowserSession(configuration);
            browser.MaximiseWindow();
            return browser;
        }

        protected bool CleanupBrowser { get; set; }

        protected void RunTest(Action<BrowserSession> test)
        {
            if (CleanupBrowser)
            {
                using (var browser = GetBrowserSession())
                {
                    RunTestCore(test, browser);
                }
            }

            //Skip the using statement so we don't dispose of the browser
            else
            {
                RunTestCore(test, GetBrowserSession());

                //Fail the test, because we don't want to check it in this way.
                Assert.Fail("Test does not cleanup the browser session.");
            }
        }

        private void RunTestCore(Action<BrowserSession> test, BrowserSession browser)
        {
            try
            {
                test(browser);
            }
            catch
            {
                SaveArtifacts(browser);
                throw;
            }
        }

        private void SaveArtifacts(BrowserSession browser)
        {
            var dateString = DateTime.Now.ToString("yy-MM-dd_HH-mm-ss");
            var testName = this.GetType().Name;

            var screenshotName = $"{testName}-{dateString}.jpg";
            var fullScreenshotPath = Path.Combine(Configuration.FailureArtifactsPath, screenshotName);
            browser.SaveScreenshot(fullScreenshotPath, ImageFormat.Jpeg);

            var pageSource = ((RemoteWebDriver) browser.Native).PageSource;
            var pageFileName = $"{testName}-{dateString}.html";
            var fullPagePath = Path.Combine(Configuration.FailureArtifactsPath, pageFileName);
            File.WriteAllText(fullPagePath, pageSource);
        }
    }
}