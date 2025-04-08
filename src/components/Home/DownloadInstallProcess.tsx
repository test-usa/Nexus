import { IoArrowRedoCircleOutline } from "react-icons/io5";

import Title from "./Shared/Title";
import DownloadScript from "./DownloadScript";
import CommonWrapper from "@/wrapper/CommonWrapper";

const DownloadInstallProcess = () => {
  return (
    <CommonWrapper>
      <DownloadScript />
      <div className=" bg-[#181818] min-h-screen font-montserrat">
        {/*  Installation  */}
        <div className="text-[var(--color-textsecondarycolor)] px-6">
          <Title title="How to Setup EdgyPro." subtitle="" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6  border-l border-gray-700 pl-4">
              <h3 className="text-2xl font-semibold mb-3 text-[var(--color-textcolor)]">
                Step 1: Install Tampermonkey:
              </h3>
              <p className="text-sm sm:text-base md:text-lg ">
                Begin by adding the
                <span className="text-[var(--color-hovertext)] hover:text-[#695ce0] pl-2 pr-2">
                  <a href="https://www.tampermonkey.net/" target="_blank">
                    Tampermonkey extension
                  </a>
                </span>
                to your browser. This is required for running users scripts like
                EdgyPro.
              </p>
            </div>
            <div className="p-6 border-l border-gray-600 pl-4">
              <h3 className="text-2xl font-semibold mb-3 text-[var(--color-textcolor)]">
                Step 2: Enable Developer Mode:
              </h3>
              <p className="text-sm sm:text-base md:text-lg ">
                Make sure that Developer Mode is enabled in your browser's
                extensions settings.
              </p>
              <h4 className="text-sm sm:text-base md:text-lg  mt-4">
                To enable developer mode in Chrome:
              </h4>
              <div className="pl-4 text-sm sm:text-base md:text-lg ">
                <div className="flex  items-center">
                  <div>
                    <p>1. Open Chrome</p>
                  </div>
                  <div className="ml-2">
                    <a
                      href="https://www.google.com/"
                      className="text-[var(--color-hovertext)] hover:text-[#695ce0]"
                      target="_blank"
                    >
                      <IoArrowRedoCircleOutline />
                    </a>
                  </div>
                </div>

                <p>
                  2. Go to
                  <a
                    href="chrome://extensions/"
                    className="text-[var(--color-hovertext)] hover:text-[#695ce0] pl-2"
                    target="_blank"
                  >
                    chrome://extensions/
                  </a>
                  .
                </p>

                <p>
                  3. Toggle the
                  <span className="text-[var(--color-hovertext)] hover:text-[#695ce0] mr-2 pl-2">
                    'Developer mode'
                  </span>
                  switch in the top right corner.
                </p>
              </div>
            </div>
            <div className="p-6 border-l border-gray-600 pl-4">
              <h3 className="text-2xl font-semibold mb-3 text-[var(--color-textcolor)]">
                Step 3: Access the Tampermonkey Dashboard:
              </h3>
              <p className="text-sm sm:text-base md:text-lg ">
                Click the Tampe rmonkey icon and select Dashboard from the
                dropdown.
              </p>
            </div>
            <div className="p-6 border-l border-gray-600 pl-4">
              <h3 className="text-2xl font-semibold mb-3 text-[var(--color-textcolor)]">
                Step 4: Add the EdgyPro Script:
              </h3>
              <p className="text-sm sm:text-base md:text-lg ">
                In the Tampermonkey Dashboard, navigate to the Utilities tab at
                the top. Under Import from File, select the exodus.user.js file
                that you've downloaded.
              </p>
            </div>
            <div className="p-6 border-l border-gray-600 pl-4">
              <h3 className="text-2xl font-semibold mb-3 text-[var(--color-textcolor)]">
                Step 5: Activate EdgyPro:
              </h3>
              <p className="text-sm sm:text-base md:text-lg ">
                After installing the script, go to
                <span className="text-[var(--color-hovertext)] hover:text-[#695ce0]  ml-2">
                  <a href="https://www.imaginelearning.com/" target="_blank">
                    Edgenuity
                  </a>
                </span>
                , log into your account, and enter the EdgyPro key you received
                in your email. Refresh the page if needed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </CommonWrapper>
  );
};

export default DownloadInstallProcess;
