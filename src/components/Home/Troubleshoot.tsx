import { FaRegEdit } from "react-icons/fa";
import Title from "./Shared/Title";

const Troubleshoot = () => {
  return (
    <div className=" font-montserrat  text-[var(--color-textsecondarycolor)] min-h-screen p-16">
      <div className="mt-10 md:mt-16">
        <Title title="Trouble shoot" subtitle="Resolve common issues easily" />
      </div>

      <div className="text-[var(--color-textsecondarycolor)]">
        <div className="max-w-3xl mx-auto space-y-7 border border-gray-600 rounded-lg p-5 sm:p-6  shadow-lg">
          {/* Heading with Icon */}
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-lg sm:text-2xl md:text-3xl font-semibold text-[var(--color-textcolor)]">
              Why isn't my menu appearing?
            </h1>
            <FaRegEdit className="text-[var(--color-hovertext)]" />
          </div>

          {/* Description */}
          <p className="text-sm sm:text-base md:text-lg">
            If the EdgyPro menu is not appearing on your screen, try the
            following steps:
          </p>

          <ul className="space-y-3 sm:space-y-4 list-disc list-inside text-sm sm:text-base md:text-lg">
            <li>
              <strong>Unhide the menu:</strong> Press
              <kbd className="bg-gray-800 px-2 py-1 rounded text-white mx-1">
                CTRL + SHIFT + H
              </kbd>
              on your keyboard. This should make the EdgyPro menu visible again.
            </li>
            <li>
              <strong>Reset the menu:</strong> If the previous step doesn't
              work, try pressing
              <kbd className="bg-gray-800 px-2 py-1 rounded text-white mx-1">
                CTRL + SHIFT + R
              </kbd>
              to reset the menu, which may resolve any display issues.
            </li>
            <li>
              <strong>Clear browser cache:</strong> Sometimes the menu can load
              incorrectly, resulting in a portion of code being corrupted. An
              easy way to fix this is
              <a
                href="#"
                className="text-[var(--color-hovertext)] hover:text-[#695ce0] pl-1 underline"
              >
                by clearing your browser cache
              </a>
              .
            </li>
          </ul>

          {/* Support Section */}
          <p className="text-sm sm:text-base md:text-lg">
            If you've tried these steps and the menu is still not appearing,
            please contact our support team in the
            <a
              href="https://discord.com/invite/edgypro"
              className="text-[var(--color-hovertext)] hover:text-[#695ce0] hover:underline pl-1"
            >
              Discord server
            </a>
            . We’ll be happy to assist you in resolving the issue.
          </p>

          {/* Divider */}
          <hr className="border-gray-700" />

          {/* Last Updated */}
          <p className="text-xs sm:text-sm text-gray-400 text-center">
            Last updated: 30/12/2024, 15:26:42
          </p>
        </div>

        {/* Part -2 */}
        <div className="max-w-3xl mx-auto space-y-6 border border-gray-600 rounded-lg p-5 sm:p-6   shadow-lg mt-6">
          {/* Heading with Icon */}
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-lg sm:text-2xl md:text-3xl font-semibold text-[var(--color-textcolor)] ">
              Why is Tampermonkey not working..?
            </h1>
            <FaRegEdit className="text-[var(--color-hovertext)]" />
          </div>

          {/* Description */}
          <p className="text-sm sm:text-base md:text-lg">
            It’s possible that Tampermonkey may not always function correctly.
            If you're encountering issues, I recommend trying Violentmonkey
            instead by following these step:
          </p>

          <ul className="space-y-3 sm:space-y-4 list-disc list-inside text-sm sm:text-base md:text-lg">
            <li>
              <strong>Install Violentmonkey:</strong> Visit the
              <a
                href="https://chromewebstore.google.com/detail/violentmonkey/jinjaccalgkegednnccohejagnlnfdag"
                className="text-[var(--color-hovertext)] hover:text-[#695ce0] pl-1 underline"
              >
                Chrome Web Store
              </a>
              and downloads the Violentmonkey extension. Once installed, pin it
              to your browser for easy access.
            </li>
            <li>
              <strong>Install the EdgyPro script:</strong> In the browser’s
              search bar, enter the following URL:
              <a
                href="https://edgypro.net/edgypro.user.js"
                className="text-[var(--color-hovertext)] hover:text-[#695ce0] pl-1 underline"
              >
                https://edgypro.net/edgypro.user.js
              </a>
              and install the script.
            </li>
            <li>
              <strong>Access Edgenuity:</strong> Once the script is installed,
              head over to Edgenuity, and you should be good to go.
            </li>
          </ul>

          {/* Video Tutorial */}
          <p className="text-sm sm:text-base md:text-lg">
            For a more detailed tutorial, you can also refer to this video:
            <a
              href="https://youtu.be/iXj5CHtkCIA"
              className="text-[var(--color-hovertext)] hover:text-[#695ce0] pl-1 underline"
            >
              Watch on YouTube
            </a>
          </p>

          {/* Support Section */}
          <p className="text-sm sm:text-base md:text-lg">
            If you continue experiencing issues, feel free to reach out to our
            support team on the
            <a
              href="https://discord.com/invite/edgypro"
              className="text-[var(--color-hovertext)] hover:underline hover:text-[#695ce0] pl-1"
            >
              Discord server
            </a>
            . We’ll be happy to help!
          </p>

          {/* Divider */}
          <hr className="border-gray-700" />

          {/* Last Updated */}
          <p className="text-xs sm:text-sm text-gray-400 text-center">
            Last updated: 30/12/2024, 15:26:42
          </p>
        </div>
        {/* Part -3 */}
        <div className="max-w-3xl mx-auto space-y-5 border border-gray-600 rounded-lg p-5 sm:p-6   shadow-lg mt-6">
          {/* Heading with Icon */}
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-lg sm:text-2xl md:text-3xl font-semibold text-[var(--color-textcolor)]">
              Where do I find my key?
            </h1>
            <FaRegEdit className="text-[var(--color-hovertext)]" />
          </div>

          {/* Description */}
          <p className="text-sm sm:text-base md:text-lg">
            If you purchased an EdgyPro key and are struggling to find it, check
            the following places:
          </p>

          <ul className="space-y-3 sm:space-y-4 list-disc list-inside text-sm sm:text-base md:text-lg">
            <li>The inbox of the email address you entered when purchasing.</li>
            <li>
              The spam folder of the email address you entered when purchasing.
            </li>
          </ul>

          {/* Support Section */}
          <div className="text-sm sm:text-base md:text-lg">
            If you still can't find it, contact support in our
            <a
              href="https://discord.com/invite/edgypro"
              className="text-[var(--color-hovertext)] hover:text-[#695ce0] pl-1 underline"
            >
              Discord server
            </a>
            .
          </div>

          {/* Additional Tip */}
          <div className="text-sm sm:text-base md:text-lg">
            Typos are common in email addresses when ordering keys. If possible,
            check your PayPal receipt for a typo to quicker identify the issue.
          </div>

          {/* Purchase Link */}
          <div className="flex items-center text-sm sm:text-base md:text-lg pr-2">
            <p>Click</p>
            <a
              href="https://discord.com/invite/edgypro"
              className="text-[var(--color-hovertext)] hover:underline hover:text-[#695ce0] pl-2 pr-2"
            >
              Here
            </a>
            to purchase an EdgyPro key.
          </div>

          {/* Divider */}
          <hr className="border-gray-700" />

          {/* Last Updated */}
          <p className="text-xs sm:text-sm text-gray-400 text-center">
            Last updated: 30/12/2024, 15:26:42
          </p>
        </div>
        {/* Part -4 */}
        <div className="max-w-3xl mx-auto space-y-6 mt-6 border border-gray-600 rounded-lg p-5 sm:p-6  shadow-lg">
          {/* Heading with Icon */}
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-lg sm:text-2xl md:text-3xl font-semibold text-[var(--color-textcolor)]">
              Why isn't my menu appearing?
            </h1>
            <FaRegEdit className="text-[var(--color-hovertext)]" />
          </div>

          {/* Description */}
          <p className="text-sm sm:text-base md:text-lg">
            Is the EdgyPro menu not appearing on your screen? To resolve this, I
            recommend trying the following steps:
          </p>

          {/* Troubleshooting Steps */}
          <ul className="space-y-3 sm:space-y-4 list-disc list-inside text-sm sm:text-base md:text-lg">
            <li>
              <strong>Unhide the menu:</strong> Press
              <kbd className="bg-gray-800 px-2 py-1 rounded text-white mx-1">
                CTRL + SHIFT + H
              </kbd>
              on your keyboard. This should unhide the EdgyPro menu, making it
              visible again.
            </li>
            <li>
              <strong>Reset the menu:</strong> If the above step doesn't work,
              try pressing
              <kbd className="bg-gray-800 px-2 py-1 rounded text-white mx-1">
                CTRL + SHIFT + R
              </kbd>
              to reset the menu, which may help resolve any display issues.
            </li>
            <li>
              <strong>Clear browser cache:</strong> Sometimes the menu can load
              incorrectly, resulting in a portion of code being corrupted. An
              easy way to fix this is{" "}
              <a
                className="text-[var(--color-hovertext)] hover:text-[#695ce0] pl-1 underline"
                href="https://youtu.be/iXj5CHtkCIA"
              >
                by clearing your browser cache.
              </a>
            </li>
          </ul>

          {/* Support Section */}
          <div className="text-sm sm:text-base md:text-lg">
            If you've tried these steps and the menu is still not appearing,
            please feel free to contact our support team in the
            <a
              href="https://youtu.be/iXj5CHtkCIA"
              className="text-[var(--color-hovertext)] hover:text-[#695ce0] pl-2 underline"
            >
              Discord server
            </a>
            for further assistance. We'll be happy to help you troubleshoot the
            issue and get your menu working again.
          </div>

          {/* Divider */}
          <hr className="border-gray-700" />

          {/* Last Updated */}
          <p className="text-xs sm:text-sm text-gray-400 text-center">
            Last updated: 30/12/2024, 15:26:42
          </p>
        </div>
        {/* Part -5 */}
        <div className="max-w-3xl mx-auto space-y-6 mt-6 border border-gray-600 rounded-lg p-5 sm:p-6   shadow-lg">
          {/* Heading with Icon */}
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-lg sm:text-2xl md:text-3xl font-semibold text-[var(--color-textcolor)]">
              Why does it say EdgyPro failed to load?
            </h1>
            <FaRegEdit className="text-[var(--color-hovertext)]" />
          </div>

          {/* Description */}
          <p className="text-sm sm:text-base md:text-lg">
            If you see this message, it's usually safe to ignore and click
            Close. However, if EdgyPro still doesn’t load, it could be due to
            your Wi-Fi blocking the site, or you may need to try the following
            steps:
          </p>

          {/* Troubleshooting Steps */}
          <div className="pl-4 text-sm sm:text-base md:text-lg">
            <div className="flex items-center">
              <p>1. Reload the page.</p>
            </div>

            <p>2. Clear your browser cache (instructions below).</p>
            <p>3. Reinstall the script.</p>
            <p>4. Try using a different browser (suggestions below).</p>
            <p>5. Close the page and reopen it.</p>
          </div>

          {/* Cache Clearing Instructions */}
          <h2 className="text-xl sm:text-2xl text-[var(--color-textcolor)]">
            How to clear your cache:
          </h2>
          <div className="pl-4 text-sm sm:text-base md:text-lg">
            <div className="flex items-center">
              <p>
                1. Press Ctrl + Shift + Delete to open the clear browsing data
                window, or type{" "}
                <span className="text-gray-300">
                  chrome://settings/clearBrowserData
                </span>
                in your browser’s address bar.
              </p>
            </div>

            <p>2. In the Time range dropdown, select All time.</p>
            <p>3. Check the box for Cached images and files.</p>
            <p>4. Click Clear data.</p>
          </div>

          {/* Browser Suggestions */}
          <h2 className="text-xl sm:text-2xl text-[var(--color-textcolor)]">
            Suggested Browsers:
          </h2>
          <ul className="space-y-4 list-disc list-inside text-sm sm:text-base md:text-lg">
            <li>
              <a
                href="#"
                className="text-[var(--color-hovertext)] hover:text-[#695ce0]"
              >
                Brave
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-[var(--color-hovertext)] hover:text-[#695ce0]"
              >
                Opera GX
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-[var(--color-hovertext)] hover:text-[#695ce0]"
              >
                Edge
              </a>
            </li>
          </ul>

          {/* Support Section */}
          <div className="text-sm sm:text-base md:text-lg">
            If you continue experiencing issues, feel free to reach out to our
            support team on the{" "}
            <span className="text-[var(--color-hovertext)] hover:text-[#695ce0]">
              Discord server
            </span>
            . We’ll be happy to help!
          </div>

          {/* Divider */}
          <hr className="border-gray-700" />

          {/* Last Updated */}
          <p className="text-xs sm:text-sm text-gray-400 text-center">
            Last updated: 30/12/2024, 15:26:42
          </p>
        </div>
      </div>
    </div>
  );
};

export default Troubleshoot;
