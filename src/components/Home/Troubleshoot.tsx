import { FaRegEdit } from "react-icons/fa";
import Title from "./Shared/Title";

const Troubleshoot = () => {
  return (
    <div className="bg-[var(--color-dashboardbg)] text-[var(--color-textsecondarycolor)] min-h-screen p-24 ">
      <Title title="Trouble shoot" subtitle="Resolve common issues easily" />

      <div>
        <div className="max-w-3xl mx-auto space-y-6  border-gray-600 pl-2">
          <div className="flex items-center">
            <h1 className="text-3xl font-semibold text-[var(--color-textcolor)]">
              Why isn't my menu appearing?
            </h1>
            <div>
              <FaRegEdit className="ml-3 text-[var(--color-hovertext)]" />
            </div>
          </div>

          <p>
            If the EdgyPro menu is not appearing on your screen, try the
            following steps:
          </p>

          <ul className="space-y-4 list-disc list-inside">
            <li>
              <strong>Unhide the menu:</strong> Press
              <kbd>CTRL + SHIFT + H</kbd> on your keyboard. This should make the
              EdgyPro menu visible again.
            </li>
            <li>
              <strong>Reset the menu:</strong> If the previous step doesn't
              work, try pressing <kbd>CTRL + SHIFT + R</kbd> to reset the menu,
              which may resolve any display issues.
            </li>
            <li>
              <strong>Clear browser cache:</strong> Sometimes the menu can load
              incorrectly, resulting in a portion of code being corrupted. An
              easy way to fix this is
              <a
                href=""
                className="text-[var(--color-hovertext)] hover:text-[#695ce0] pl-2"
              >
                by clearing your browser cache
              </a>
              .
            </li>
          </ul>

          <p>
            If you've tried these steps and the menu is still not appearing,
            please contact our support team in the
            <a
              href="https://discord.com/invite/edgypro"
              className="text-[var(--color-hovertext)] hover:underline hover:text-[#695ce0] pl-2 pr-2"
            >
              Discord server
            </a>
            . We’ll be happy to assist you in resolving the issue.
          </p>

          <hr className="border-gray-700" />
          <p className="text-sm text-gray-400">
            Last updated: 30/12/2024, 15:26:42
          </p>
        </div>

        {/* Part -2 */}
        <div className="max-w-3xl mx-auto space-y-6 mt-5  border-gray-600 pl-2">
          <div className="flex items-center ">
            <h1 className="text-3xl font-semibold text-[var(--color-textcolor)]">
              Why is Tampermonkey not working1?
            </h1>
            <hr className="border-gray-700" />
            <div>
              <FaRegEdit className="ml-3 text-[var(--color-hovertext)]" />
            </div>
          </div>
          <p>
            It’s possible that Tampermonkey may not always function correctly.
            If you're encountering issues, I recommend trying Violentmonkey
            instead by following these steps:
          </p>

          <ul className="space-y-4 list-disc list-inside">
            <li>
              <strong>Install Violentmonkey:</strong> Visit the
              <a
                className="text-[var(--color-hovertext)] hover:text-[#695ce0] pl-2 pr-2"
                href="https://chromewebstore.google.com/detail/violentmonkey/jinjaccalgkegednnccohejagnlnfdag"
              >
                Chrome Web Store
              </a>
              and download the Violentmonkey extension. Once installed, pin it
              to your browser for easy access.
            </li>
            <li>
              <strong>Install the EdgyPro script:</strong> In the browser’s
              search bar, enter the following URL:
              <a
                className="text-[var(--color-hovertext)] hover:text-[#695ce0] pl-2 pr-2"
                href="https://edgypro.net/edgypro.user.js"
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

          <div>
            For a more detailed tutorial, you can also refer to this video:
            <a
              className="text-[var(--color-hovertext)] hover:text-[#695ce0] pl-2"
              href="https://youtu.be/iXj5CHtkCIA"
            >
              https://youtu.be/iXj5CHtkCIA
            </a>
            <p>
              If you continue experiencing issues, feel free to reach out to our
              support team on the
            </p>
            <a
              href="https://discord.com/invite/edgypro"
              className="text-[var(--color-hovertext)] hover:underline hover:text-[#695ce0] pr-2"
            >
              Discord server
            </a>
            .We’ll be happy to help!
          </div>

          <hr className="border-gray-700" />
          <p className="text-sm text-gray-400">
            Last updated: 30/12/2024, 15:26:42
          </p>
        </div>
        {/* Part -3 */}
        <div className="max-w-3xl mx-auto space-y-6 mt-5">
          <div className="flex items-center ">
            <h1 className="text-3xl font-semibold text-[var(--color-textcolor)]">
              Where do I find my key?
            </h1>
            <div>
              <FaRegEdit className="ml-3 text-[var(--color-hovertext)]" />
            </div>
          </div>
          <p>
            If you purchased an EdgyPro key and are struggling to find it check
            the following places:
          </p>

          <ul className="space-y-4 list-disc list-inside">
            <li>The inbox of the email address you entered when purchasing.</li>
            <li>
              The spam folder of the email address you entered when purchasing.
            </li>
          </ul>

          <div>
            If you still can't find it, contact support in our .
            <a
              className="text-[var(--color-hovertext)] hover:text-[#695ce0] pl-2"
              href="https://discord.com/invite/edgypro"
            >
              Discord server
            </a>
          </div>
          <div>
            <p>
              Typos are common in email addresses when ordering keys. If
              possible, check your PayPal receipt for a typo to quicker identify
              the issue.
            </p>
          </div>
          <div className="flex pr-2">
            <p>Click</p>
            <a
              href="https://discord.com/invite/edgypro"
              className="text-[var(--color-hovertext)] hover:underline hover:text-[#695ce0] pl-2 pr-2"
            >
              Here
            </a>
            to purchase an EdgyPro key.
          </div>

          <hr className="border-gray-700" />
          <p className="text-sm text-gray-400">
            Last updated: 30/12/2024, 15:26:42
          </p>
        </div>
        {/* Part -4 */}
        <div className="max-w-3xl mx-auto space-y-6 mt-5">
          <div className="flex items-center ">
            <h1 className="text-3xl font-semibold text-[var(--color-textcolor)]">
              Why isn't my menu appearing?
            </h1>
            <div>
              <FaRegEdit className="ml-3 text-[var(--color-hovertext)]" />
            </div>
          </div>
          <p>
            Is the EdgyPro menu not appearing on your screen? To resolve this, I
            recommend trying the following steps:
          </p>

          <ul className="space-y-4 list-disc list-inside">
            <li>
              <strong>Unhide the menu: </strong> Visit the Press CTRL+SHIFT+H on
              your keyboard. This should unhide the EdgyPro menu, making it
              visible again.
            </li>
            <li>
              <strong>Reset the menu: </strong> If the above step doesn't work,
              try pressing CTRL+SHIFT+R. This will reset the menu, which may
              help resolve any display issues.
            </li>
            <li>
              <strong>Clear browser cache: </strong> Sometimes the menu can load
              incorrectly, resulting in a portion of code being corrupted. An
              easy way to fix this is
              <a
                className="text-[var(--color-hovertext)] hover:text-[#695ce0] pl-2"
                href="https://youtu.be/iXj5CHtkCIA"
              >
                by clearing your browser cache.
              </a>
            </li>
          </ul>

          <div className="">
            If you've tried these steps and the menu is still not appearing,
            please feel free to contact our support team in the
            <a
              className="text-[var(--color-hovertext)] pr-2 pl-2 hover:text-[#695ce0]"
              href="https://youtu.be/iXj5CHtkCIA"
            >
              Discord server
            </a>
            or further assistance. We'll be happy to help you troubleshoot the
            issue and get your menu working again.
          </div>

          <hr className="border-gray-700" />
          <p className="text-sm text-gray-400">
            Last updated: 30/12/2024, 15:26:42
          </p>
        </div>
        {/* Part -5 */}
        <div className="max-w-3xl mx-auto space-y-6 mt-5">
          <div className="flex items-center ">
            <h1 className="text-3xl font-semibold text-[var(--color-textcolor)]">
              Why does it say EdgyPro failed to load?
            </h1>
            <div>
              <FaRegEdit className="ml-3 text-[var(--color-hovertext)]" />
            </div>
          </div>
          <p>
            If you see this message, it's usually safe to ignore and click
            Close. However, if EdgyPro still doesn’t load, it could be due to
            your Wi-Fi blocking the site, or you may need to try the following
            steps:
          </p>

          <div className="pl-4 text-lg">
            <div className="flex  items-center">
              <div>
                <p>1. Reload the page.</p>
              </div>
            </div>

            <p>2. Clear your browser cache (instructions below).</p>

            <p>3. Reinstall the script.</p>
            <p>4. Try using a different browser (suggestions below).</p>
            <p>3. Close the page and reopen it..</p>
          </div>
          <h1 className="text-2xl text-[var(--color-textcolor)]">
            How to clear your cache:
          </h1>
          <div className="pl-4 text-lg">
            <div className="flex  items-center">
              <div>
                <p>
                  1. Press Ctrl + Shift + Delete to open the clear browsing data
                  window, or type chrome://settings/clearBrowserData in your
                  browser’s address bar.
                </p>
              </div>
            </div>

            <p>2. In the Time range dropdown, select All time..</p>

            <p>3. Check the box for Cached images and files.</p>
            <p>4. Try using a different browser (suggestions below).</p>
            <p>3. Close the page and reopen it..</p>
            <p>3. Click Clear data. .</p>
          </div>
          <p>
            Note: Each browser may have slightly different steps to clear cache,
            so be sure to follow the instructions specific to your browser.
          </p>
          <h1 className="text-1xl text-[var(--color-textcolor)]">
            Suggested Browsers:
          </h1>

          <ul className="space-y-4 list-disc list-inside">
            <li>
              <a
                href=""
                className="text-[var(--color-hovertext)] hover:text-[#695ce0]"
              >
                Brave
              </a>
            </li>
            <li>
              <a
                href=""
                className="text-[var(--color-hovertext)] hover:text-[#695ce0]"
              >
                Opera GX
              </a>
            </li>
            <li>
              {" "}
              <a
                href=""
                className="text-[var(--color-hovertext)] hover:text-[#695ce0]"
              >
                Edge
              </a>
            </li>
          </ul>

          <div>
            <p>
              If you continue experiencing issues, feel free to reach out to our
              support team on the{" "}
              <span className="text-[var(--color-hovertext)]">
                Discord server
              </span>{" "}
              We’ll be happy to help!
            </p>
          </div>

          <hr className="border-gray-700" />
          <p className="text-sm text-gray-400">
            Last updated: 30/12/2024, 15:26:42
          </p>
        </div>
      </div>
    </div>
  );
};

export default Troubleshoot;
